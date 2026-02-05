from datetime import datetime, timedelta

from django.shortcuts import get_object_or_404
from django.db import DatabaseError

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .api_errors import error_response
from .models import Shift, Commitment, RecoveryRule, WeeklyPlan
from .planning.engine import PlanningEngine
from .planning.domain import PlanningInput
from .planning.conflicts import explain_conflicts
from .services import save_weekly_plan_snapshot
from .serializers_plan import (
    WeeklyPlanSerializer,
    WeeklyPlanVersionSerializer,
)

class WeeklyPlanListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            plans = WeeklyPlan.objects.filter(
                user=request.user
            ).order_by("-week_start")

            data = WeeklyPlanSerializer(plans, many=True).data

            return Response({
                "meta": {
                    "count": len(data),
                },
                "data": data,
            })

        except DatabaseError:
            return error_response(
                code="DATABASE_ERROR",
                message="Failed to load weekly plans",
                status=500,
            )

class WeeklyPlanVersionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, plan_id):
        try:
            plan = WeeklyPlan.objects.get(
                id=plan_id,
                user=request.user,
            )

        except WeeklyPlan.DoesNotExist:
            return error_response(
                code="RESOURCE_NOT_FOUND",
                message="Weekly plan not found",
                status=404,
            )

        except DatabaseError:
            return error_response(
                code="DATABASE_ERROR",
                message="Failed to load plan versions",
                status=500,
            )

        versions = plan.versions.order_by("-version")
        data = WeeklyPlanVersionSerializer(versions, many=True).data

        return Response({
            "meta": {
                "plan_id": plan.id,
                "versions_count": len(data),
            },
            "data": data,
        })

class WeeklyPlanView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        week_start_str = request.query_params.get("week_start")

        if not week_start_str:
            return error_response(
                code="INVALID_REQUEST",
                message="week_start query parameter is required",
                status=400,
            )

        try:
            week_start = datetime.strptime(
                week_start_str, "%Y-%m-%d"
            ).date()
        except ValueError:
            return error_response(
                code="INVALID_DATE_FORMAT",
                message="week_start must be in YYYY-MM-DD format",
                status=400,
            )

        week_end = week_start + timedelta(days=7)

        try:
            planning_input = PlanningInput(
                week_start=datetime.combine(
                    week_start, datetime.min.time()
                ),
                week_end=datetime.combine(
                    week_end, datetime.min.time()
                ),
            )

            shifts = Shift.objects.filter(
                user=request.user,
                date__gte=week_start,
                date__lt=week_end,
            )

            commitments = Commitment.objects.filter(
                user=request.user,
                earliest_start__lt=planning_input.week_end,
                latest_end__gte=planning_input.week_start,
            )

            recovery_rules = list(
                RecoveryRule.objects.filter(user=request.user)
            )

            engine = PlanningEngine(
                recovery_rules=recovery_rules
            )

            result = engine.generate(
                planning_input=planning_input,
                shifts=shifts,
                commitments=commitments,
            )

            explained_conflicts = explain_conflicts(
                result.conflicts
            )

            plan_id, version = save_weekly_plan_snapshot(
                user=request.user,
                week_start=week_start,
                plan_blocks=[
                    {
                        "type": b.block_type.value,
                        "start": b.start.isoformat(),
                        "end": b.end.isoformat(),
                        "reference_id": b.reference_id,
                    }
                    for b in result.blocks
                ],
                conflicts=explained_conflicts,
            )

        except DatabaseError:
            return error_response(
                code="DATABASE_ERROR",
                message="Failed to generate weekly plan",
                status=500,
            )

        except Exception:
            return error_response(
                code="PLAN_GENERATION_FAILED",
                message="Unexpected error during plan generation",
                status=500,
            )

        return Response({
            "meta": {
                "plan_id": plan_id,
                "version": version,
                "week_start": week_start.isoformat(),
            },
            "data": {
                "plan_blocks": [
                    {
                        "type": b.block_type.value,
                        "start": b.start.isoformat(),
                        "end": b.end.isoformat(),
                        "reference_id": b.reference_id,
                    }
                    for b in result.blocks
                ],
                "conflicts": explained_conflicts,
            },
        })

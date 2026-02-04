from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Shift, Commitment, RecoveryRule
from .planning.engine import PlanningEngine
from .planning.domain import PlanningInput
from .planning.conflicts import explain_conflicts
from .services import save_weekly_plan_snapshot
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import WeeklyPlan
from .serializers_plan import (
    WeeklyPlanSerializer,
    WeeklyPlanVersionSerializer,
)


class WeeklyPlanListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        plans = WeeklyPlan.objects.filter(user=request.user).order_by("-week_start")
        data = WeeklyPlanSerializer(plans, many=True).data
        return Response(data)


class WeeklyPlanVersionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, plan_id):
        plan = get_object_or_404(
            WeeklyPlan,
            id=plan_id,
            user=request.user,
        )
        versions = plan.versions.order_by("-version")
        data = WeeklyPlanVersionSerializer(versions, many=True).data
        return Response(data)


class WeeklyPlanView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        week_start_str = request.query_params.get("week_start")
        if not week_start_str:
            return Response({"detail": "week_start is required"}, status=400)

        week_start = datetime.strptime(week_start_str, "%Y-%m-%d").date()
        week_end = week_start + timedelta(days=7)

        planning_input = PlanningInput(
            week_start=datetime.combine(week_start, datetime.min.time()),
            week_end=datetime.combine(week_end, datetime.min.time()),
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

        engine = PlanningEngine(recovery_rules=recovery_rules)
        result = engine.generate(
            planning_input=planning_input,
            shifts=shifts,
            commitments=commitments,
        )

        explained_conflicts = explain_conflicts(result.conflicts)

    
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

        return Response(
            {
                "plan_id": plan_id,
                "version": version,
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
            }
        )

from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .planning.conflicts import explain_conflicts
from .models import Shift, Commitment, RecoveryRule
from .serializers_plan import WeeklyPlanSerializer
from .planning.engine import PlanningEngine
from .planning.domain import PlanningInput


class WeeklyPlanView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        week_start_str = request.query_params.get("week_start")

        if not week_start_str:
            return Response(
                {"detail": "week_start query parameter is required"},
                status=400,
            )
        week_start = datetime.strptime(week_start_str, "%Y-%m-%d")
        week_end = week_start + timedelta(days=7)
        planning_input = PlanningInput(
            week_start=week_start,
            week_end=week_end,
        )

        shifts = Shift.objects.filter(
            user=request.user,
            date__gte=week_start.date(),
            date__lt=week_end.date(),
        )

        commitments = Commitment.objects.filter(
            user=request.user,
            earliest_start__lt=week_end,
            latest_end__gte=week_start,
        )
        recovery_rule = RecoveryRule.objects.get(user=request.user)
        engine = PlanningEngine(recovery_rule)
        result = engine.generate(
            planning_input=planning_input,
            shifts=shifts,
            commitments=commitments,
        )
        serializer = WeeklyPlanSerializer(
            {
                "plan_blocks": result.blocks,
                "conflicts": explain_conflicts(result.conflicts),
            }
        )
        return Response(serializer.data)

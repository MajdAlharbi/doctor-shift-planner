from django.db import transaction
from .models import WeeklyPlan, WeeklyPlanVersion


@transaction.atomic
def save_weekly_plan_snapshot(*, user, week_start, plan_blocks, conflicts):
    plan, _ = WeeklyPlan.objects.get_or_create(
        user=user,
        week_start=week_start,
    )

    last_version = plan.versions.order_by("-version").first()
    next_version = 1 if not last_version else last_version.version + 1

    version = WeeklyPlanVersion.objects.create(
        plan=plan,
        version=next_version,
        plan_blocks=plan_blocks,
        conflicts=conflicts,
    )

    return plan.id, version.version

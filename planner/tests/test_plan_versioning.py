from django.test import TestCase
from django.contrib.auth import get_user_model
from datetime import date
from planner.services import save_weekly_plan_snapshot
from planner.models import WeeklyPlan, WeeklyPlanVersion


User = get_user_model()


class TestWeeklyPlanVersioning(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass123",
        )
        self.week_start = date(2026, 2, 2)

    def test_first_snapshot_creates_version_one(self):
        plan_id, version = save_weekly_plan_snapshot(
            user=self.user,
            week_start=self.week_start,
            plan_blocks=[],
            conflicts=[],
        )

        self.assertEqual(version, 1)
        self.assertEqual(WeeklyPlan.objects.count(), 1)
        self.assertEqual(WeeklyPlanVersion.objects.count(), 1)

    def test_second_snapshot_increments_version(self):
        save_weekly_plan_snapshot(
            user=self.user,
            week_start=self.week_start,
            plan_blocks=[],
            conflicts=[],
        )

        plan_id, version = save_weekly_plan_snapshot(
            user=self.user,
            week_start=self.week_start,
            plan_blocks=[],
            conflicts=[],
        )

        self.assertEqual(version, 2)
        self.assertEqual(WeeklyPlan.objects.count(), 1)
        self.assertEqual(WeeklyPlanVersion.objects.count(), 2)

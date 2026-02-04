from django.conf import settings
from django.db import models


class WeeklyPlan(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="weekly_plans",
    )
    week_start = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "week_start")
        ordering = ["-week_start"]

    def __str__(self):
        return f"WeeklyPlan(user={self.user_id}, week_start={self.week_start})"


class WeeklyPlanVersion(models.Model):
    plan = models.ForeignKey(
        WeeklyPlan,
        on_delete=models.CASCADE,
        related_name="versions",
    )
    version = models.PositiveIntegerField()
    plan_blocks = models.JSONField()
    conflicts = models.JSONField()
    generated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("plan", "version")
        ordering = ["-version"]

    def __str__(self):
        return f"WeeklyPlanVersion(plan={self.plan_id}, v{self.version})"


class Shift(models.Model):
    class ShiftType(models.TextChoices):
        DAY = "DAY", "Day"
        NIGHT = "NIGHT", "Night"
        ON_CALL = "ON_CALL", "On-call"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="shifts",
    )
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    shift_type = models.CharField(
        max_length=10,
        choices=ShiftType.choices,
    )
    location = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["date", "start_time"]
        indexes = [
            models.Index(fields=["user", "date"]),
        ]

    def __str__(self):
        return (
            f"Shift(user={self.user_id}, "
            f"{self.shift_type}, {self.date} "
            f"{self.start_time}-{self.end_time})"
        )


class Commitment(models.Model):
    class Priority(models.TextChoices):
        HIGH = "HIGH", "High"
        MEDIUM = "MEDIUM", "Medium"
        LOW = "LOW", "Low"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="commitments",
    )
    title = models.CharField(max_length=255)
    duration_minutes = models.PositiveIntegerField()
    priority = models.CharField(
        max_length=10,
        choices=Priority.choices,
    )
    earliest_start = models.DateTimeField()
    latest_end = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-priority", "earliest_start"]
        indexes = [
            models.Index(fields=["user", "earliest_start"]),
        ]

    def __str__(self):
        return f"Commitment(user={self.user_id}, {self.title}, {self.priority})"


class RecoveryRule(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="recovery_rule",
    )
    min_sleep_hours_after_night_shift = models.PositiveSmallIntegerField(default=8)
    buffer_before_shift_minutes = models.PositiveIntegerField(default=60)
    buffer_after_shift_minutes = models.PositiveIntegerField(default=60)
    max_commitments_on_shift_day = models.PositiveSmallIntegerField(default=1)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"RecoveryRule(user={self.user_id})"


class EventLog(models.Model):
    class EventType(models.TextChoices):
        LOGIN = "LOGIN", "Login"
        DATA_EXPORT = "DATA_EXPORT", "Data export"
        DATA_DELETE = "DATA_DELETE", "Data delete"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="event_logs",
    )
    event_type = models.CharField(
        max_length=20,
        choices=EventType.choices,
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]
        indexes = [
            models.Index(fields=["user", "timestamp"]),
        ]

    def __str__(self):
        return f"EventLog(user={self.user_id}, {self.event_type}, {self.timestamp})"

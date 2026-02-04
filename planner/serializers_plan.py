from rest_framework import serializers
from .models import WeeklyPlan, WeeklyPlanVersion


class WeeklyPlanVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyPlanVersion
        fields = [
            "id",
            "version",
            "generated_at",
            "plan_blocks",
            "conflicts",
        ]
        read_only_fields = fields


class WeeklyPlanSerializer(serializers.ModelSerializer):
    latest_version = serializers.SerializerMethodField()

    class Meta:
        model = WeeklyPlan
        fields = [
            "id",
            "week_start",
            "created_at",
            "latest_version",
        ]

    def get_latest_version(self, obj):
        last = obj.versions.order_by("-version").first()
        if not last:
            return None
        return {
            "id": last.id,
            "version": last.version,
            "created_at": last.created_at,
        }

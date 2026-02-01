from rest_framework import serializers


class PlanBlockSerializer(serializers.Serializer):
    block_type = serializers.CharField()
    start = serializers.DateTimeField()
    end = serializers.DateTimeField()
    reference_id = serializers.IntegerField(allow_null=True)


class ConflictSerializer(serializers.Serializer):
    rule = serializers.CharField()
    message = serializers.CharField()
    reference_id = serializers.IntegerField(allow_null=True)


class WeeklyPlanSerializer(serializers.Serializer):
    plan_blocks = PlanBlockSerializer(many=True)
    conflicts = ConflictSerializer(many=True)

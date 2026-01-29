from rest_framework import serializers
from .models import Shift, Commitment, RecoveryRule


class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        exclude = ["user"]


class CommitmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commitment
        exclude = ["user"]


class RecoveryRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryRule
        exclude = ["user"]

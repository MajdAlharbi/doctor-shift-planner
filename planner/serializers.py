from rest_framework import serializers
from .models import Shift, Commitment, RecoveryRule


class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = (...)



class CommitmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commitment
        fields = (...)



class RecoveryRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryRule
        fields = (...)


from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Shift, Commitment, RecoveryRule
from .serializers import (
    ShiftSerializer,
    CommitmentSerializer,
    RecoveryRuleSerializer,
)


class BaseOwnedModelViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ShiftViewSet(BaseOwnedModelViewSet):
    model = Shift
    serializer_class = ShiftSerializer


class CommitmentViewSet(BaseOwnedModelViewSet):
    model = Commitment
    serializer_class = CommitmentSerializer


class RecoveryRuleViewSet(BaseOwnedModelViewSet):
    model = RecoveryRule
    serializer_class = RecoveryRuleSerializer

from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ShiftViewSet, CommitmentViewSet, RecoveryRuleViewSet

router = DefaultRouter()
router.register("shifts", ShiftViewSet, basename="shift")
router.register("commitments", CommitmentViewSet, basename="commitment")
router.register("recovery-rules", RecoveryRuleViewSet, basename="recovery-rule")

urlpatterns = [
    path("", include(router.urls)),
    path("plan/", include("planner.urls_plan")),
]

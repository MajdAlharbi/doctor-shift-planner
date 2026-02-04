from django.urls import path
from .views_plan import (
    WeeklyPlanView,
    WeeklyPlanListView,
    WeeklyPlanVersionsView,
)

urlpatterns = [
    path("weekly/", WeeklyPlanView.as_view(), name="weekly-plan"),
    path("plans/", WeeklyPlanListView.as_view(), name="plan-list"),
    path("plans/<int:plan_id>/versions/", WeeklyPlanVersionsView.as_view(), name="plan-versions"),
]

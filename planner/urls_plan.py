from django.urls import path
from .views_plan import WeeklyPlanView

urlpatterns = [
    path("weekly/", WeeklyPlanView.as_view(), name="weekly-plan"),
]

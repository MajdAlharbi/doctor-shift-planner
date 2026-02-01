from django.urls import path
from .views_plan import WeeklyPlanView

urlpatterns = [
    path("plan/weekly/", WeeklyPlanView.as_view()),
]

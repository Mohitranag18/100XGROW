from django.urls import path
from .views import analyze_resume_api

urlpatterns = [
    path('analyze/', analyze_resume_api),
]


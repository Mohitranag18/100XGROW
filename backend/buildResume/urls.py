from django.urls import path
from .views import get_linkedin_profile

urlpatterns = [
    path('getLinkedinData/', get_linkedin_profile, name='get_linkedin_profile'),
]

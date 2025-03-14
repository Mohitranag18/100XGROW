from django.urls import path
from .views import scrape_linkedin_profile

urlpatterns = [
    path('scrape-linkedin/', scrape_linkedin_profile, name='scrape_linkedin_profile'),
]

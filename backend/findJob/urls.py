from django.urls import path
from .views import create_job, get_all_jobs, get_job, update_job, delete_job, match_jobs

urlpatterns = [
    path('jobs/', get_all_jobs, name='get_all_jobs'),
    path('jobs/create/', create_job, name='create_job'),
    path('jobs/<int:pk>/', get_job, name='get_job'),
    path('jobs/<int:pk>/update/', update_job, name='update_job'),
    path('jobs/<int:pk>/delete/', delete_job, name='delete_job'),
    path('match-jobs/', match_jobs, name='match_jobs'),
]

from django.urls import path
from .views import resume_list_create, resume_detail, review_list_create

urlpatterns = [
    path('resumes/', resume_list_create, name='resume-list-create'),
    path('resumes/<int:pk>/', resume_detail, name='resume-detail'),
    path('reviews/', review_list_create, name='review-list-create'),
]

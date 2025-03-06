from django.contrib import admin
from .models import ReviewResume, Review
from django.contrib.auth import get_user_model

admin.site.register(ReviewResume)
admin.site.register(Review)




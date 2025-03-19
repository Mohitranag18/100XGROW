from rest_framework import serializers
from .models import JobPosting

# Serializer
class JobPostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPosting
        fields = '__all__'


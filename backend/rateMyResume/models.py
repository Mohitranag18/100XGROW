from django.db import models
from django.contrib.auth import get_user_model

# Use get_user_model() instead of settings.AUTH_USER_MODEL
User = get_user_model()

class ReviewResume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Owner of resume
    pdf = models.FileField(upload_to='reviewResumes/')
    image = models.ImageField(upload_to='reviewResumes/images/', blank=True, null=True)  # Store first page as image
    job_role = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def average_rating(self):
        ratings = self.reviews.all().values_list('rating', flat=True)
        return sum(ratings) / len(ratings) if ratings else 0


class Review(models.Model):
    resume = models.ForeignKey(ReviewResume, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Reviewer
    rating = models.IntegerField()  # 1 to 5 stars
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

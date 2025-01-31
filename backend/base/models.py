from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class MyUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True, primary_key=True)
    bio = models.CharField(max_length=500)
    profile_image =models.ImageField(upload_to='profile_images/', blank=True, null=True)
    follower = models.ManyToManyField('self', symmetrical=False, related_name='following', blank=True)

    def follower_count(self):
        # Calculate and return the follower count, for example:
        return self.follower.count() 

    def following_count(self):
        # Calculate and return the following count, for example:
        return self.following.count()

    def __str__(self):
        return self.username

class Note(models.Model):
    description = models.CharField(max_length=300)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='note')


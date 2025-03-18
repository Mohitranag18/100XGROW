from django.db import models

class JobPosting(models.Model):
    JOB_SOURCE_CHOICES = [
        ('linkedin', 'LinkedIn'),
        ('indeed', 'Indeed'),
        ('naukri', 'Naukri'),
        ('other', 'Other')
    ]

    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    salary = models.CharField(max_length=100, blank=True, null=True)
    job_posted_date = models.DateField()
    deadline_to_apply = models.DateField(blank=True, null=True)
    description = models.TextField()
    source = models.CharField(max_length=20, choices=JOB_SOURCE_CHOICES)
    job_url = models.URLField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} at {self.company} ({self.location})"

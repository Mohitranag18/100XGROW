from django.db import models

class JobPosting(models.Model):
    JOB_SOURCE_CHOICES = [
        ('linkedin', 'LinkedIn'),
        ('indeed', 'Indeed'),
        ('naukri', 'Naukri'),
        ('100XGROW', '100XGROW'),
        ('other', 'Other'),
    ]

    JOB_TYPE_CHOICES = [
        ('remote', 'Remote'),
        ('onsite', 'On-Site'),
        ('hybrid', 'Hybrid')
    ]

    EMPLOYMENT_TYPE_CHOICES = [
        ('full_time', 'Full-Time'),
        ('part_time', 'Part-Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
        ('freelance', 'Freelance')
    ]

    EXPERIENCE_LEVEL_CHOICES = [
        ('entry', 'Entry Level'),
        ('mid', 'Mid Level'),
        ('senior', 'Senior Level')
    ]

    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    salary = models.CharField(max_length=100, blank=True, null=True)
    job_posted_date = models.DateField()
    deadline_to_apply = models.DateField(blank=True, null=True)
    description = models.TextField()
    source = models.CharField(max_length=20, choices=JOB_SOURCE_CHOICES)
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES)
    employment_type = models.CharField(max_length=20, choices=EMPLOYMENT_TYPE_CHOICES)
    experience_level = models.CharField(max_length=20, choices=EXPERIENCE_LEVEL_CHOICES)
    job_url = models.URLField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} at {self.company} ({self.location})"

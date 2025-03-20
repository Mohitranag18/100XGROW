from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class MyUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True, primary_key=True)
    bio = models.CharField(max_length=500)
    linkedinHandle = models.CharField(max_length=50, unique=True)
    instaHandle = models.CharField(max_length=50, unique=True)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)

    def __str__(self):
        return self.username

# Personal Info
class MyUserData(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE, related_name="user_data")
    
    full_name = models.CharField(max_length=100, blank=True)
    short_description = models.TextField(blank=True)
    contact_no = models.CharField(max_length=15, blank=True)
    email = models.EmailField(unique=True)
    address = models.TextField(blank=True)

    availability = models.CharField(max_length=50, blank=True)
    salary_expectations = models.CharField(max_length=50, blank=True)

    # Skills
    skills = models.JSONField(default=list)  # List of skills

    # Achievements & Certifications
    achievements_certifications = models.JSONField(default=list)  # List of achievements & certifications

    # Interests
    interests = models.JSONField(default=list)  # List of interests

    # Self-Identification
    gender_choices = [
        ('Female', 'Female'),
        ('Male', 'Male'),
        ('Other', 'Other'),
    ]
    pronoun_choices = [
        ('she/her', 'She/Her'),
        ('he/him', 'He/Him'),
        ('they/them', 'They/Them'),
        ('Other', 'Other'),
    ]
    veteran_choices = [
        ('No', 'No'),
        ('Yes', 'Yes'),
    ]
    disability_choices = [
        ('No', 'No'),
        ('Yes', 'Yes'),
    ]
    ethnicity_choices = [
        ('Asian', 'Asian'),
        ('White', 'White'),
        ('Black or African American', 'Black or African American'),
        ('Hispanic or Latino', 'Hispanic or Latino'),
        ('Other', 'Other'),
    ]

    gender = models.CharField(max_length=10, choices=gender_choices, default='Other')
    pronouns = models.CharField(max_length=10, choices=pronoun_choices, default='Other')
    veteran = models.CharField(max_length=3, choices=veteran_choices, default='No')
    disability = models.CharField(max_length=3, choices=disability_choices, default='No')
    ethnicity = models.CharField(max_length=30, choices=ethnicity_choices, default='Other')

    # Work Preferences
    work_preference_choices = [
        ('No', 'No'),
        ('Yes', 'Yes'),
    ]
    
    remote_work = models.CharField(max_length=3, choices=work_preference_choices, default='No')
    in_person_work = models.CharField(max_length=3, choices=work_preference_choices, default='No')
    open_to_relocation = models.CharField(max_length=3, choices=work_preference_choices, default='No')
    willing_to_complete_assessments = models.CharField(max_length=3, choices=work_preference_choices, default='No')
    willing_to_undergo_drug_tests = models.CharField(max_length=3, choices=work_preference_choices, default='No')
    willing_to_undergo_background_checks = models.CharField(max_length=3, choices=work_preference_choices, default='No')

    def __str__(self):
        return f"{self.user.username}'s Data"
    
# Education
class Education(models.Model):
    user_data = models.ForeignKey('MyUserData', on_delete=models.CASCADE, related_name="education")
    institution = models.CharField(max_length=200)
    start_date = models.CharField(max_length=200)
    end_date = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200)

# Experience
class Experience(models.Model):
    user_data = models.ForeignKey('MyUserData', on_delete=models.CASCADE, related_name="experience")
    company = models.CharField(max_length=200)
    role = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.CharField(max_length=200)
    end_date = models.CharField(max_length=200)

# Projects
class Project(models.Model):
    user_data = models.ForeignKey('MyUserData', on_delete=models.CASCADE, related_name="projects")
    name = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(blank=True)

# Languages
class Language(models.Model):
    user_data = models.ForeignKey('MyUserData', on_delete=models.CASCADE, related_name="languages")
    language = models.CharField(max_length=50)
    proficiency = models.CharField(max_length=50)


class Note(models.Model):
    description = models.CharField(max_length=300)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='note')


class AppliedJob(models.Model):
    user = models.ForeignKey('MyUser', on_delete=models.CASCADE, related_name='applied_jobs')

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

    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('rejected', 'Rejected'),
        ('selected', 'Selected'),
        ('interviewing', 'Interviewing'),
        ('offered', 'Offered'),
        ('withdrawn', 'Withdrawn'),
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
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    matching_score = models.FloatField(default=0.0)
    job_url = models.URLField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} at {self.company} ({self.get_source_display()})"

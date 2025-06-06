# Generated by Django 5.1.5 on 2025-03-19 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='JobPosting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('company', models.CharField(max_length=255)),
                ('location', models.CharField(max_length=255)),
                ('salary', models.CharField(blank=True, max_length=100, null=True)),
                ('job_posted_date', models.DateField()),
                ('deadline_to_apply', models.DateField(blank=True, null=True)),
                ('description', models.TextField()),
                ('source', models.CharField(choices=[('linkedin', 'LinkedIn'), ('indeed', 'Indeed'), ('naukri', 'Naukri'), ('100XGROW', '100XGROW'), ('other', 'Other')], max_length=20)),
                ('job_type', models.CharField(choices=[('remote', 'Remote'), ('onsite', 'On-Site'), ('hybrid', 'Hybrid')], max_length=20)),
                ('employment_type', models.CharField(choices=[('full_time', 'Full-Time'), ('part_time', 'Part-Time'), ('contract', 'Contract'), ('internship', 'Internship'), ('freelance', 'Freelance')], max_length=20)),
                ('experience_level', models.CharField(choices=[('entry', 'Entry Level'), ('mid', 'Mid Level'), ('senior', 'Senior Level')], max_length=20)),
                ('job_url', models.URLField(max_length=500)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]

from django.contrib import admin
from .models import Note, MyUserData, Experience, Education, Project, Language, AppliedJob
from django.contrib.auth import get_user_model

# Use get_user_model() instead of settings.AUTH_USER_MODEL
User = get_user_model()
admin.site.register(User)
admin.site.register(MyUserData)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Project)
admin.site.register(Language)

admin.site.register(Note)
admin.site.register(AppliedJob)




from rest_framework import serializers
from .models import Note
from .models import MyUser, MyUserData, Education, Experience, Project, Language


class MyUserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = ['username', 'bio', 'linkedinHandle', 'instaHandle', 'profile_image']

# Education Serializer
class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

# Experience Serializer
class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

# Project Serializer
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

# Language Serializer
class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'

# Main MyUserData Serializer
class MyUserDataSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=MyUser.objects.all())

    # Nested serializers (Make sure they support both read & write operations)
    education = EducationSerializer(many=True, required=False)  
    experience = ExperienceSerializer(many=True, required=False)  
    projects = ProjectSerializer(many=True, required=False)  
    languages = LanguageSerializer(many=True, required=False)  

    class Meta:
        model = MyUserData
        fields = '__all__'

    def create(self, validated_data):
        """Handle nested creation for related objects"""
        education_data = validated_data.pop('education', [])
        experience_data = validated_data.pop('experience', [])
        projects_data = validated_data.pop('projects', [])
        languages_data = validated_data.pop('languages', [])

        my_user_data = MyUserData.objects.create(**validated_data)

        # Create related objects
        for edu in education_data:
            Education.objects.create(user_data=my_user_data, **edu)
        for exp in experience_data:
            Experience.objects.create(user_data=my_user_data, **exp)
        for proj in projects_data:
            Project.objects.create(user_data=my_user_data, **proj)
        for lang in languages_data:
            Language.objects.create(user_data=my_user_data, **lang)

        return my_user_data

    def update(self, instance, validated_data):
        """Handle nested updates"""
        education_data = validated_data.pop('education', [])
        experience_data = validated_data.pop('experience', [])
        projects_data = validated_data.pop('projects', [])
        languages_data = validated_data.pop('languages', [])

        # Update MyUserData fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update nested related objects (replace existing ones)
        instance.education.all().delete()
        instance.experience.all().delete()
        instance.projects.all().delete()
        instance.languages.all().delete()

        for edu in education_data:
            Education.objects.create(user_data=instance, **edu)
        for exp in experience_data:
            Experience.objects.create(user_data=instance, **exp)
        for proj in projects_data:
            Project.objects.create(user_data=instance, **proj)
        for lang in languages_data:
            Language.objects.create(user_data=instance, **lang)

        return instance

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = MyUser
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        user = MyUser(
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'description']
from rest_framework import serializers
from .models import Note
from .models import MyUser, MyUserData, Education, Experience, Project, Language, AppliedJob


class MyUserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = ['username', 'bio', 'linkedinHandle', 'instaHandle', 'profile_image']

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



class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUserData
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'

# Combined Serializer
class UserCompleteDataSerializer(serializers.ModelSerializer):
    education = EducationSerializer(many=True, required=False)
    experience = ExperienceSerializer(many=True, required=False)
    projects = ProjectSerializer(many=True, required=False)
    languages = LanguageSerializer(many=True, required=False)

    class Meta:
        model = MyUserData
        fields = '__all__'

    def delete_and_create_related_objects(self, model, data_list, user_data):
        # Delete all existing objects related to user_data
        model.objects.filter(user_data=user_data).delete()

        # Create new objects from the provided data
        for data in data_list:
            data.pop('user_data', None)  # Remove user_data to prevent conflicts
            model.objects.create(user_data=user_data, **data)

    def update(self, instance, validated_data):
        # Update personal info fields
        for attr, value in validated_data.items():
            if attr not in ['education', 'experience', 'projects', 'languages']:
                setattr(instance, attr, value)
        instance.save()

        # Delete and recreate nested models
        self.delete_and_create_related_objects(Education, validated_data.get('education', []), instance)
        self.delete_and_create_related_objects(Experience, validated_data.get('experience', []), instance)
        self.delete_and_create_related_objects(Project, validated_data.get('projects', []), instance)
        self.delete_and_create_related_objects(Language, validated_data.get('languages', []), instance)

        return instance



# Serializer
class AppliedJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppliedJob
        fields = '__all__'


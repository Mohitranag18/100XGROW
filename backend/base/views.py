from django.shortcuts import render
from rest_framework import status
from .models import MyUser, MyUserData, Education, Experience, Project, Language, AppliedJob
from .models import Note
from .serializer import NoteSerializer, UserRegistrationSerializer, MyUserProfileSerializer, EducationSerializer, ExperienceSerializer, ProjectSerializer, LanguageSerializer, UserCompleteDataSerializer, AppliedJobSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
import logging



from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()

            res.data = {'success':True}

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
                # partitioned=True
            )

            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
                # partitioned=True
            )

            return res

        except:
            return Response({'success':False})

class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)

            tokens = response.data
            access_token = tokens['access']

            res = Response()

            res.data = {'refreshed':True}
            
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
                # partitioned=True
            )
            
            return res
        except:
            return Response()
        
@api_view(['POST'])
def logout(request):
    try:
        res = Response()
        res.data = {'success':True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        return res
    except:
        return Response({'success':False})


@api_view(['POST'])
@permission_classes([AllowAny])
def is_authenticated(request):
    return Response({'authenticated': request.user.is_authenticated})

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    notes = Note.objects.filter(owner=user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_user_profile_data(request, pk):
#     try:
#         user = MyUser.objects.get(username=pk)
#     except MyUser.DoesNotExist:
#         return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
#     try:
#         serializer = MyUserProfileSerializer(user, many=False)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except Exception as e:
#         # Optionally, log the error for debugging purposes
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile_data(request):
    try:
        user = request.user  # Get the authenticated user
        serializer = MyUserProfileSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def get_my_user_data(request):
#     user_data = MyUserData.objects.filter(user=request.user).first()
#     if not user_data:
#         return Response({"error": "User data not found"}, status=status.HTTP_404_NOT_FOUND)

#     if not user_data:
#         return Response({"error": "User data not found"}, status=status.HTTP_404_NOT_FOUND)
    
#     serializer = MyUserDataSerializer(user_data)
#     return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(["PUT"])
# @permission_classes([IsAuthenticated])
# def update_my_user_data(request):
#     try:
#         user_data, _ = MyUserData.objects.get_or_create(user=request.user)

#         # Update the main user profile details
#         serializer = MyUserDataSerializer(user_data, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # Bulk fetch existing related objects
#         existing_edu = {edu.id: edu for edu in Education.objects.filter(user_data=user_data)}
#         existing_exp = {exp.id: exp for exp in Experience.objects.filter(user_data=user_data)}
#         existing_projects = {proj.id: proj for proj in Project.objects.filter(user_data=user_data)}
#         existing_langs = {lang.id: lang for lang in Language.objects.filter(user_data=user_data)}

#         # Helper function to handle updates/creation
#         def handle_nested_updates(model_dict, data_list, serializer_class):
#             for data in data_list:
#                 data_id = data.get("id")
#                 if data_id in model_dict:
#                     instance = model_dict[data_id]
#                     serializer = serializer_class(instance, data=data, partial=True)
#                 else:
#                     data["user_data"] = user_data
#                     serializer = serializer_class(data=data)
                
#                 if serializer.is_valid():
#                     serializer.save()
#                 else:
#                     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # Process nested updates
#         handle_nested_updates(existing_edu, request.data.get("education", []), EducationSerializer)
#         handle_nested_updates(existing_exp, request.data.get("experience", []), ExperienceSerializer)
#         handle_nested_updates(existing_projects, request.data.get("projects", []), ProjectSerializer)
#         handle_nested_updates(existing_langs, request.data.get("languages", []), LanguageSerializer)

#         return Response({"message": "User data updated successfully!"}, status=status.HTTP_200_OK)

#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_complete_data_view(request):
    try:
        user_data, created = MyUserData.objects.get_or_create(user=request.user)

        if request.method == 'GET':
            serializer = UserCompleteDataSerializer(user_data)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            serializer = UserCompleteDataSerializer(user_data, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "User data updated successfully!"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        logger.error(f"Error in user_complete_data_view: {str(e)}")
        return Response({"error": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# API Views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_applied_job(request):
    serializer = AppliedJobSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_applied_job(request, pk):
    try:
        job = AppliedJob.objects.get(pk=pk)
    except AppliedJob.DoesNotExist:
        return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)

    job.delete()
    return Response({'message': 'Job deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_applied_job(request, pk):
    try:
        job = AppliedJob.objects.get(pk=pk)
    except AppliedJob.DoesNotExist:
        return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = AppliedJobSerializer(job, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_applied_jobs(request):
    jobs = AppliedJob.objects.filter(user=request.user)
    serializer = AppliedJobSerializer(jobs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
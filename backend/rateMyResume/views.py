from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import ReviewResume, Review
from .serializers import ResumeSerializer, ReviewSerializer
from pdf2image import convert_from_path
from django.core.files.base import ContentFile
import os
from PIL import Image


# 📌 List all resumes or upload a new one
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def resume_list_create(request):
    if request.method == 'GET':
        resumes = ReviewResume.objects.all()
        serializer = ResumeSerializer(resumes, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    elif request.method == 'POST':
        parser_classes = (MultiPartParser, FormParser)
        serializer = ResumeSerializer(data=request.data)
        
        if serializer.is_valid():
            resume_instance = serializer.save(user=request.user)

            # Convert PDF to Image
            pdf_path = resume_instance.pdf.path
            poppler_path = r"C:\Users\Administrator\Downloads\Release-24.08.0-0\poppler-24.08.0\Library\bin"  # Replace with the correct path
            images = convert_from_path(pdf_path, first_page=1, last_page=1, poppler_path=poppler_path)

            if images:
                image = images[0]  # First page
                image_filename = f"reviewResumes/images/{resume_instance.id}.jpg"
                image_path = os.path.join("media", image_filename)

                # Save image as JPEG
                os.makedirs(os.path.dirname(image_path), exist_ok=True)  # Ensure directory exists
                image.save(image_path, "JPEG")

                # Save image path in model
                resume_instance.image = image_filename
                resume_instance.save()

            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# 📌 Retrieve or delete a specific resume
@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticatedOrReadOnly])
def resume_detail(request, pk):
    try:
        resume = ReviewResume.objects.get(pk=pk)
    except ReviewResume.DoesNotExist:
        return JsonResponse({'error': 'Resume not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ResumeSerializer(resume)
        return JsonResponse(serializer.data)

    elif request.method == 'DELETE':
        if request.user == resume.user:  # Only owner can delete
            resume.delete()
            return JsonResponse({'message': 'Resume deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        return JsonResponse({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

# 📌 List all reviews or create a new review for a resume
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def review_list_create(request):
    if request.method == 'GET':
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Associate with logged-in user
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

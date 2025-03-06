from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import ReviewResume, Review
from .serializers import ResumeSerializer, ReviewSerializer

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
            serializer.save(user=request.user)  # Associate with logged-in user
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

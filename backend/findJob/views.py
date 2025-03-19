from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import JobPostingSerializer
from .models import JobPosting
# API Views

@api_view(['POST'])
def create_job(request):
    if isinstance(request.data, list):
        serializer = JobPostingSerializer(data=request.data, many=True)
    else:
        serializer = JobPostingSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_jobs(request):
    jobs = JobPosting.objects.all()
    serializer = JobPostingSerializer(jobs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_job(request, pk):
    try:
        job = JobPosting.objects.get(pk=pk)
    except JobPosting.DoesNotExist:
        return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = JobPostingSerializer(job)
    return Response(serializer.data)

@api_view(['PUT'])
def update_job(request, pk):
    try:
        job = JobPosting.objects.get(pk=pk)
    except JobPosting.DoesNotExist:
        return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = JobPostingSerializer(job, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_job(request, pk):
    try:
        job = JobPosting.objects.get(pk=pk)
    except JobPosting.DoesNotExist:
        return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)
    job.delete()
    return Response({'message': 'Job deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

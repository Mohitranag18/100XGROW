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


import os
import json
import re
import google.generativeai as genai
from pdfminer.high_level import extract_text
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

# Initialize Gemini AI
genai.configure(api_key=settings.GOOGLE_GEMINI_API_KEY)


import time
import google.api_core.exceptions

def call_gemini_api(user_data, job_postings, retries=2):
    """Analyze resume using Gemini AI with basic retry for rate limit."""
    prompt = f"""
    Analyze the following user's profile and job postings, and return the top matching jobs with a matching score (0-100%). 
    User Data: {json.dumps(user_data)} 
    Job Postings: {json.dumps(job_postings)}
    There should be at least 5 Jobs in response. Provide the response in JSON format with job_id, matching_score, and all job posting details.
    """

    model = genai.GenerativeModel("gemini-1.5-pro")

    for attempt in range(retries + 1):
        try:
            response = model.generate_content(prompt)

            if not response or not response.text:
                raise ValueError("Empty AI response received.")

            cleaned_response = re.sub(r"```json\n|\n```", "", response.text.strip())

            ai_response = json.loads(cleaned_response)

            # Merge job details with matching scores
            matched_jobs = []
            for match in ai_response:
                job = next((job for job in job_postings if job['id'] == match['job_id']), None)
                if job:
                    job['matching_score'] = match['matching_score']
                    matched_jobs.append(job)

            return matched_jobs

        except google.api_core.exceptions.ResourceExhausted as rate_limit_error:
            if attempt < retries:
                wait_time = 35  # Gemini says 35 seconds
                print(f"Rate limit hit. Retrying in {wait_time} seconds...")
                time.sleep(wait_time)
            else:
                raise Exception("Rate limit exceeded. Please wait before retrying.")

        except json.JSONDecodeError:
            raise ValueError("Failed to parse Gemini API response as JSON.")

        except Exception as e:
            raise Exception(f"Gemini API error: {str(e)}")


@api_view(['POST'])
@permission_classes([AllowAny])
def match_jobs(request):
    try:
        data = request.data
        user_data = data.get('user_data')
        job_postings = data.get('job_postings')

        if not user_data or not job_postings:
            return Response({'error': 'user_data and job_postings are required'}, status=status.HTTP_400_BAD_REQUEST)

        ai_response = call_gemini_api(user_data, job_postings)
        return Response({'status': 'success', 'data': ai_response})

    except Exception as e:
        print("Error:", str(e))
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

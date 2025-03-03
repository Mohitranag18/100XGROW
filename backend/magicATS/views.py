import os
import json
import re
import google.generativeai as genai
from pdfminer.high_level import extract_text
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser

# Initialize Gemini AI
genai.configure(api_key=settings.GOOGLE_GEMINI_API_KEY)

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF."""
    return extract_text(pdf_path)

def analyze_resume_with_ai(resume_text, job_role):
    """Analyze resume using Gemini AI."""
    prompt = f"""
    You are an ATS (Applicant Tracking System) resume evaluator.
    Analyze the following resume based on the job role: {job_role}.

    Provide:
    1. **ATS Score** (0-100) based on keyword match and resume structure.
    2. **Relevance Work Experience Score** (0-100) based on how well the candidate's experience matches the job role.
    3. **Keywords Matching Score** (0-100) based on the number of relevant keywords found in the resume.
    4. **Missing Keywords** (skills, technologies, tools) that should be included.
    5. **Detailed Feedback** with actionable suggestions for improvement.
    6. **Short Feedback (4 points)** summarizing the top three most important improvement areas.

    Return the response in JSON format:
    {{
        "ats_score": <int>,
        "relevance_work_experience_score": <int>,
        "keywords_matching_score": <int>,
        "missing_keywords": [<list>],
        "detailed_feedback": <string>,
        "short_feedback": [
            "<point 1>",
            "<point 2>",
            "<point 3>",
            "<point 4>"
        ]
    }}
    """

    model = genai.GenerativeModel("gemini-1.5-pro")  # Use Gemini-Pro model
    response = model.generate_content(prompt)

    # ✅ Ensure response is valid
    if not response or not response.text:
        raise ValueError("Empty AI response received.")

    # ✅ Remove potential code block formatting
    cleaned_response = re.sub(r"```json\n|\n```", "", response.text.strip())

    # ✅ Parse JSON safely
    try:
        return json.loads(cleaned_response)
    except json.JSONDecodeError:
        raise ValueError("Failed to parse AI response as JSON.")

@api_view(["POST"])
def analyze_resume_api(request):
    """API to analyze resume and return structured ATS analysis."""
    parser_classes = (MultiPartParser, FormParser)

    pdf = request.FILES.get("resume")
    job_role = request.data.get("job_role")

    if not pdf or not job_role:
        return Response({"error": "Please upload a resume and enter a job role"}, status=400)

    # Save PDF temporarily
    temp_path = f"temp/{pdf.name}"
    os.makedirs("temp", exist_ok=True)
    with open(temp_path, "wb") as f:
        f.write(pdf.read())

    # Extract resume text
    resume_text = extract_text_from_pdf(temp_path)
    os.remove(temp_path)  # Clean up file

    # Analyze resume with Gemini AI
    try:
        parsed_result = analyze_resume_with_ai(resume_text, job_role)

        # ✅ Extract structured data properly
        return Response({
            "ats_score": parsed_result.get("ats_score", 0),
            "relevance_work_experience_score": parsed_result.get("relevance_work_experience_score", 0),
            "keywords_matching_score": parsed_result.get("keywords_matching_score", 0),
            "missing_keywords": parsed_result.get("missing_keywords", []),
            "detailed_feedback": parsed_result.get("detailed_feedback", "No detailed feedback provided."),
            "short_feedback": parsed_result.get("short_feedback", [])
        })

    except ValueError as e:
        return Response({"error": str(e)}, status=500)
    except Exception as e:
        return Response({"error": f"AI analysis failed: {str(e)}"}, status=500)

import json
import re
import google.generativeai as genai
from pdfminer.high_level import extract_text
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from io import BytesIO
import fitz  # PyMuPDF

# ✅ Initialize Gemini AI API Key at the start
genai.configure(api_key=settings.GOOGLE_GEMINI_API_KEY)

def extract_text_from_pdf(pdf_file):
    """Extract text from PDF using PyMuPDF."""
    doc = fitz.open(stream=pdf_file, filetype="pdf")  # Load directly from BytesIO
    text = "".join(page.get_text("text") for page in doc)
    return text.strip()

def analyze_resume_with_ai(resume_text):
    """Analyze resume using Gemini AI and return structured JSON."""

    prompt = f"""
    Analyze the following resume text and extract the information into a structured JSON format. 
    The JSON should include:
    - `name`: Full name of the candidate
    - `headline`: Candidate’s professional headline
    - `location`: City and country of the candidate
    - `contact`: A dictionary with `phone`, `email`, and `LinkedIn` URL
    - `skills`: A comprehensive list of top skills based on **entire resume text**, not just the "Skills" section.
    - `languages`: A list of languages with proficiency levels
    - `certifications`: A list of obtained certifications
    - `summary`: The summary of the candidate
    - `experience`: A list of past job roles with:
        - `company`
        - `role`
        - `start_date`
        - `end_date`
        - `description` (Max **260 characters**. If longer, shorten while keeping key details.)
    - `education`: A list of educational qualifications with:
        - `institution`
        - `degree`
        - `field_of_study`
        - `start_date`
        - `end_date`
    
    Resume Text:
    {resume_text}

    The extracted data should be returned in a well-formatted JSON object.
    """

    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)

    if not response or not response.text:
        return {"error": "Empty AI response received."}

    cleaned_response = re.sub(r"```json\n|\n```", "", response.text.strip())

    try:
        parsed_data = json.loads(cleaned_response)

        # ✅ Enforce 260-character limit for experience descriptions
        if "experience" in parsed_data and isinstance(parsed_data["experience"], list):
            for job in parsed_data["experience"]:
                if "description" in job and isinstance(job["description"], str):
                    job["description"] = job["description"][:257] + "..." if len(job["description"]) > 260 else job["description"]

        return parsed_data
    except json.JSONDecodeError:
        return {"error": "Failed to parse AI response as JSON."}

@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])  # ✅ Corrected placement
def get_linkedin_profile(request):
    """API to analyze resume and return structured ATS analysis."""

    pdf = request.FILES.get("resume")

    if not pdf:
        return Response({"error": "Please upload a resume"}, status=400)

    try:
        resume_text = extract_text_from_pdf(BytesIO(pdf.read()))
    except Exception as e:
        return Response({"error": f"Error reading PDF: {str(e)}"}, status=500)

    if not resume_text:
        return Response({"error": "Failed to extract text from resume"}, status=500)

    parsed_result = analyze_resume_with_ai(resume_text)

    return Response({"success": True, "data": parsed_result})

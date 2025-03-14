from django.http import JsonResponse
from rest_framework.decorators import api_view
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from linkedin_scraper import Person
import time

# Global WebDriver Variable (Persistent)
driver = None
is_logged_in = False  # Track login status

def initialize_driver():
    """Initialize Selenium WebDriver globally"""
    global driver
    if driver is None or driver.session_id is None:
        chrome_service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=chrome_service)

def wait_for_login():
    """Wait until the user logs in manually"""
    try:
        WebDriverWait(driver, 100).until(
            EC.url_contains("/feed") 
        )
        print("Login detected!")
        return True
    except Exception:
        return False

@api_view(['POST'])
def scrape_linkedin_profile(request):
    """
    API endpoint to scrape a LinkedIn profile when requested.
    """
    global driver, is_logged_in

    # Ensure WebDriver is initialized
    initialize_driver()

    # If session is lost, restart login process
    if driver.session_id is None or not driver.get_cookies():
        is_logged_in = False  # Reset login status
        initialize_driver()  

    # Open LinkedIn login page
    driver.get("https://www.linkedin.com/login")
    print("Please log in manually... Waiting for login detection.")
    
    if not wait_for_login():
        return JsonResponse({"error": "Login failed, please try again."}, status=401)

    is_logged_in = True
    print("Login successful! Ready to scrape.")

    # Get LinkedIn username from request
    linkedin_handle = request.data.get("username", None)
    if not linkedin_handle:
        return JsonResponse({"error": "Username is required"}, status=400)

    linkedin_url = f"https://www.linkedin.com/in/{linkedin_handle}"
    print(f"Scraping LinkedIn profile: {linkedin_url}")

    try:
        # Scrape LinkedIn profile
        person = Person(linkedin_url, driver=driver)

        # Structure scraped data
        linkedin_data = {
            "Name": person.name,
            "About": person.about,
            "Experiences": [
                {
                    "Institution": exp.institution_name,
                    "Position": exp.position_title,
                    "Duration": exp.duration,
                    "Location": exp.location,
                    "Description": exp.description,
                    "LinkedIn URL": exp.linkedin_url
                }
                for exp in person.experiences
            ],
            "Educations": [
                {
                    "Institution": edu.institution_name,
                    "Degree": edu.degree,
                    "From": edu.from_date,
                    "To": edu.to_date,
                    "LinkedIn URL": edu.linkedin_url
                }
                for edu in person.educations
            ],
            "Current Job": f"{person.job_title} at {person.company}"
        }

        return JsonResponse(linkedin_data, safe=False, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

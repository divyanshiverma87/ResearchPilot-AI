import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Base configuration settings for Flask and AI services."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default-dev-secret-key')
    
    # Gemini API settings
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
    
    # Flask settings
    FLASK_ENV = os.environ.get('FLASK_ENV', 'development')
    DEBUG = os.environ.get('FLASK_DEBUG', '1') == '1'

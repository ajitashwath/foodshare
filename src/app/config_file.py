import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Application configuration"""
    
    # Flask Configuration
    SECRET_KEY = os.getenv('SECRET_KEY', '429962590513dc878c1096bf179540492320fd8d4d02fbebb5b9099c3dfddee0')
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
    
    # Supabase Configuration
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_ANON_KEY = os.getenv('SUPABASE_ANON_KEY')
    SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
    
    # Frontend URLs (for CORS and redirects)
    FRONTEND_MAIN_URL = os.getenv('FRONTEND_MAIN_URL', 'http://localhost:3000')
    FRONTEND_AI_URL = os.getenv('FRONTEND_AI_URL', 'http://localhost:3001')
    FRONTEND_PARTNERSHIP_URL = os.getenv('FRONTEND_PARTNERSHIP_URL', 'http://localhost:3002')
    
    # CORS Configuration
    CORS_ORIGINS = [
        FRONTEND_MAIN_URL,
        FRONTEND_AI_URL,
        FRONTEND_PARTNERSHIP_URL,
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002'
    ]
    
    # Database Configuration
    DATABASE_URL = SUPABASE_URL
    
    # Logging Configuration
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    LOG_FILE = os.getenv('LOG_FILE', 'foodshare.log')
    
    # API Configuration
    API_VERSION = 'v1'
    API_PREFIX = f'/api/{API_VERSION}'
    
    # Food Safety Configuration
    DEFAULT_FOOD_EXPIRY_HOURS = 24
    PREPARED_FOOD_EXPIRY_HOURS = 2
    
    # File Upload Configuration
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
    
    # Email Configuration (for notifications)
    SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
    SMTP_USERNAME = os.getenv('SMTP_USERNAME')
    SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')
    
    # Rate Limiting
    RATE_LIMIT_ENABLED = os.getenv('RATE_LIMIT_ENABLED', 'True').lower() == 'true'
    RATE_LIMIT_DEFAULT = os.getenv('RATE_LIMIT_DEFAULT', '100 per hour')
    
    @staticmethod
    def validate_config():
        """Validate required configuration variables"""
        required_vars = [
            'SUPABASE_URL',
            'SUPABASE_ANON_KEY'
        ]
        
        missing_vars = []
        for var in required_vars:
            if not os.getenv(var):
                missing_vars.append(var)
        
        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")
        
        return True

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    TESTING = False
    
    # Enhanced security for production
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'

class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DEBUG = True
    
    # Use test database
    SUPABASE_URL = os.getenv('SUPABASE_TEST_URL', Config.SUPABASE_URL)

# Configuration mapping
config_map = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

def get_config(env_name='default'):
    """Get configuration based on environment"""
    return config_map.get(env_name, DevelopmentConfig)
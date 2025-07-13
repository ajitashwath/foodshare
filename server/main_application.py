from flask import Flask, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os
import logging
from datetime import datetime

# Import custom modules
from config import get_config, Config
from ai_routes import create_ai_routes
from partnership_routes import create_partnership_routes
from database_setup import setup_database_tables, seed_sample_data

def create_app(config_name='default'):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    config = get_config(config_name)
    app.config.from_object(config)
    
    # Validate configuration
    try:
        config.validate_config()
    except ValueError as e:
        logging.error(f"Configuration error: {e}")
        raise
    
    # Initialize CORS
    CORS(app, origins=config.CORS_ORIGINS)
    
    # Configure logging
    logging.basicConfig(
        level=getattr(logging, config.LOG_LEVEL),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(config.LOG_FILE),
            logging.StreamHandler()
        ]
    )
    
    logger = logging.getLogger(__name__)
    
    # Initialize Supabase client
    try:
        supabase: Client = create_client(config.SUPABASE_URL, config.SUPABASE_ANON_KEY)
        app.supabase = supabase
        logger.info("Supabase client initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize Supabase client: {e}")
        raise
    
    # Register blueprints
    ai_routes = create_ai_routes(supabase)
    partnership_routes = create_partnership_routes(supabase)
    
    app.register_blueprint(ai_routes)
    app.register_blueprint(partnership_routes)
    
    # Main routes
    @app.route('/')
    def home():
        """Main FoodShare homepage"""
        return jsonify({
            "message": "Welcome to FoodShare Backend API",
            "version": "1.0.0",
            "timestamp": datetime.now().isoformat(),
            "endpoints": {
                "main_site": {
                    "donate": "/api/donate",
                    "partner_login": "/api/partner/login",
                    "health": "/api/health"
                },
                "ai_chatbot": {
                    "chat": "/api/ai/chat",
                    "guidelines": "/api/ai/guidelines",
                    "donation_form": "/api/ai/donation-form"
                },
                "partnership": {
                    "overview": "/api/partnership/overview",
                    "partners": "/api/partnership/partners",
                    "register": "/api/partnership/partner/register",
                    "login": "/api/partnership/partner/login",
                    "food_requests": "/api/partnership/food-requests",
                    "match_donations": "/api/partnership/match-donations"
                }
            },
            "documentation": {
                "main_site": "Main FoodShare website backend",
                "ai_chatbot": "AI-powered food donation assistance",
                "partnership": "NGO partnership management system"
            }
        })
    
    @app.route('/api/donate', methods=['GET', 'POST'])
    def handle_donate():
        """Handle donation process and provide AI chatbot info"""
        from flask import request
        import uuid
        
        if request.method == 'POST':
            try:
                # Log donation attempt
                donation_data = {
                    'user_id': request.json.get('user_id', str(uuid.uuid4())),
                    'action': 'donate_initiated',
                    'timestamp': datetime.now().isoformat(),
                    'ip_address': request.remote_addr
                }
                
                # Store in Supabase
                result = supabase.table('donation_logs').insert(donation_data).execute()
                logger.info(f"Donation logged: {result.data}")
                
                return jsonify({
                    'success': True,
                    'message': 'Donation process initiated',
                    'ai_chatbot_url': config.FRONTEND_AI_URL,
                    'session_id': donation_data['user_id'],
                    'next_step': 'Redirecting to AI chatbot for food safety guidance'
                })
                
            except Exception as e:
                logger.error(f"Error in donation process: {str(e)}")
                return jsonify({'error': 'Failed to process donation'}), 500
        
        # GET request - return donation info
        return jsonify({
            'message': 'FoodShare AI Donation Portal',
            'description': 'Connecting surplus food with those in need',
            'weekly_distribution': '2,000,000 lbs',
            'ai_chatbot_url': config.FRONTEND_AI_URL,
            'safety_guidelines': 'AI will guide you through food safety requirements'
        })
    
    @app.route('/api/partner/login', methods=['GET', 'POST'])
    def handle_partner_login():
        """Handle partner login and provide partnership site info"""
        from flask import request
        import uuid
        
        if request.method == 'POST':
            try:
                login_data = request.json
                email = login_data.get('email')
                
                # Log partner login attempt
                partner_login = {
                    'email': email,
                    'login_attempt': datetime.now().isoformat(),
                    'ip_address': request.remote_addr,
                    'status': 'attempted'
                }
                
                # Store in Supabase
                result = supabase.table('partner_logins').insert(partner_login).execute()
                logger.info(f"Partner login logged: {result.data}")
                
                return jsonify({
                    'success': True,
                    'message': 'Partner login processed',
                    'partnership_site_url': config.FRONTEND_PARTNERSHIP_URL,
                    'partner_id': str(uuid.uuid4()),
                    'next_step': 'Redirecting to partnership management portal'
                })
                
            except Exception as e:
                logger.error(f"Error in partner login: {str(e)}")
                return jsonify({'error': 'Failed to process partner login'}), 500
        
        # GET request - return partnership info
        return jsonify({
            'message': 'FoodShare Partner Portal',
            'description': 'Building partnerships for food security across India',
            'partnership_site_url': config.FRONTEND_PARTNERSHIP_URL,
            'features': [
                'NGO partner registration',
                'Food request management',
                'Donation matching system',
                'Impact tracking'
            ]
        })
    
    @app.route('/api/health')
    def health_check():
        """Health check endpoint"""
        try:
            # Test Supabase connection
            supabase.table('health_check').select('*').limit(1).execute()
            return jsonify({
                'status': 'healthy',
                'database': 'connected',
                'timestamp': datetime.now().isoformat(),
                'version': '1.0.0'
            })
        except Exception as e:
            logger.error(f"Health check failed: {str(e)}")
            return jsonify({
                'status': 'unhealthy',
                'database': 'disconnected',
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            }), 500
    
    @app.route('/api/setup-database', methods=['POST'])
    def setup_database():
        """Setup database tables (for initial deployment)"""
        try:
            if setup_database_tables(supabase):
                logger.info("Database setup completed")
                return jsonify({
                    'success': True,
                    'message': 'Database tables created successfully'
                })
            else:
                return jsonify({
                    'success': False,
                    'message': 'Database setup failed'
                }), 500
        except Exception as e:
            logger.error(f"Database setup error: {str(e)}")
            return jsonify({
                'success': False,
                'error': str(e)
            }), 500
    
    @app.route('/api/seed-data', methods=['POST'])
    def seed_data():
        """Seed database with sample data"""
        try:
            if seed_sample_data(supabase):
                logger.info("Sample data seeded successfully")
                return jsonify({
                    'success': True,
                    'message': 'Sample data seeded successfully'
                })
            else:
                return jsonify({
                    'success': False,
                    'message': 'Data seeding failed'
                }), 500
        except Exception as e:
            logger.error(f"Data seeding error: {str(e)}")
            return jsonify({
                'success': False,
                'error': str(e)
            }), 500
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'error': 'Endpoint not found',
            'message': 'The requested endpoint does not exist',
            'available_endpoints': [
                '/api/donate',
                '/api/partner/login',
                '/api/health',
                '/api/ai/chat',
                '/api/partnership/overview'
            ]
        }), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        logger.error(f"Internal server error: {str(error)}")
        return jsonify({
            'error': 'Internal server error',
            'message': 'An unexpected error occurred'
        }), 500
    
    return app

if __name__ == '__main__':
    # Get environment
    env = os.getenv('FLASK_ENV', 'development')
    
    # Create application
    app = create_app(env)
    
    # Run application
    app.run(
        host='127.0.0.0',
        port=int(os.getenv('PORT', 5000)),
        debug=app.config['DEBUG']
    )
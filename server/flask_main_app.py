from flask import Flask, request, jsonify, redirect, url_for, render_template_string
from flask_cors import CORS
from supabase import create_client, Client
import os
from datetime import datetime
import uuid
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'your-supabase-url')
SUPABASE_KEY = os.getenv('SUPABASE_ANON_KEY', 'your-supabase-anon-key')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Main FoodShare website routes
@app.route('/')
def home():
    """Main FoodShare homepage"""
    return jsonify({
        "message": "Welcome to FoodShare Backend",
        "version": "1.0.0",
        "endpoints": {
            "donate": "/api/donate",
            "partner_login": "/api/partner/login",
            "ai_chat": "/api/ai/chat",
            "partnerships": "/api/partnerships"
        }
    })

# Route to handle "Start Donate" button click
@app.route('/api/donate', methods=['GET', 'POST'])
def handle_donate():
    """Handle donation process and redirect to AI chatbot"""
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
                'redirect_url': '/ai-chatbot',
                'session_id': donation_data['user_id']
            })
            
        except Exception as e:
            logger.error(f"Error in donation process: {str(e)}")
            return jsonify({'error': 'Failed to process donation'}), 500
    
    # GET request - return donation info
    return jsonify({
        'message': 'FoodShare AI Donation Portal',
        'description': 'Connecting surplus food with those in need',
        'weekly_distribution': '2,000,000 lbs',
        'ai_chatbot_url': '/ai-chatbot'
    })

# Route to handle "Partner Login" button click
@app.route('/api/partner/login', methods=['GET', 'POST'])
def handle_partner_login():
    """Handle partner login and redirect to partnership site"""
    if request.method == 'POST':
        try:
            login_data = request.json
            email = login_data.get('email')
            password = login_data.get('password')
            
            # Authenticate partner (you can implement proper auth logic here)
            # For now, we'll just log the attempt
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
                'message': 'Partner login successful',
                'redirect_url': '/partnership-site',
                'partner_id': str(uuid.uuid4())
            })
            
        except Exception as e:
            logger.error(f"Error in partner login: {str(e)}")
            return jsonify({'error': 'Failed to process partner login'}), 500
    
    # GET request - return login info
    return jsonify({
        'message': 'FoodShare Partner Portal',
        'description': 'Building partnerships for food security',
        'partnership_site_url': '/partnership-site'
    })

# Health check endpoint
@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    try:
        # Test Supabase connection
        supabase.table('health_check').select('*').limit(1).execute()
        return jsonify({
            'status': 'healthy',
            'database': 'connected',
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'database': 'disconnected',
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.0', port=5000)
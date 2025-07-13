from flask import Blueprint, request, jsonify
from supabase import Client
import uuid
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

def create_ai_routes(supabase: Client):
    ai_bp = Blueprint('ai', __name__, url_prefix='/api/ai')
    
    @ai_bp.route('/chat', methods=['POST'])
    def handle_chat():
        """Handle AI chatbot interactions for food donation"""
        try:
            data = request.json
            user_message = data.get('message', '')
            session_id = data.get('session_id', str(uuid.uuid4()))
            
            # Store chat interaction in Supabase
            chat_data = {
                'session_id': session_id,
                'user_message': user_message,
                'timestamp': datetime.now().isoformat(),
                'ip_address': request.remote_addr,
                'chat_type': 'food_donation'
            }
            
            result = supabase.table('chat_interactions').insert(chat_data).execute()
            logger.info(f"Chat interaction logged: {result.data}")
            
            # Simple AI response logic for food donation
            ai_response = generate_ai_response(user_message)
            
            # Store AI response
            response_data = {
                'session_id': session_id,
                'ai_response': ai_response,
                'timestamp': datetime.now().isoformat(),
                'response_type': 'food_safety_guidance'
            }
            
            supabase.table('ai_responses').insert(response_data).execute()
            
            return jsonify({
                'success': True,
                'response': ai_response,
                'session_id': session_id,
                'guidelines': get_food_safety_guidelines()
            })
            
        except Exception as e:
            logger.error(f"Error in AI chat: {str(e)}")
            return jsonify({'error': 'Failed to process chat message'}), 500
    
    @ai_bp.route('/guidelines', methods=['GET'])
    def get_guidelines():
        """Get food safety guidelines"""
        return jsonify({
            'guidelines': get_food_safety_guidelines(),
            'last_updated': datetime.now().isoformat()
        })
    
    @ai_bp.route('/donation-form', methods=['POST'])
    def handle_donation_form():
        """Handle food donation form submission"""
        try:
            data = request.json
            
            donation_form = {
                'donor_name': data.get('donor_name', ''),
                'donor_email': data.get('donor_email', ''),
                'donor_phone': data.get('donor_phone', ''),
                'food_type': data.get('food_type', ''),
                'quantity': data.get('quantity', ''),
                'expiry_date': data.get('expiry_date', ''),
                'pickup_location': data.get('pickup_location', ''),
                'preferred_pickup_time': data.get('preferred_pickup_time', ''),
                'special_instructions': data.get('special_instructions', ''),
                'submission_time': datetime.now().isoformat(),
                'status': 'pending'
            }
            
            result = supabase.table('food_donations').insert(donation_form).execute()
            logger.info(f"Donation form submitted: {result.data}")
            
            return jsonify({
                'success': True,
                'message': 'Donation form submitted successfully',
                'donation_id': result.data[0]['id'] if result.data else None
            })
            
        except Exception as e:
            logger.error(f"Error in donation form: {str(e)}")
            return jsonify({'error': 'Failed to submit donation form'}), 500
    
    return ai_bp

def generate_ai_response(user_message):
    """Generate AI response based on user message"""
    message_lower = user_message.lower()
    
    if 'food safety' in message_lower or 'safe' in message_lower:
        return "I can help you with food safety guidelines! Here are the key points: Food must be within expiry date, prepared food should be donated within 2 hours, keep food at proper temperature, and package food securely. What specific food safety question do you have?"
    
    elif 'expiry' in message_lower or 'expire' in message_lower:
        return "Food donations must be within their expiry date. For prepared foods, they should be donated within 2 hours of preparation. Please check the expiry date on packaged foods before donating."
    
    elif 'temperature' in message_lower or 'cold' in message_lower or 'hot' in message_lower:
        return "Temperature control is crucial! Keep cold foods below 40°F (4°C) and hot foods above 140°F (60°C). If you're unsure about temperature safety, it's better to be cautious."
    
    elif 'packaging' in message_lower or 'package' in message_lower:
        return "Please package food securely to prevent contamination. Use clean containers, seal properly, and label with preparation time if applicable. Original packaging is preferred when possible."
    
    elif 'donate' in message_lower or 'donation' in message_lower:
        return "I'm here to help you donate food safely! I can guide you through our food safety guidelines and help you prepare your donation. What type of food are you looking to donate?"
    
    elif 'hello' in message_lower or 'hi' in message_lower:
        return "Hello! Welcome to FoodShare AI. I'm here to help you donate surplus food safely and efficiently. How can I assist you with your food donation today?"
    
    else:
        return "I'm here to help you with food donations and safety guidelines. You can ask me about food safety, expiry dates, proper packaging, or temperature requirements. How can I assist you?"

def get_food_safety_guidelines():
    """Return food safety guidelines"""
    return {
        'guidelines': [
            {
                'title': 'Food must be within expiry date',
                'description': 'Check all expiry dates before donating',
                'icon': '⚠️'
            },
            {
                'title': 'Prepared food should be donated within 2 hours',
                'description': 'Freshly prepared food has a 2-hour window for safe donation',
                'icon': '⚠️'
            },
            {
                'title': 'Keep food at proper temperature',
                'description': 'Cold foods below 40°F, hot foods above 140°F',
                'icon': '⚠️'
            },
            {
                'title': 'Package food securely',
                'description': 'Use clean containers and proper sealing',
                'icon': '⚠️'
            },
            {
                'title': 'Label with preparation time if applicable',
                'description': 'Include preparation time for homemade items',
                'icon': '⚠️'
            }
        ]
    }
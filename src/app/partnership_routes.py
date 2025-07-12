from flask import Blueprint, request, jsonify
from supabase import Client
import uuid
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

def create_partnership_routes(supabase: Client):
    partnership_bp = Blueprint('partnership', __name__, url_prefix='/api/partnership')
    
    @partnership_bp.route('/overview', methods=['GET'])
    def get_partnership_overview():
        """Get partnership overview information"""
        try:
            # Fetch partnership data from Supabase
            result = supabase.table('partnerships').select('*').execute()
            partnerships = result.data if result.data else []
            
            return jsonify({
                'success': True,
                'message': 'Building Partnerships for Food Security',
                'description': 'Together with our NGO partners, we\'re creating a sustainable network to combat food waste and hunger across India.',
                'total_partners': len(partnerships),
                'partnerships': partnerships,
                'impact_stats': {
                    'food_distributed': '2,000,000 lbs/week',
                    'partners_active': len(partnerships),
                    'communities_served': '150+',
                    'waste_reduced': '85%'
                }
            })
            
        except Exception as e:
            logger.error(f"Error fetching partnership overview: {str(e)}")
            return jsonify({'error': 'Failed to fetch partnership data'}), 500
    
    @partnership_bp.route('/partners', methods=['GET'])
    def get_partners():
        """Get list of NGO partners"""
        try:
            result = supabase.table('ngo_partners').select('*').execute()
            partners = result.data if result.data else []
            
            return jsonify({
                'success': True,
                'partners': partners,
                'total_count': len(partners)
            })
            
        except Exception as e:
            logger.error(f"Error fetching partners: {str(e)}")
            return jsonify({'error': 'Failed to fetch partners'}), 500
    
    @partnership_bp.route('/partner/register', methods=['POST'])
    def register_partner():
        """Register a new NGO partner"""
        try:
            data = request.json
            
            partner_data = {
                'id': str(uuid.uuid4()),
                'organization_name': data.get('organization_name', ''),
                'contact_person': data.get('contact_person', ''),
                'email': data.get('email', ''),
                'phone': data.get('phone', ''),
                'address': data.get('address', ''),
                'city': data.get('city', ''),
                'state': data.get('state', ''),
                'registration_number': data.get('registration_number', ''),
                'focus_areas': data.get('focus_areas', []),
                'capacity': data.get('capacity', ''),
                'service_areas': data.get('service_areas', []),
                'registration_date': datetime.now().isoformat(),
                'status': 'pending_verification',
                'verified': False
            }
            
            result = supabase.table('ngo_partners').insert(partner_data).execute()
            logger.info(f"Partner registered: {result.data}")
            
            return jsonify({
                'success': True,
                'message': 'Partner registration submitted successfully',
                'partner_id': partner_data['id'],
                'status': 'pending_verification'
            })
            
        except Exception as e:
            logger.error(f"Error registering partner: {str(e)}")
            return jsonify({'error': 'Failed to register partner'}), 500
    
    @partnership_bp.route('/partner/login', methods=['POST'])
    def partner_login():
        """Handle partner login"""
        try:
            data = request.json
            email = data.get('email', '')
            password = data.get('password', '')
            
            # Check if partner exists
            result = supabase.table('ngo_partners').select('*').eq('email', email).execute()
            
            if not result.data:
                return jsonify({'error': 'Partner not found'}), 404
            
            partner = result.data[0]
            
            # Log login attempt
            login_log = {
                'partner_id': partner['id'],
                'email': email,
                'login_time': datetime.now().isoformat(),
                'ip_address': request.remote_addr,
                'status': 'success'
            }
            
            supabase.table('partner_login_logs').insert(login_log).execute()
            
            return jsonify({
                'success': True,
                'message': 'Login successful',
                'partner': {
                    'id': partner['id'],
                    'organization_name': partner['organization_name'],
                    'contact_person': partner['contact_person'],
                    'verified': partner['verified'],
                    'status': partner['status']
                },
                'session_token': str(uuid.uuid4())  # Generate session token
            })
            
        except Exception as e:
            logger.error(f"Error in partner login: {str(e)}")
            return jsonify({'error': 'Failed to process login'}), 500
    
    @partnership_bp.route('/food-requests', methods=['GET', 'POST'])
    def handle_food_requests():
        """Handle food requests from partners"""
        if request.method == 'POST':
            try:
                data = request.json
                
                food_request = {
                    'id': str(uuid.uuid4()),
                    'partner_id': data.get('partner_id', ''),
                    'requested_food_types': data.get('requested_food_types', []),
                    'quantity_needed': data.get('quantity_needed', ''),
                    'urgency_level': data.get('urgency_level', 'medium'),
                    'delivery_location': data.get('delivery_location', ''),
                    'preferred_delivery_time': data.get('preferred_delivery_time', ''),
                    'beneficiary_count': data.get('beneficiary_count', 0),
                    'special_requirements': data.get('special_requirements', ''),
                    'request_date': datetime.now().isoformat(),
                    'status': 'pending'
                }
                
                result = supabase.table('food_requests').insert(food_request).execute()
                logger.info(f"Food request created: {result.data}")
                
                return jsonify({
                    'success': True,
                    'message': 'Food request submitted successfully',
                    'request_id': food_request['id']
                })
                
            except Exception as e:
                logger.error(f"Error creating food request: {str(e)}")
                return jsonify({'error': 'Failed to create food request'}), 500
        
        else:  # GET request
            try:
                partner_id = request.args.get('partner_id')
                query = supabase.table('food_requests').select('*')
                
                if partner_id:
                    query = query.eq('partner_id', partner_id)
                
                result = query.execute()
                requests = result.data if result.data else []
                
                return jsonify({
                    'success': True,
                    'requests': requests,
                    'total_count': len(requests)
                })
                
            except Exception as e:
                logger.error(f"Error fetching food requests: {str(e)}")
                return jsonify({'error': 'Failed to fetch food requests'}), 500
    
    @partnership_bp.route('/match-donations', methods=['GET'])
    def match_donations():
        """Match available donations with partner requests"""
        try:
            # Get pending food requests
            requests_result = supabase.table('food_requests').select('*').eq('status', 'pending').execute()
            requests = requests_result.data if requests_result.data else []
            
            # Get available donations
            donations_result = supabase.table('food_donations').select('*').eq('status', 'pending').execute()
            donations = donations_result.data if donations_result.data else []
            
            # Simple matching logic (can be enhanced with ML)
            matches = []
            for request in requests:
                for donation in donations:
                    # Basic matching criteria
                    if (request['urgency_level'] == 'high' or 
                        any(food_type in donation['food_type'].lower() 
                            for food_type in request['requested_food_types'])):
                        matches.append({
                            'request_id': request['id'],
                            'donation_id': donation['id'],
                            'partner_id': request['partner_id'],
                            'match_score': calculate_match_score(request, donation),
                            'created_at': datetime.now().isoformat()
                        })
            
            return jsonify({
                'success': True,
                'matches': matches,
                'total_matches': len(matches)
            })
            
        except Exception as e:
            logger.error(f"Error matching donations: {str(e)}")
            return jsonify({'error': 'Failed to match donations'}), 500
    
    return partnership_bp

def calculate_match_score(request, donation):
    """Calculate match score between request and donation"""
    score = 0
    
    # Urgency bonus
    if request['urgency_level'] == 'high':
        score += 30
    elif request['urgency_level'] == 'medium':
        score += 20
    
    # Food type matching
    for food_type in request['requested_food_types']:
        if food_type.lower() in donation['food_type'].lower():
            score += 25
    
    # Quantity consideration (simplified)
    try:
        req_qty = int(request['quantity_needed'])
        don_qty = int(donation['quantity'])
        if don_qty >= req_qty:
            score += 20
        elif don_qty >= req_qty * 0.7:  # 70% of required quantity
            score += 15
    except (ValueError, TypeError):
        pass
    
    return min(score, 100)  # Cap at 100
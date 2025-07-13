from supabase import Client
import logging

logger = logging.getLogger(__name__)

def setup_database_tables(supabase: Client):
    create_tables_sql = [
        """
        CREATE TABLE IF NOT EXISTS donation_logs (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id TEXT NOT NULL,
            action TEXT NOT NULL,
            timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            ip_address TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        """,
        
        """
        CREATE TABLE IF NOT EXISTS partner_logins (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email TEXT NOT NULL,
            login_attempt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            ip_address TEXT,
            status TEXT DEFAULT 'attempted',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        """,
        
        """
        CREATE TABLE IF NOT EXISTS chat_interactions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            session_id TEXT NOT NULL,
            user_message TEXT NOT NULL,
            timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            ip_address TEXT,
            chat_type TEXT DEFAULT 'food_donation',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        """,
        
        """
        CREATE TABLE IF NOT EXISTS ai_responses (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            session_id TEXT NOT NULL,
            ai_response TEXT NOT NULL,
            timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            response_type TEXT DEFAULT 'food_safety_guidance',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        """,
        
        """
        CREATE TABLE IF NOT EXISTS food_donations (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            donor_name TEXT NOT NULL,
            donor_email TEXT NOT NULL,
            donor_phone TEXT,
            food_type TEXT NOT NULL,
            quantity TEXT NOT NULL,
            expiry_date DATE,
            pickup_location TEXT NOT NULL,
            preferred_pickup_time TEXT,
            special_instructions TEXT,
            submission_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        """,
        
        """
        CREATE TABLE IF NOT EXISTS ngo_partners (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            organization_name TEXT NOT NULL,
            contact_person TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            address TEXT,
            city TEXT,
            state TEXT,
            registration_number TEXT,
            focus_areas JSONB DEFAULT '[]',
            capacity TEXT,
            service_areas JSONB DEFAULT '[]',
            registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            status TEXT DEFAULT 'pending_verification',
            verified BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        """,
        
        """
        CREATE TABLE IF NOT EXISTS partner_login_logs (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            partner_id UUID REFERENCES ngo_partners(id),
            email TEXT NOT NULL,
            login_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            ip_address TEXT,
            status TEXT DEFAULT 'success',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        """,
        
        """
        CREATE TABLE IF NOT EXISTS food_requests (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            partner_id UUID REFERENCES ngo_partners(id),
            requested_food_types JSONB DEFAULT '[]',
            quantity_needed TEXT NOT NULL,
            urgency_level TEXT DEFAULT 'medium',
            delivery_location TEXT NOT NULL,
            preferred_delivery_time TEXT,
            beneficiary_count INTEGER DEFAULT 0,
            special_requirements TEXT,
            request_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        """,
        
        """
        CREATE TABLE IF NOT EXISTS partnerships (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            description TEXT,
            partner_id UUID REFERENCES ngo_partners(id),
            start_date DATE,
            status TEXT DEFAULT 'active',
            impact_metrics JSONB DEFAULT '{}',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        """,
        
        """
        CREATE TABLE IF NOT EXISTS donation_matches (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            request_id UUID REFERENCES food_requests(id),
            donation_id UUID REFERENCES food_donations(id),
            partner_id UUID REFERENCES ngo_partners(id),
            match_score INTEGER DEFAULT 0,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        """,
        
        """
        CREATE TABLE IF NOT EXISTS health_check (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            status TEXT DEFAULT 'healthy',
            last_check TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        """
    ]
    
    try:
        for sql in create_tables_sql:
            supabase.rpc('exec_sql', {'sql': sql}).execute()
            logger.info("Database table created successfully")
        
        # Insert initial health check record
        supabase.table('health_check').insert({
            'status': 'healthy'
        }).execute()
        
        logger.info("Database setup completed successfully")
        return True
        
    except Exception as e:
        logger.error(f"Error setting up database: {str(e)}")
        return False

def seed_sample_data(supabase: Client):
    """Seed database with sample data for testing"""
    
    try:
        # Sample NGO partners
        sample_partners = [
            {
                'organization_name': 'Hope Foundation India',
                'contact_person': 'Rahul Sharma',
                'email': 'rahul@hopefoundation.org',
                'phone': '+91-9876543210',
                'address': '123 Gandhi Nagar, New Delhi',
                'city': 'New Delhi',
                'state': 'Delhi',
                'registration_number': 'NGO/2020/001',
                'focus_areas': ['Food Security', 'Child Welfare', 'Education'],
                'capacity': '500 meals/day',
                'service_areas': ['Delhi', 'Gurgaon', 'Noida'],
                'verified': True,
                'status': 'active'
            }
        ]
        
        # Insert sample partners
        for partner in sample_partners:
            supabase.table('ngo_partners').insert(partner).execute()
        
        # Sample partnerships
        sample_partnerships = [
            {
                'name': 'Urban Food Recovery Program',
                'type': 'Food Rescue',
                'description': 'Partnership with restaurants and hotels to rescue surplus food',
                'impact_metrics': {
                    'food_rescued': '50000 lbs/month',
                    'families_served': '1200',
                    'waste_reduction': '75%'
                }
            },
            {
                'name': 'Rural Hunger Relief Initiative',
                'type': 'Community Support',
                'description': 'Supporting rural communities with regular food distribution',
                'impact_metrics': {
                    'villages_covered': '25',
                    'beneficiaries': '800',
                    'distribution_frequency': 'weekly'
                }
            }
        ]
        
        # Insert sample partnerships
        for partnership in sample_partnerships:
            supabase.table('partnerships').insert(partnership).execute()
        
        logger.info("Sample data seeded successfully")
        return True
        
    except Exception as e:
        logger.error(f"Error seeding sample data: {str(e)}")
        return False'active'
            },
            {
                'organization_name': 'Feeding Hearts NGO',
                'contact_person': 'Priya Patel',
                'email': 'priya@feedinghearts.org',
                'phone': '+91-9876543211',
                'address': '456 MG Road, Mumbai',
                'city': 'Mumbai',
                'state': 'Maharashtra',
                'registration_number': 'NGO/2021/002',
                'focus_areas': ['Hunger Relief', 'Community Development'],
                'capacity': '300 meals/day',
                'service_areas': ['Mumbai', 'Pune', 'Nashik'],
                'verified': True,
                'status': 'active'
            },
            {
                'organization_name': 'Rural Development Trust',
                'contact_person': 'Amit Kumar',
                'email': 'amit@ruraldev.org',
                'phone': '+91-9876543212',
                'address': '789 Village Road, Patna',
                'city': 'Patna',
                'state': 'Bihar',
                'registration_number': 'NGO/2019/003',
                'focus_areas': ['Rural Development', 'Food Distribution'],
                'capacity': '200 meals/day',
                'service_areas': ['Patna', 'Gaya', 'Muzaffarpur'],
                'verified': True,
                'status': 
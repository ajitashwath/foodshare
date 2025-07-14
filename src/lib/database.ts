import { supabaseAdmin } from './supabase';
import { config } from './config';

export class DatabaseService {
  private supabase = supabaseAdmin;

  async setupTables(): Promise<boolean> {
    const createTablesSQL = [
      `CREATE TABLE IF NOT EXISTS donation_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        action TEXT NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        ip_address TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS partner_logins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL,
        login_attempt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        ip_address TEXT,
        status TEXT DEFAULT 'attempted',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS chat_interactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id TEXT NOT NULL,
        user_message TEXT NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        ip_address TEXT,
        chat_type TEXT DEFAULT 'food_donation',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS ai_responses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id TEXT NOT NULL,
        ai_response TEXT NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        response_type TEXT DEFAULT 'food_safety_guidance',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS food_donations (
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
      );`,
      `CREATE TABLE IF NOT EXISTS ngo_partners (
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
      );`,
      `CREATE TABLE IF NOT EXISTS food_requests (
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
      );`,
      `CREATE TABLE IF NOT EXISTS partnerships (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT,
        partner_id UUID REFERENCES ngo_partners(id),
        start_date DATE,
        status TEXT DEFAULT 'active',
        impact_metrics JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS donation_matches (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        request_id UUID REFERENCES food_requests(id),
        donation_id UUID REFERENCES food_donations(id),
        partner_id UUID REFERENCES ngo_partners(id),
        match_score INTEGER DEFAULT 0,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS health_check (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        status TEXT DEFAULT 'healthy',
        last_check TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );`
    ];

    try {
      for (const sql of createTablesSQL) {
        // Ensure 'exec_sql' function is created in Supabase SQL Editor
        await this.supabase.rpc('exec_sql', { sql });
      }

      await this.supabase.from('health_check').insert([{ status: 'healthy' }]);

      console.log('Database setup completed successfully');
      return true;
    } catch (error) {
      console.error('Error setting up database:', error);
      return false;
    }
  }

  async seedSampleData(): Promise<boolean> {
    try {
      const samplePartners = [
        {
          organization_name: 'HEEALS NGO',
          contact_person: 'Dr. Rajesh Kumar',
          email: 'communications@heeals.org',
          phone: '+91-7982316660',
          address: '#692, Sector 22-B, Gurgaon-122015, Haryana (India)',
          city: 'Gurgaon',
          state: 'Haryana',
          registration_number: 'NGO/2020/001',
          focus_areas: ['Public Health', 'Education & Livelihood', 'WASH', 'Menstrual Hygiene', 'Mental Health', 'Environmental Sustainability'],
          capacity: '500 meals/day',
          service_areas: ['Gurgaon', 'Delhi', 'Noida'],
          verified: true,
          status: 'active'
        },
        {
          organization_name: 'Punjabi Samvad NGO',
          contact_person: 'Simran Kaur',
          email: 'info@punjabisamvad.org',
          phone: '+91-9876543210',
          address: 'Amritsar, Punjab',
          city: 'Amritsar',
          state: 'Punjab',
          registration_number: 'NGO/2021/002',
          focus_areas: ['Women Empowerment', 'Child Welfare', 'Cultural Preservation', 'Social Awareness', 'Education', 'Vocational Skills'],
          capacity: '300 meals/day',
          service_areas: ['Amritsar', 'Jalandhar', 'Ludhiana'],
          verified: true,
          status: 'active'
        }
      ];

      for (const partner of samplePartners) {
        await this.supabase.from('ngo_partners').insert([partner]);
      }

      const samplePartnerships = [
        {
          name: 'Urban Food Recovery Program',
          type: 'Food Rescue',
          description: 'Partnership with restaurants and hotels to rescue surplus food',
          impact_metrics: {
            food_rescued: '50000 lbs/month',
            families_served: '1200',
            waste_reduction: '75%'
          }
        },
        {
          name: 'Rural Hunger Relief Initiative',
          type: 'Community Support',
          description: 'Supporting rural communities with regular food distribution',
          impact_metrics: {
            villages_covered: '25',
            beneficiaries: '800',
            distribution_frequency: 'weekly'
          }
        }
      ];

      for (const partnership of samplePartnerships) {
        await this.supabase.from('partnerships').insert([partnership]);
      }

      console.log('Sample data seeded successfully');
      return true;
    } catch (error) {
      console.error('Error seeding sample data:', error);
      return false;
    }
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      await this.supabase.from('health_check').select('*').limit(1);
      return {
        status: 'healthy',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString()
      };
    }
  }
}

export const databaseService = new DatabaseService();

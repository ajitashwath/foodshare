import { createClient } from '@supabase/supabase-js';
import { config } from './config';

export const supabase = createClient(
  config.database.supabaseUrl,
  config.database.supabaseAnonKey
);

export const supabaseAdmin = createClient(
  config.database.supabaseUrl,
  config.database.supabaseServiceRoleKey || config.database.supabaseAnonKey
);

export interface DonationLog {
  id: string;
  user_id: string;
  action: string;
  timestamp: string;
  ip_address?: string;
  created_at: string;
}

export interface PartnerLogin {
  id: string;
  email: string;
  login_attempt: string;
  ip_address?: string;
  status: string;
  created_at: string;
}

export interface ChatInteraction {
  id: string;
  session_id: string;
  user_message: string;
  timestamp: string;
  ip_address?: string;
  chat_type: string;
  created_at: string;
}

export interface AIResponse {
  id: string;
  session_id: string;
  ai_response: string;
  timestamp: string;
  response_type: string;
  created_at: string;
}

export interface FoodDonation {
  id: string;
  donor_name: string;
  donor_email: string;
  donor_phone?: string;
  food_type: string;
  quantity: string;
  expiry_date?: string;
  pickup_location: string;
  preferred_pickup_time?: string;
  special_instructions?: string;
  submission_time: string;
  status: string;
  created_at: string;
}

export interface NGOPartner {
  id: string;
  organization_name: string;
  contact_person: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  registration_number?: string;
  focus_areas: string[];
  capacity?: string;
  service_areas: string[];
  registration_date: string;
  status: string;
  verified: boolean;
  created_at: string;
}

export interface FoodRequest {
  id: string;
  partner_id: string;
  requested_food_types: string[];
  quantity_needed: string;
  urgency_level: string;
  delivery_location: string;
  preferred_delivery_time?: string;
  beneficiary_count: number;
  special_requirements?: string;
  request_date: string;
  status: string;
  created_at: string;
}

export interface Partnership {
  id: string;
  name: string;
  type: string;
  description?: string;
  partner_id?: string;
  start_date?: string;
  status: string;
  impact_metrics: Record<string, any>;
  created_at: string;
}

export interface DonationMatch {
  id: string;
  request_id: string;
  donation_id: string;
  partner_id: string;
  match_score: number;
  status: string;
  created_at: string;
}
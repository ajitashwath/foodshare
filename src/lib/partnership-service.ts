import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';
import type { NGOPartner, FoodRequest, Partnership, DonationMatch } from './supabase';

export interface PartnershipOverview {
  success: boolean;
  message: string;
  description: string;
  total_partners: number;
  partnerships: Partnership[];
  impact_stats: {
    food_distributed: string;
    partners_active: number;
    communities_served: string;
    waste_reduced: string;
  };
}

export interface PartnerRegistrationData {
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
}

export interface PartnerLoginData {
  email: string;
  password: string;
}

export interface FoodRequestData {
  partner_id: string;
  requested_food_types: string[];
  quantity_needed: string;
  urgency_level: string;
  delivery_location: string;
  preferred_delivery_time?: string;
  beneficiary_count: number;
  special_requirements?: string;
}

export class PartnershipService {
  async getPartnershipOverview(): Promise<PartnershipOverview> {
    try {
      const { data: partnerships, error: partnershipError } = await supabase
        .from('partnerships')
        .select('*');

      if (partnershipError) throw partnershipError;

      const { count: partnersCount, error: countError } = await supabase
        .from('ngo_partners')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;

      return {
        success: true,
        message: 'Building Partnerships for Food Security',
        description:
          "Together with our NGO partners, we're creating a sustainable network to combat food waste and hunger across India.",
        total_partners: partnersCount || 0,
        partnerships: partnerships || [],
        impact_stats: {
          food_distributed: '2,000,000 lbs/week',
          partners_active: partnersCount || 0,
          communities_served: '150+',
          waste_reduced: '85%',
        },
      };
    } catch (error) {
      console.error('Error fetching partnership overview:', error);
      throw new Error('Failed to fetch partnership data');
    }
  }

  async getPartners(): Promise<{ success: boolean; partners: NGOPartner[]; total_count: number }> {
    try {
      const { data: partners, error } = await supabase
        .from('ngo_partners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        partners: partners || [],
        total_count: partners?.length || 0,
      };
    } catch (error) {
      console.error('Error fetching partners:', error);
      throw new Error('Failed to fetch partners');
    }
  }

  async registerPartner(
    data: PartnerRegistrationData
  ): Promise<{ success: boolean; partner_id: string; status: string }> {
    try {
      const partnerId = uuidv4();
      const partnerData = {
        id: partnerId,
        ...data,
        registration_date: new Date().toISOString(),
        status: 'pending_verification',
        verified: false,
      };

      const { error } = await supabase.from('ngo_partners').insert(partnerData);

      if (error) throw error;

      return {
        success: true,
        partner_id: partnerId,
        status: 'pending_verification',
      };
    } catch (error) {
      console.error('Error registering partner:', error);
      throw new Error('Failed to register partner');
    }
  }

  async partnerLogin(data: PartnerLoginData, ipAddress?: string): Promise<{
    success: boolean;
    partner: Partial<NGOPartner>;
    session_token: string;
  }> {
    try {
      const { data: partners, error } = await supabase
        .from('ngo_partners')
        .select('*')
        .eq('email', data.email)
        .single();

      if (error || !partners) {
        throw new Error('Partner not found');
      }

      const loginLog = {
        partner_id: partners.id,
        email: data.email,
        login_time: new Date().toISOString(),
        ip_address: ipAddress,
        status: 'success',
      };

      await supabase.from('partner_login_logs').insert(loginLog);

      return {
        success: true,
        partner: {
          id: partners.id,
          organization_name: partners.organization_name,
          contact_person: partners.contact_person,
          verified: partners.verified,
          status: partners.status,
        },
        session_token: uuidv4(),
      };
    } catch (error) {
      console.error('Error in partner login:', error);
      throw new Error('Failed to process login');
    }
  }

  async createFoodRequest(
    data: FoodRequestData
  ): Promise<{ success: boolean; request_id: string }> {
    try {
      const requestId = uuidv4();
      const requestData = {
        id: requestId,
        ...data,
        request_date: new Date().toISOString(),
        status: 'pending',
      };

      const { error } = await supabase.from('food_requests').insert(requestData);

      if (error) throw error;

      return {
        success: true,
        request_id: requestId,
      };
    } catch (error) {
      console.error('Error creating food request:', error);
      throw new Error('Failed to create food request');
    }
  }

  async getFoodRequests(
    partnerId?: string
  ): Promise<{ success: boolean; requests: FoodRequest[]; total_count: number }> {
    try {
      let query = supabase.from('food_requests').select('*');

      if (partnerId) {
        query = query.eq('partner_id', partnerId);
      }

      const { data: requests, error } = await query.order('created_at', {
        ascending: false,
      });

      if (error) throw error;

      return {
        success: true,
        requests: requests || [],
        total_count: requests?.length || 0,
      };
    } catch (error) {
      console.error('Error fetching food requests:', error);
      throw new Error('Failed to fetch food requests');
    }
  }

  async matchDonations(): Promise<{ success: boolean; matches: DonationMatch[]; total_matches: number }> {
    try {
      const { data: requests, error: requestsError } = await supabase
        .from('food_requests')
        .select('*')
        .eq('status', 'pending');

      if (requestsError) throw requestsError;

      const { data: donations, error: donationsError } = await supabase
        .from('food_donations')
        .select('*')
        .eq('status', 'pending');

      if (donationsError) throw donationsError;

      const matches: Partial<DonationMatch>[] = [];

      for (const request of requests || []) {
        for (const donation of donations || []) {
          if (
            request.urgency_level === 'high' ||
            request.requested_food_types.some((foodType: string) =>
              donation.food_type.toLowerCase().includes(foodType.toLowerCase())
            )
          ) {
            matches.push({
              request_id: request.id,
              donation_id: donation.id,
              partner_id: request.partner_id,
              match_score: this.calculateMatchScore(request, donation),
              created_at: new Date().toISOString(),
            });
          }
        }
      }

      return {
        success: true,
        matches: matches as DonationMatch[],
        total_matches: matches.length,
      };
    } catch (error) {
      console.error('Error matching donations:', error);
      throw new Error('Failed to match donations');
    }
  }

  private calculateMatchScore(request: FoodRequest, donation: any): number {
    let score = 0;

    if (request.urgency_level === 'high') {
      score += 30;
    } else if (request.urgency_level === 'medium') {
      score += 20;
    }

    for (const foodType of request.requested_food_types) {
      if (donation.food_type.toLowerCase().includes(foodType.toLowerCase())) {
        score += 25;
      }
    }

    try {
      const reqQty = parseInt(request.quantity_needed);
      const donQty = parseInt(donation.quantity);
      if (donQty >= reqQty) {
        score += 20;
      } else if (donQty >= reqQty * 0.7) {
        score += 15;
      }
    } catch (error) {}

    return Math.min(score, 100);
  }
}

export const partnershipService = new PartnershipService();

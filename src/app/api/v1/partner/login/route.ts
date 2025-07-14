import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    return NextResponse.json({
      message: 'FoodShare Partner Portal',
      description: 'Building partnerships for food security across India',
      partnership_site_url: '/partnership',
      features: [
        'NGO partner registration',
        'Food request management',
        'Donation matching system',
        'Impact tracking'
      ]
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch partner info' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;
    const ipAddress = request.ip || request.headers.get('x-forwarded-for') || 'unknown';

    // Log partner login attempt
    const partnerLogin = {
      email: email,
      login_attempt: new Date().toISOString(),
      ip_address: ipAddress,
      status: 'attempted'
    };

    const { error } = await supabase
      .table('partner_logins')
      .insert(partnerLogin);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Partner login processed',
      partnership_site_url: '/partnership',
      partner_id: uuidv4(),
      next_step: 'Redirecting to partnership management portal'
    });
  } catch (error) {
    console.error('Error in partner login:', error);
    return NextResponse.json(
      { error: 'Failed to process partner login' },
      { status: 500 }
    );
  }
}
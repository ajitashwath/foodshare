import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    return NextResponse.json({
      message: 'FoodShare AI Donation Portal',
      description: 'Connecting surplus food with those in need',
      weekly_distribution: '2,000,000 lbs',
      ai_chatbot_url: '/ai-chat',
      safety_guidelines: 'AI will guide you through food safety requirements'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch donation info' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.user_id || uuidv4();

    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor?.split(',')[0]?.trim() || 'unknown';

    const donationData = {
      user_id: userId,
      action: 'donate_initiated',
      timestamp: new Date().toISOString(),
      ip_address: ipAddress
    };

    const { error } = await supabase
      .from('donation_logs')
      .insert([donationData]);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Donation process initiated',
      ai_chatbot_url: '/ai-chat',
      session_id: userId,
      next_step: 'Redirecting to AI chatbot for food safety guidance'
    });
  } catch (error) {
    console.error('Error in donation process:', error);
    return NextResponse.json(
      { error: 'Failed to process donation' },
      { status: 500 }
    );
  }
}

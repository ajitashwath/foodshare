import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = await aiService.submitDonationForm(body);

    return NextResponse.json({
      success: true,
      message: 'Donation form submitted successfully',
      donation_id: result.donation_id
    });
  } catch (error) {
    console.error('Error submitting donation form:', error);
    return NextResponse.json(
      { error: 'Failed to submit donation form' },
      { status: 500 }
    );
  }
}
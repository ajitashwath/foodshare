import { NextRequest, NextResponse } from 'next/server';
import { partnershipService } from '@/lib/partnership-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = await partnershipService.registerPartner(body);

    return NextResponse.json({
      success: true,
      message: 'Partner registration submitted successfully',
      partner_id: result.partner_id,
      status: result.status
    });
  } catch (error) {
    console.error('Error registering partner:', error);
    return NextResponse.json(
      { error: 'Failed to register partner' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { partnershipService } from '@/lib/partnership-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const partnerId = searchParams.get('partner_id');
    
    const requests = await partnershipService.getFoodRequests(partnerId || undefined);
    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching food requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch food requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = await partnershipService.createFoodRequest(body);

    return NextResponse.json({
      success: true,
      message: 'Food request submitted successfully',
      request_id: result.request_id
    });
  } catch (error) {
    console.error('Error creating food request:', error);
    return NextResponse.json(
      { error: 'Failed to create food request' },
      { status: 500 }
    );
  }
}
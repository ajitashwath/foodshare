import { NextRequest, NextResponse } from 'next/server';
import { partnershipService } from '@/lib/partnership-service';

export async function GET() {
  try {
    const overview = await partnershipService.getPartnershipOverview();
    return NextResponse.json(overview);
  } catch (error) {
    console.error('Error fetching partnership overview:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partnership data' },
      { status: 500 }
    );
  }
}
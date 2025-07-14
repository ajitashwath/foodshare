import { NextRequest, NextResponse } from 'next/server';
import { partnershipService } from '@/lib/partnership-service';

export async function GET() {
  try {
    const matches = await partnershipService.matchDonations();
    return NextResponse.json(matches);
  } catch (error) {
    console.error('Error matching donations:', error);
    return NextResponse.json(
      { error: 'Failed to match donations' },
      { status: 500 }
    );
  }
}
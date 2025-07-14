import { NextRequest, NextResponse } from 'next/server';
import { partnershipService } from '@/lib/partnership-service';

export async function GET() {
  try {
    const partners = await partnershipService.getPartners();
    return NextResponse.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ipAddress = request.ip || request.headers.get('x-forwarded-for') || 'unknown';

    const response = await aiService.handleChat(body, ipAddress);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in AI chat:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
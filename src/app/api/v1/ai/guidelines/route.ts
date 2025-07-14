import { NextRequest, NextResponse } from 'next/server';
import { validateConfig } from '@/lib/config';

export async function GET() {
  try {
    if (!validateConfig()) {
      const defaultGuidelines = [
        {
          title: "Temperature Control",
          description: "Keep food at proper temperature during transport",
          icon: "🌡️"
        },
        {
          title: "Expiry Check", 
          description: "Ensure food is within expiry date",
          icon: "📅"
        },
        {
          title: "Proper Packaging",
          description: "Package food securely to prevent contamination", 
          icon: "📦"
        },
        {
          title: "Clean Handling",
          description: "Use clean utensils and containers",
          icon: "🧤"
        }
      ];
      
      return NextResponse.json({
        guidelines: defaultGuidelines,
        last_updated: new Date().toISOString(),
        mode: 'demo'
      });
    }

    try {
      const { aiService } = await import('@/lib/ai-service');
      const guidelines = aiService.getFoodSafetyGuidelines();
      
      return NextResponse.json({
        guidelines,
        last_updated: new Date().toISOString(),
        mode: 'live'
      });
    } catch (serviceError) {
      console.error('AI service error:', serviceError);
      const defaultGuidelines = [
        {
          title: "Temperature Control",
          description: "Keep food at proper temperature during transport",
          icon: "🌡️"
        },
        {
          title: "Expiry Check",
          description: "Ensure food is within expiry date", 
          icon: "📅"
        },
        {
          title: "Proper Packaging",
          description: "Package food securely to prevent contamination",
          icon: "📦"
        }
      ];
      
      return NextResponse.json({
        guidelines: defaultGuidelines,
        last_updated: new Date().toISOString(),
        mode: 'fallback'
      });
    }
    
  } catch (error) {
    console.error('Error fetching guidelines:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch guidelines',
        guidelines: [],
        mode: 'error'
      },
      { status: 500 }
    );
  }
}
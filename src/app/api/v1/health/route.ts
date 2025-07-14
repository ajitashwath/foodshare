import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/database';

export async function GET() {
  try {
    const healthStatus = await databaseService.healthCheck();
    
    return NextResponse.json({
      status: healthStatus.status,
      database: healthStatus.status === 'healthy' ? 'connected' : 'disconnected',
      timestamp: healthStatus.timestamp,
      version: '1.0.0'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({
      status: 'unhealthy',
      database: 'disconnected',
      error: 'Health check failed',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
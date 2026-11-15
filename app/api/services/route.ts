import { NextRequest, NextResponse } from 'next/server';
import { getServices, type BroadcastStatus } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get('status') || 'completed';
  const token = request.nextUrl.searchParams.get('pageToken') || '';
  if (!['live', 'upcoming', 'completed'].includes(status) || token.length > 512) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  try {
    return NextResponse.json(await getServices(status as BroadcastStatus, token));
  } catch {
    return NextResponse.json({ error: 'Services are unavailable right now. Please try again shortly.' }, { status: 503 });
  }
}

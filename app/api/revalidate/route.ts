import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ error: 'Revalidation is not configured.' }, { status: 503 });
  const supplied = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
  const expectedBuffer = Buffer.from(secret);
  const suppliedBuffer = Buffer.from(supplied);
  if (expectedBuffer.length !== suppliedBuffer.length || !timingSafeEqual(expectedBuffer, suppliedBuffer)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  // Stale-while-revalidate: visitors keep getting the cached page while the new one renders in the background.
  // { expire: 0 } (and revalidatePath) made the next visitor wait for a full cold render.
  revalidateTag('site-content', 'max');
  return NextResponse.json({ revalidated: true });
}

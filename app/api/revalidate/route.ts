import { timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ error: 'Revalidation is not configured.' }, { status: 503 });
  const supplied = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
  const expectedBuffer = Buffer.from(secret);
  const suppliedBuffer = Buffer.from(supplied);
  if (expectedBuffer.length !== suppliedBuffer.length || !timingSafeEqual(expectedBuffer, suppliedBuffer)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  revalidateTag('site-content', { expire: 0 });
  revalidatePath('/', 'layout');
  return NextResponse.json({ revalidated: true });
}

import { NextRequest, NextResponse } from 'next/server';
import { isContactDeliveryConfigured } from '@/lib/contact';

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  if (!request.headers.get('content-type')?.includes('application/json')) return NextResponse.json({ error: 'JSON is required.' }, { status: 415 });
  if (Number(request.headers.get('content-length') || 0) > 16000) return NextResponse.json({ error: 'Your message is too long.' }, { status: 413 });

  let input: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 16000) return NextResponse.json({ error: 'Your message is too long.' }, { status: 413 });
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid payload');
    input = parsed;
  } catch { return NextResponse.json({ error: 'Please check your enquiry and try again.' }, { status: 400 }); }

  const field = (key: string) => typeof input[key] === 'string' ? input[key].trim() : '';
  const name = field('name');
  const email = field('email');
  const phone = field('phone');
  const topic = field('topic');
  const message = field('message');
  const topics = ['General enquiry', 'Visiting the church', 'Prayer request', 'Missions', 'Other'];
  if (field('website') || name.length < 2 || name.length > 100 || /[\r\n]/.test(name) || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length > 40 || !topics.includes(topic) || message.length < 10 || message.length > 5000) {
    return NextResponse.json({ error: 'Please provide your name, a valid email, an enquiry topic, and a message of 10–5,000 characters.' }, { status: 400 });
  }
  if (!isContactDeliveryConfigured()) return NextResponse.json({ error: 'Online enquiries are currently unavailable. Please call +233 50 908 1558.' }, { status: 503 });

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL, to: [process.env.CONTACT_TO_EMAIL], reply_to: email, subject: `Website enquiry: ${topic}`, text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not supplied'}\nTopic: ${topic}\n\n${message}` }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error('Delivery provider rejected the request');
    const result = await response.json();
    if (!result.id) throw new Error('Delivery provider did not accept the message');
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Your enquiry could not be sent. Please try again or call +233 50 908 1558.' }, { status: 502 });
  }
}

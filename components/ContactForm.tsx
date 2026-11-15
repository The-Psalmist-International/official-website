'use client';

import CmsText from '@/components/cms/CmsText';
import CmsLink from '@/components/cms/CmsLink';
import { useRef, useState, type FormEvent } from 'react';

const fieldClass = 'mt-3 w-full rounded-none! border-0 border-b border-[#49345f]/20 bg-transparent px-0 py-3 text-sm text-[#24132e] outline-none transition-[border-color] placeholder:text-[#49345f]/40 focus:border-[#75538f] disabled:opacity-60';

export default function ContactForm({ enabled }: { enabled: boolean }) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const locked = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || locked.current) return;
    locked.current = true;
    setPending(true);
    setResult(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: AbortSignal.timeout(20000) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Your enquiry could not be sent. Please try again.');
      setResult({ success: true, message: 'Thank you. Your enquiry has been submitted.' });
      form.reset();
    } catch (error) {
      setResult({ success: false, message: error instanceof Error && error.name !== 'TimeoutError' ? error.message : 'We could not confirm that your enquiry was sent. Please call +233 50 908 1558.' });
    } finally { setPending(false); locked.current = false; }
  }

  return <form onSubmit={submit} className="w-full" aria-describedby={!enabled ? 'enquiries-unavailable' : undefined}>
    <fieldset disabled={pending} className="space-y-8">
      <label className="block text-sm font-medium"><CmsText id="components/ContactForm:dcd1d5223f73b3a9" fallback="Name" /><input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your full name" className={fieldClass} /></label>
      <label className="block text-sm font-medium"><CmsText id="components/ContactForm:969ccbd3cf6300ec" fallback="Email" /><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="your.email@example.com" className={fieldClass} /></label>
      <label className="block text-sm font-medium"><CmsText id="components/ContactForm:8549beac5d40fef9" fallback="Phone " /><span className="font-normal text-[#49345f]/45"><CmsText id="components/ContactForm:0059798b7f7023e4" fallback="(optional)" /></span><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Your phone number" className={fieldClass} /></label>
      <fieldset><legend className="mb-4 text-sm font-medium"><CmsText id="components/ContactForm:80d7546c2da066f8" fallback="What can we help with?" /></legend><div className="flex flex-wrap gap-3">{['General enquiry', 'Visiting the church', 'Prayer request', 'Missions', 'Other'].map(topic => <label key={topic} className="relative cursor-pointer"><input type="radio" name="topic" value={topic} required className="peer sr-only" /><span className="site-button flex min-h-11 items-center rounded-lg border border-[#49345f]/15 px-4 py-2 text-sm text-[#49345f] transition-[background-color,border-color,color] hover:border-[#75538f]/50 peer-checked:border-[#49345f] peer-checked:bg-[#49345f] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#75538f]">{topic}</span></label>)}</div></fieldset>
      <label className="block text-sm font-medium"><CmsText id="components/ContactForm:7a057bd996a32915" fallback="Your message" /><textarea name="message" required minLength={10} maxLength={5000} rows={4} placeholder="How can we help?" className={`${fieldClass} resize-y`} /></label>
      <div className="hidden" aria-hidden="true"><label><CmsText id="components/ContactForm:b5a229ac8becc603" fallback="Website" /><input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="text-xs leading-relaxed text-[#49345f]/60"><CmsText id="components/ContactForm:c33aec4ebf662cf1" fallback="We'll use the contact details you provide to respond to your enquiry." /></p>
      {!enabled && <p id="enquiries-unavailable" className="text-sm leading-relaxed text-[#49345f]/65"><CmsText id="components/ContactForm:d24c612bae1b070b" fallback="Online enquiries will be available soon. For now, please " /><CmsLink href="tel:+233509081558" className="underline underline-offset-4"><CmsText id="components/ContactForm:0f10db98e796e4c2" fallback="call +233 50 908 1558" /></CmsLink>.</p>}
      <button type="submit" disabled={!enabled || pending} className="site-button inline-flex min-h-12 items-center gap-8 bg-[#49345f] px-6 text-sm font-medium text-white transition-colors hover:bg-[#24132e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75538f] disabled:cursor-not-allowed disabled:opacity-45">{pending ? 'Sending...' : 'Send enquiry'}<span aria-hidden="true">&#8599;</span></button>
    </fieldset>
    {result && <p role={result.success ? 'status' : 'alert'} className={`mt-5 text-sm leading-relaxed ${result.success ? 'text-[#237e6e]' : 'text-red-700'}`}>{result.message}</p>}
  </form>;
}

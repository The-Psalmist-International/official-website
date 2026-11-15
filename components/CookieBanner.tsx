"use client";
import CmsText from '@/components/cms/CmsText';
import { useSyncExternalStore } from "react";
import Link from '@/components/cms/CmsLink';
const subscribe = (callback: () => void) => { window.addEventListener("cookie-choice", callback); return () => window.removeEventListener("cookie-choice", callback); };
function snapshot() { try { return localStorage.getItem("cookie-consent"); } catch { return null; } }
export default function CookieBanner() {
  const choice = useSyncExternalStore(subscribe, snapshot, () => "pending");
  function choose(value: string) { try { localStorage.setItem("cookie-consent", value); } catch {} window.dispatchEvent(new Event("cookie-choice")); }
  if (choice) return null;
  return <aside aria-label="Cookie preferences" className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-4xl border border-black/10 bg-white p-5 text-black shadow-xl sm:flex sm:items-center sm:gap-8"><div className="flex-1"><h2 className="font-semibold"><CmsText id="components/CookieBanner:3a21d95073a46589" fallback="Your privacy matters" /></h2><p className="mt-2 text-sm leading-relaxed text-black/65"><CmsText id="components/CookieBanner:2965139d6862a2c3" fallback="Choose whether to accept optional cookies. Read our " /><Link href="/privacy-policy" className="underline"><CmsText id="components/CookieBanner:506ff394621596dd" fallback="Privacy Policy" /></Link><CmsText id="components/CookieBanner:427a379ae3e6b749" fallback=" and " /><Link href="/terms-and-conditions" className="underline"><CmsText id="components/CookieBanner:34e6faf15abddcd4" fallback="Terms and Conditions" /></Link>.</p></div><div className="mt-4 flex shrink-0 gap-3 sm:mt-0"><button onClick={() => choose("necessary")} className="site-button min-h-11 border border-black/20 px-4 text-sm"><CmsText id="components/CookieBanner:24a18b506184877a" fallback="Necessary only" /></button><button onClick={() => choose("accepted")} className="site-button min-h-11 bg-[#49345f] px-4 text-sm text-white"><CmsText id="components/CookieBanner:70cf33bad78fa634" fallback="Accept cookies" /></button></div></aside>;
}

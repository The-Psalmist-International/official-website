import 'server-only';

export function isContactDeliveryConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
}

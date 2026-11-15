export const publicRoutes = ['/', '/about-us', '/services', '/missions', '/discipleship', '/resources', '/contact', '/testimony-wall', '/privacy-policy', '/terms-and-conditions'];

export function siteOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || 'https://themartyrschurch.com';
  try { return new URL(configured).origin; } catch { return 'https://themartyrschurch.com'; }
}

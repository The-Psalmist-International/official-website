import { ImageResponse } from 'next/og';

export const alt = 'The Martyrs Church — Kings, Priests, and Prophets';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%', padding: '80px', background: '#24132e', color: 'white' }}><div style={{ fontSize: 26, color: '#dfcbf1', marginBottom: 40 }}>Kings. Priests. Prophets.</div><div style={{ fontSize: 90, letterSpacing: '-4px', lineHeight: 1.05 }}>The Martyrs Church</div><div style={{ fontSize: 28, color: '#dfcbf1', marginTop: 40 }}>themartyrschurch.com</div></div>, size);
}

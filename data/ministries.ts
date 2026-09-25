export type Ministry = {
  id: string;
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  image: string;
  background: string;
  foreground: string;
  accent: string;
};

export const ministries: Ministry[] = [
  {
    id: 'house-of-prayer',
    name: 'House of Prayer',
    eyebrow: 'Prayer & intercession',
    summary: 'A people devoted to the altar.',
    description:
      'House of Prayer gathers believers to contend in prayer, cultivate intimacy with God, and stand in the gap for the church, communities, and nations.',
    image: '/assets/IMG_6744.JPG',
    background: '#12233f',
    foreground: '#ffffff',
    accent: '#d8b56a',
  },
  {
    id: 'watchmen',
    name: 'The Watchmen',
    eyebrow: 'Discernment & intercession',
    summary: 'Awake, discerning, and steadfast.',
    description:
      'The Watchmen are committed to spiritual vigilance—discerning the times, guarding the work of God, and faithfully interceding for His purposes.',
    image: '/assets/IMG_7283.JPG',
    background: '#6b1f36',
    foreground: '#fff8f8',
    accent: '#e6a1af',
  },
  {
    id: 'zemirot',
    name: 'Zemirot',
    eyebrow: 'Music & worship',
    summary: 'Giving sound to the worship of heaven.',
    description:
      'Zemirot serves the church through music and worship, leading people into reverence, joy, and a deeper awareness of the presence of God.',
    image: '/assets/IMG_7255.JPG',
    background: '#f5f3ef',
    foreground: '#111111',
    accent: '#111111',
  },
  {
    id: 'oracles',
    name: 'The Oracles',
    eyebrow: 'Word & teaching',
    summary: 'Rooted in truth. Formed by the Word.',
    description:
      'The Oracles strengthen believers through sound doctrine, biblical teaching, and the faithful communication of the whole counsel of God.',
    image: '/assets/IMG_7172.JPG',
    background: '#b56a22',
    foreground: '#fffaf0',
    accent: '#f2d39b',
  },
  {
    id: 'mystic-theatre',
    name: 'Mystic Theatre',
    eyebrow: 'Drama & creative arts',
    summary: 'Revealing eternal truth through story.',
    description:
      'Mystic Theatre uses drama, movement, and visual storytelling to communicate the gospel and make spiritual realities tangible to every generation.',
    image: '/assets/IMG_7237.JPG',
    background: '#24204f',
    foreground: '#ffffff',
    accent: '#a9a0ff',
  },
  {
    id: 'priestesses',
    name: 'Priestesses of the Altar',
    eyebrow: 'Women & consecration',
    summary: 'Women formed in devotion and purpose.',
    description:
      'Priestesses of the Altar equips women to live consecrated lives, grow in spiritual authority, and serve God faithfully in the church and every sphere of society.',
    image: '/assets/IMG_7295.JPG',
    background: '#7028a8',
    foreground: '#ffffff',
    accent: '#e5b9ff',
  },
  {
    id: 'french',
    name: 'French Community',
    eyebrow: 'Francophone community',
    summary: 'One family, worshipping across languages.',
    description:
      'The French Community creates a spiritual home for French-speaking believers through worship, fellowship, discipleship, and pastoral care.',
    image: '/assets/IMG_7139.JPG',
    background: '#175f83',
    foreground: '#ffffff',
    accent: '#9dddf5',
  },
];

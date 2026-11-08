export type Testimony = {
  title: string;
  program: string;
  youtubeId: string | null;
  sample?: boolean;
};

export const testimonies: Testimony[] = [
  { title: "18 Years of Fibroid Turned Baby", program: "Nouthesia S09", youtubeId: null },
  { title: "Fatty Liver of 5 Years Returned to Normal", program: "Nouthesia S09", youtubeId: null },
];

// Temporary design content; these are not published accounts from the church.
export const wallTestimonies: Testimony[] = [
  ...testimonies,
  ...[
    "A New Beginning for Our Family",
    "Peace in the Midst of the Storm",
    "An Unexpected Open Door",
    "Hope Restored After Years of Waiting",
    "A Family Reunited",
    "Strength for a New Season",
    "From Fear to Faith",
    "Provision at the Right Time",
    "Joy After a Season of Grief",
    "A Journey of Restoration",
    "Finding Purpose Again",
    "Grace for Every Step",
  ].map(title => ({ title, program: "Sample testimony", youtubeId: null, sample: true })),
];

export type AccentToken =
  | "lime"
  | "cyan"
  | "violet"
  | "amber"
  | "mint"
  | "coral";

export const ACCENT_COLOR_MAP: Record<AccentToken, string> = {
  lime: "#70b310",
  cyan: "#06b6d4",
  violet: "#8b5cf6",
  amber: "#f59e0b",
  mint: "#10b981",
  coral: "#f43f5e",
};

export interface Project {
  id: string;
  name: string;
  logo: string;
  accent: AccentToken;
}

export interface DomainItem {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  accent: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  image: string;
  accent: string;
}

export interface ContactPerson {
  name: string;
  phone: string;
}

export interface RailItem {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  image: string;
  accent: string;
  sdg?: string;
  sdgLabel?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "bandhutva",
    name: "Bandhutva",
    logo: "/logos/bandhutva.webp",
    accent: "lime"
  },
  {
    id: "dhara",
    name: "Dhara",
    logo: "/logos/dhara.webp",
    accent: "cyan"
  },
  {
    id: "nidaan",
    name: "Nidaan",
    logo: "/logos/nidaan.webp",
    accent: "violet"
  },
  {
    id: "riddhi",
    name: "Riddhi",
    logo: "/logos/riddhi.webp",
    accent: "amber"
  },
  {
    id: "sanyukt",
    name: "Sanyukt",
    logo: "/logos/sanyukt.webp",
    accent: "mint"
  },
  {
    id: "sparsh",
    name: "Sparsh",
    logo: "/logos/sparsh.webp",
    accent: "lime"
  },
  {
    id: "swet",
    name: "Swet",
    logo: "/logos/swet.webp",
    accent: "coral"
  },
  {
    id: "udaan",
    name: "Udaan",
    logo: "/logos/udaan.webp",
    accent: "cyan"
  },
  {
    id: "urja",
    name: "Urja",
    logo: "/logos/urja.webp",
    accent: "violet"
  },
];

export const projectRailItems: RailItem[] = PROJECTS.map((project) => ({
  id: project.id,
  title: project.name,
  image: project.logo,
  accent: ACCENT_COLOR_MAP[project.accent],
}));

export const DOMAINS: DomainItem[] = [
  {
    id: "video-editing",
    title: "Video Editing",
    eyebrow: "Story in motion",
    description:
      "Shape raw footage into compelling stories through precise cuts, transitions, effects, and a strong visual eye.",
    image: "/domains/video-editing.png",
    accent: "#f2633e"
  },
  {
    id: "graphic-designing",
    title: "Graphic Designing",
    eyebrow: "Ideas, made visible",
    description:
      "Bring ideas to life through visual storytelling, design principles, and compelling work for digital media.",
    image: "/domains/graphic-design.png",
    accent: "#e0b833"
  },
  {
    id: "photography",
    title: "Photography",
    eyebrow: "Moments, held close",
    description:
      "Capture events, emotions, and perspectives with technical skill, creativity, and visual impact.",
    image: "/domains/photography.png",
    accent: "#4a8b78"
  },
  {
    id: "content-writing",
    title: "Content Writing",
    eyebrow: "Words with purpose",
    description:
      "Craft engaging, impactful writing that combines creativity, clarity, and strategy for diverse audiences.",
    image: "/domains/content-writing.png",
    accent: "#4277b9"
  },
  {
    id: "general-volunteering",
    title: "General Volunteering",
    eyebrow: "Service in action",
    description:
      "Build social responsibility and leadership through hands-on service, guided by the motto Not Me But You.",
    image: "/domains/general-volunteering.png",
    accent: "#8c5bb0"
  },
];

export const EVENT_DIARY: EventItem[] = [
  {
    id: "ann",
    title: "Ann Daan",
    description:
      "Volunteers organized an Ann Daan drive by preparing and serving nutritious meals to community dogs on campus, promoting compassion, responsible animal care, and kindness toward stray animals.",
    image: "/events/ann.webp",
    accent: "#C97B47"
  },
  {
    id: "orphanage",
    title: "Orphanage Visit",
    description:
      "NSS volunteers spent quality time with children through engaging games, creative activities, storytelling, and interactive learning sessions, creating joyful memories while encouraging confidence and personal growth.",
    image: "/events/orphanage.webp",
    accent: "#D76A64"
  },
  {
    id: "plantation",
    title: "Plantation Drive",
    description:
      "Volunteers planted saplings across the campus to promote environmental sustainability, raise awareness about afforestation, and encourage long-term responsibility toward protecting green spaces.",
    image: "/events/plant.webp",
    accent: "#4F7D44"
  },
  {
    id: "cleanliness-drive",
    title: "Cleanliness Drive",
    description:
      "Students participated in a campus cleanliness initiative by collecting litter, segregating waste, and spreading awareness about maintaining a cleaner, healthier, and more sustainable environment.",
    image: "/events/clean.webp",
    accent: "#4F6F55"
  },
  {
    id: "audi",
    title: "NSS Orientation",
    description:
      "The NSS orientation introduced students to the organization's mission, activities, and opportunities, encouraging them to participate in meaningful community service and social responsibility initiatives.",
    image: "/events/audi.webp",
    accent: "#2E5D8A"
  },
  {
    id: "special-school",
    title: "Special School Visit",
    description:
      "Volunteers engaged children through fun learning activities, games, and creative interactions, fostering inclusion, confidence, and joyful experiences while strengthening community bonds.",
    image: "/events/special.webp",
    accent: "#D67B59"
  },
  {
    id: "school-visit",
    title: "School Awareness Program",
    description:
      "NSS volunteers conducted interactive awareness sessions on road safety, responsible behavior, and civic values, encouraging students to develop safe habits and become responsible citizens.",
    image: "/events/school.webp",
    accent: "#4A567A"
  },
  {
    id: "blood-donation",
    title: "Blood Donation Drive",
    description:
      "A large-scale voluntary blood donation camp was organized in collaboration with healthcare professionals, encouraging students to donate blood and contribute toward saving lives.",
    image: "/events/blood.webp",
    accent: "#B23A3A"
  },
  {
    id: "dental-camp",
    title: "Dental Camp",
    description:
      "NSS volunteers coordinated a free dental health camp offering oral check-ups, hygiene awareness, and preventive care guidance while assisting healthcare professionals throughout the event.",
    image: "/events/dental.webp",
    accent: "#7A6C4B"
  },
  {
    id: "nukkad-natak",
    title: "Nukkad Natak",
    description:
      "A powerful street play highlighted the harmful effects of ragging and promoted respect, empathy, and a safe, inclusive campus environment through impactful performances and public engagement.",
    image: "/events/nukkad.webp",
    accent: "#A82D35"
  },
  {
    id: "oldage-home-visit",
    title: "Old Age Home Visit",
    description:
      "Volunteers spent meaningful time with senior citizens through conversations, cultural activities, music, and interactive sessions, bringing companionship, joy, and emotional support.",
    image: "/events/oldage.webp",
    accent: "#C98C42"
  },
  {
    id: "vastra-daan",
    title: "Vastra Daan",
    description:
      "Clothing collected through donation drives was distributed to underprivileged families, ensuring usable garments reached those in need while encouraging generosity and community support.",
    image: "/events/vastra.webp",
    accent: "#5E6F8F"
  }
];

export const CONTACT_DIRECTORY: ContactPerson[] = [
  { name: "Soham Lodh", phone: "+91 83348 22932" },
  { name: "Aditya Sharma", phone: "+91 97170 08778" },
  { name: "Anshu Kumar", phone: "+91 85820 72009" },
  { name: "Anuj Sharma", phone: "+91 93123 70886" },
  { name: "Pinak Dhar", phone: "+91 62918 16126" },
  { name: "Ayush Kumar", phone: "+91 91421 69264" }
];

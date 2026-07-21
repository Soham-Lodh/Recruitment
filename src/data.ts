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
  sdg: string;
  sdgLabel: string;
  desc: string;
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
  date: string;
  location: string;
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
  eyebrow: string;
  description: string;
  image: string;
  accent: string;
  sdg?: string;
  sdgLabel?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "bandhutva",
    name: "Bandhutva",
    sdg: "4, 17",
    sdgLabel: "Quality Education & Partnerships",
    desc: "Enhancing educational equity and building strong institutional partnerships to create a unified, inclusive campus environment that mirrors global solidarity goals.",
    logo: "/logos/bandhutva.png",
    accent: "lime",
  },
  {
    id: "dhara",
    name: "Dhara",
    sdg: "13, 14, 15",
    sdgLabel: "Climate Action & Life Below Water/Land",
    desc: "Leading urgent climate action and protecting life below water and on land through massive reforestation, water body preservation, and sustainable planetary care.",
    logo: "/logos/dhara.png",
    accent: "cyan",
  },
  {
    id: "nidaan",
    name: "Nidaan",
    sdg: "3, 12",
    sdgLabel: "Health & Responsible Consumption",
    desc: "Promoting community well-being through health awareness while advocating for responsible consumption and sustainable production cycles to reduce medical waste.",
    logo: "/logos/nidaan.png",
    accent: "violet",
  },
  {
    id: "riddhi",
    name: "Riddhi",
    sdg: "8, 9",
    sdgLabel: "Decent Work and Infrastructure",
    desc: "Driving equitable economic growth and infrastructure innovation by empowering local artisans and communities with modern skills and creative technological solutions.",
    logo: "/logos/riddhi.png",
    accent: "amber",
  },
  {
    id: "sanyukt",
    name: "Sanyukt",
    sdg: "16",
    sdgLabel: "Peace, Justice & Strong Institutions",
    desc: "Resolving conflicts, advocating for justice, and building transparent leadership frameworks within the student and local communities for total accountability.",
    logo: "/logos/sanyukt.png",
    accent: "mint",
  },
  {
    id: "sparsh",
    name: "Sparsh",
    sdg: "1, 2",
    sdgLabel: "No Poverty & Zero Hunger",
    desc: "Working at the grassroots to eliminate poverty and zero-hunger through systematic donation drives, community kitchens, and direct support for vulnerable populations.",
    logo: "/logos/sparsh.png",
    accent: "lime",
  },
  {
    id: "swet",
    name: "Swet",
    sdg: "11",
    sdgLabel: "Sustainable Cities & Communities",
    desc: "Transforming urban spaces and campus living into sustainable, eco-friendly hubs through smart logistics and community-driven urban planning.",
    logo: "/logos/swet.png",
    accent: "coral",
  },
  {
    id: "udaan",
    name: "Udaan",
    sdg: "5, 10",
    sdgLabel: "Gender Equality & Reduced Inequalities",
    desc: "Breaking glass ceilings through gender equality advocacy and reducing social inequalities by empowering marginalized voices through education and legal awareness.",
    logo: "/logos/udaan.png",
    accent: "cyan",
  },
  {
    id: "urja",
    name: "Urja",
    sdg: "6, 7",
    sdgLabel: "Clean Water & Energy",
    desc: "Harnessing the power of clean energy and ensuring universal access to clean water and sanitation, driving traditional communities towards a sustainable energy future.",
    logo: "/logos/urja.png",
    accent: "violet",
  },
];

export const projectRailItems: RailItem[] = PROJECTS.map((project) => ({
  id: project.id,
  title: project.name,
  eyebrow: `SDG ${project.sdg}`,
  description: project.desc,
  image: project.logo,
  accent: ACCENT_COLOR_MAP[project.accent],
  sdg: project.sdg,
  sdgLabel: project.sdgLabel,
}));

export const DOMAINS: DomainItem[] = [
  {
    id: "video-editing",
    title: "Video Editing",
    eyebrow: "Story in motion",
    description:
      "Shape raw footage into compelling stories through precise cuts, transitions, effects, and a strong visual eye.",
    image: "/videoeditor.jpg",
    accent: "#f2633e",
  },
  {
    id: "graphic-designing",
    title: "Graphic Designing",
    eyebrow: "Ideas, made visible",
    description:
      "Bring ideas to life through visual storytelling, design principles, and compelling work for digital media.",
    image: "/gd2.jpg",
    accent: "#e0b833",
  },
  {
    id: "photography",
    title: "Photography",
    eyebrow: "Moments, held close",
    description:
      "Capture events, emotions, and perspectives with technical skill, creativity, and visual impact.",
    image: "/camera.jpg",
    accent: "#4a8b78",
  },
  {
    id: "content-writing",
    title: "Content Writing",
    eyebrow: "Words with purpose",
    description:
      "Craft engaging, impactful writing that combines creativity, clarity, and strategy for diverse audiences.",
    image: "/contentwriter.jpg",
    accent: "#4277b9",
  },
  {
    id: "general-volunteering",
    title: "General Volunteering",
    eyebrow: "Service in action",
    description:
      "Build social responsibility and leadership through hands-on service, guided by the motto Not Me But You.",
    image: "/gv.jpg",
    accent: "#8c5bb0",
  },
];

export const EVENT_DIARY: EventItem[] = [
  {
    id: "health-camp",
    title: "Health Camp",
    date: "March 2025",
    location: "Damana High School",
    description:
      "NSS SCE organized an ENT health camp with free check-ups, consultations, and guidance to encourage healthy practices and early detection.",
    image: "/health camp.jpg",
    accent: "#e46e51",
  },
  {
    id: "orphanage-visit",
    title: "Orphanage Visit",
    date: "March 2025",
    location: "Madhurmaye Orphanage",
    description:
      "Volunteers shared meaningful moments with children through interactive sessions on good habits, hygiene practices, and moral values.",
    image: "/orphange.jpg",
    accent: "#6c79bc",
  },
  {
    id: "plantation-drive",
    title: "Plantation Drive",
    date: "July 2025",
    location: "Prasanti Vihar",
    description:
      "Saplings were planted in public spaces and educational institutions to encourage greener practices and environmental responsibility.",
    image: "/plantation.jpeg",
    accent: "#47886d",
  },
  {
    id: "cleanliness-drive",
    title: "Cleanliness Drive",
    date: "September 2024",
    location: "KIIT Road",
    description:
      "Volunteers cleaned public areas, spoke about waste management, and encouraged the community to maintain a clean, healthy environment.",
    image: "/cleandrive.jpg",
    accent: "#d59345",
  },
  {
    id: "road-safety",
    title: "Road Safety Rally",
    date: "January 2025",
    location: "KIIT Road",
    description:
      "A public rally used posters, slogans, and conversations to reinforce responsible driving, helmets, seatbelts, and traffic safety.",
    image: "/roadsafety.JPG",
    accent: "#c85f50",
  },
  {
    id: "animal-feeding",
    title: "Animal Feeding",
    date: "November 2024",
    location: "KIIT Road",
    description:
      "The unit provided food and clean water to stray animals, promoting empathy, care, and humane treatment for voiceless beings.",
    image: "/animalfeeding.jpg",
    accent: "#8f6a4a",
  },
  {
    id: "special-camp",
    title: "Special Camp",
    date: "March 2024",
    location: "Village",
    description:
      "A community-focused camp brought together cleanliness drives, awareness rallies, health check-ups, and educational sessions.",
    image: "/specialcamp.jpg",
    accent: "#9164ab",
  },
  {
    id: "daan",
    title: "DAAN",
    date: "November 2024",
    location: "Slum",
    description:
      "Essentials including clothes, food items, and stationery were collected and distributed to support underprivileged communities.",
    image: "/daan.jpg",
    accent: "#bf7852",
  },
  {
    id: "slum-visit",
    title: "Slum Visit",
    date: "March 2025",
    location: "Local Slum",
    description:
      "Volunteers held awareness sessions around hygiene, education, and health while listening to residents and distributing essentials.",
    image: "/slumvisit.jpg",
    accent: "#497b92",
  },
  {
    id: "school-visit",
    title: "School Visit",
    date: "December 2025",
    location: "Damana High School",
    description:
      "Interactive learning sessions covered hygiene, discipline, and moral values to inspire young minds and support holistic development.",
    image: "/schoolvisit.jpg",
    accent: "#d1a24e",
  },
];

export const CONTACT_DIRECTORY: ContactPerson[] = [
  { name: "Soham Lodh", phone: "+91 83348 22932" },
  { name: "Aditya Sharma", phone: "+91 97170 08778" },
  { name: "Anshu Kumar", phone: "+91 85820 72009" },
  { name: "Anuj Sharma", phone: "+91 93123 70886" },
  { name: "Pinak Dhar", phone: "+91 62918 16126" },
  { name: "Ayush Kumar", phone: "+91 91421 69264" },
];

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Type Definitions ───────────────────────────────────────────────

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  usAddress: string;
  usPhone: string;
  taxId: string;
  facebookUrl: string;
  youtubeUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  radioStreamUrl: string;
  newsUrl: string;
  developerName: string;
  developerUrl: string;
}

export interface HeroData {
  badgeText: string;
  heading: string;
  headingHighlight: string;
  headingLine2: string;
  subheading: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  sliderImages: { src: string; alt: string }[];
}

export interface StatItem {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

export interface AboutPreviewData {
  badgeText: string;
  heading: string;
  headingHighlight: string;
  paragraph1: string;
  paragraph2: string;
  buttonText: string;
  statCard: { value: string; label: string };
  images: { src: string; alt: string }[];
}

export interface CauseItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'executive' | 'associate' | 'reporter';
  image: string;
  bio: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  attendees: number;
}

export interface PostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  status: 'published' | 'draft';
  author: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  details: string;
}

export interface DonationItem {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  campaign: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}

export interface PageContent {
  title: string;
  subtitle: string;
  content: string;
  image: string;
}

export interface CMSData {
  siteSettings: SiteSettings;
  hero: HeroData;
  stats: StatItem[];
  aboutPreview: AboutPreviewData;
  causes: CauseItem[];
  testimonials: TestimonialItem[];
  gallery: GalleryItem[];
  team: TeamMember[];
  events: EventItem[];
  posts: PostItem[];
  programs: ProgramItem[];
  donations: DonationItem[];
  pages: Record<string, PageContent>;
}

// ── Default Data ───────────────────────────────────────────────────

const defaultSiteSettings: SiteSettings = {
  siteName: 'Duamenefa Foundation',
  tagline: 'Let Us Co-Exist in Peace',
  description:
    'Duamenefa Foundation is a Ghana-based Non-Governmental Organization (NGO) dedicated to promoting peace, reconciliation, child rights advocacy, and community transformation.',
  phone: '+233 242 313 766',
  email: 'duamenefafoundation@yahoo.com',
  whatsapp: '+233 247 124 917',
  address: 'FAFAA 100.3 FM Premises, PO BOX DZ125, Dzodze, Volta Region',
  usAddress: 'PO BOX 2717, Albertville, Alabama, USA',
  usPhone: '+1 203 305 1152',
  taxId: '83-1336344',
  facebookUrl: 'https://www.facebook.com/Fafaa100.3fm',
  youtubeUrl: '#',
  twitterUrl: '#',
  instagramUrl: '#',
  radioStreamUrl: 'https://fafaafm.radiostream321.com/',
  newsUrl: 'https://fafaafmonline.com/category/duamenefa-news/',
  developerName: 'Clipe233 Engineers',
  developerUrl: 'https://clipe233eng.net/',
};

const defaultHero: HeroData = {
  badgeText: '★ Promoting Peace & Human Dignity Since Inception',
  heading: 'LET US',
  headingHighlight: 'CO-EXIST',
  headingLine2: 'IN PEACE',
  subheading:
    'Promoting Peace, Justice, Reconciliation, and Human Dignity Across Communities. Together, we can transform lives and build a harmonious society.',
  primaryButtonText: 'Learn About Us',
  secondaryButtonText: 'Our Operations',
  sliderImages: [
    { src: '/slider-donations-single-parents.jpg', alt: 'Donations of equipment to single parents' },
    { src: '/slider-donation-keta-hospital.jpg', alt: 'Donation to Keta Hospital' },
    { src: '/slider-donations-childrens-village.jpg', alt: 'Donations to Children\'s Village' },
    { src: '/slider-donations-male-ward-keta.jpg', alt: 'Donations for male ward at Keta Hospital' },
    { src: '/slider-regional-tournament.jpg', alt: 'Duamenefa Regional Tournament' },
    { src: '/slider-award-costheta.jpg', alt: 'Award at Costheta Educational Support Fund' },
  ],
};

const defaultStats: StatItem[] = [
  { icon: 'users', value: 47758, suffix: '+', label: 'Community Members' },
  { icon: 'handshake', value: 610, suffix: '+', label: 'Conflicts Resolved' },
  { icon: 'radio', value: 4, suffix: '+', label: 'Radio & TV Stations' },
  { icon: 'tv', value: 1000, suffix: '+', label: 'Broadcasts Delivered' },
];

const defaultAboutPreview: AboutPreviewData = {
  badgeText: 'Who We Are',
  heading: 'Building Peace,',
  headingHighlight: 'Transforming Lives',
  paragraph1:
    'Duamenefa Foundation is a Ghana-based Non-Governmental Organization (NGO) with a membership of over 47,758 as of July 2025, committed to promoting peace and reconciliation. The name "Duamenefa" means "Let Us Co-Exist in Peace" in the Ewe language — a powerful reminder of our core mission.',
  paragraph2:
    'Through radio intervention programs on Fafaa 100.3 FM, Justice FM 98.5, Swiss FM 93.7, and Messiah TV, community mediation, advocacy campaigns, and vocational training, we have resolved over 610 spiritual and diabolical conflicts and transformed thousands of lives across 550 communities.',
  buttonText: 'Learn More About Us',
  statCard: { value: '610+', label: 'Conflicts Resolved' },
  images: [
    { src: '/duamenafa-4.jpg', alt: 'Community peace gathering' },
    { src: '/duamenafa-10.jpg', alt: 'Outreach program activities' },
    { src: '/duamenafa-27.jpg', alt: 'Peacebuilding workshop' },
    { src: '/duamenafa-176.jpg', alt: 'Community transformation project' },
    { src: '/duamenafa-196.jpg', alt: 'Advocacy campaign rally' },
    { src: '/duamenafa-198.jpg', alt: 'Volunteers in action' },
    { src: '/marathon-13.jpg', alt: 'Peace marathon event' },
  ],
};

const defaultCauses: CauseItem[] = [
  {
    id: 'cause-1',
    icon: 'heart',
    title: 'Peace & Reconciliation',
    description:
      'Mediating conflicts and fostering dialogue between divided communities through traditional and modern conflict resolution approaches.',
    image: '/reconciliation.jpg',
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 'cause-2',
    icon: 'shield',
    title: 'Child Rights Advocacy',
    description:
      'Protecting children from spiritual manipulation, abuse, and exploitation. Ensuring every child has the right to safety and education.',
    image: '/children-education.jpg',
    color: 'bg-[#6B4F3A]',
  },
  {
    id: 'cause-3',
    icon: 'unlock',
    title: 'Trokosi Liberation',
    description:
      'Advocating against shrine servitude and rehabilitating victims. Restoring dignity and freedom to those held in bondage.',
    image: '/women-empowerment.jpg',
    color: 'bg-[#4C9A2A]',
  },
  {
    id: 'cause-4',
    icon: 'graduation',
    title: 'Education Support',
    description:
      'Providing scholarships, school supplies, and literacy programs to underserved communities. Building futures through learning.',
    image: '/vocational-training.jpg',
    color: 'bg-[#D4AF37]',
  },
];

const defaultTestimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    quote:
      "The Foundation\u2019s work is commendable and encouraged its leadership to continue promoting peace and supporting communities through their social intervention mechanisms.",
    name: 'Torgbi Avorkliya V',
    role: 'Chief of Dzodze Kuli, Ketu North, Volta Region',
    initials: 'TA',
    avatar: '/torgbi-avorkliya.jpg',
  },
  {
    id: 'test-2',
    quote:
      'Through their vocational training program, I gained skills that transformed my life. I can now support my family and contribute to my community.',
    name: 'Ama Deku',
    role: 'Program Beneficiary',
    initials: 'AD',
    avatar: '',
  },
  {
    id: 'test-3',
    quote:
      'The radio programs gave me hope during my darkest moments. I learned that peace is possible, and I am now a peace ambassador in my community.',
    name: 'Emmanuel Agbeko',
    role: 'Peace Ambassador',
    initials: 'EA',
    avatar: '',
  },
];

const defaultGallery: GalleryItem[] = [
  { id: 'gal-1', src: '/duamenafa-4.jpg', caption: 'Community leaders united for peace' },
  { id: 'gal-2', src: '/duamenafa-10.jpg', caption: 'Duamenefa outreach in rural communities' },
  { id: 'gal-3', src: '/duamenafa-27.jpg', caption: 'Peace and reconciliation dialogue' },
  { id: 'gal-4', src: '/duamenafa-176.jpg', caption: 'Transforming lives through advocacy' },
  { id: 'gal-5', src: '/duamenafa-196.jpg', caption: 'Campaign for human rights and dignity' },
  { id: 'gal-6', src: '/duamenafa-198.jpg', caption: 'Our dedicated volunteers at work' },
  { id: 'gal-7', src: '/marathon-13.jpg', caption: 'Annual peace marathon for unity' },
];

// ── Store Interface ────────────────────────────────────────────────

interface CMSStore extends CMSData {
  // Site settings
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  // Hero
  updateHero: (data: Partial<HeroData>) => void;
  // Stats
  updateStats: (stats: StatItem[]) => void;
  addStat: (stat: StatItem) => void;
  removeStat: (id: string) => void;
  // About preview
  updateAboutPreview: (data: Partial<AboutPreviewData>) => void;
  // Causes
  addCause: (cause: Omit<CauseItem, 'id'>) => void;
  updateCause: (id: string, data: Partial<CauseItem>) => void;
  removeCause: (id: string) => void;
  // Testimonials
  addTestimonial: (data: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, data: Partial<TestimonialItem>) => void;
  removeTestimonial: (id: string) => void;
  // Gallery
  addGalleryImage: (data: Omit<GalleryItem, 'id'>) => void;
  updateGalleryImage: (id: string, data: Partial<GalleryItem>) => void;
  removeGalleryImage: (id: string) => void;
  // Team
  addTeamMember: (data: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, data: Partial<TeamMember>) => void;
  removeTeamMember: (id: string) => void;
  // Events
  addEvent: (data: Omit<EventItem, 'id'>) => void;
  updateEvent: (id: string, data: Partial<EventItem>) => void;
  removeEvent: (id: string) => void;
  // Posts
  addPost: (data: Omit<PostItem, 'id'>) => void;
  updatePost: (id: string, data: Partial<PostItem>) => void;
  removePost: (id: string) => void;
  // Programs
  addProgram: (data: Omit<ProgramItem, 'id'>) => void;
  updateProgram: (id: string, data: Partial<ProgramItem>) => void;
  removeProgram: (id: string) => void;
  // Donations
  addDonation: (data: Omit<DonationItem, 'id'>) => void;
  updateDonation: (id: string, data: Partial<DonationItem>) => void;
  removeDonation: (id: string) => void;
  // Pages
  updatePage: (key: string, data: Partial<PageContent>) => void;
  // Reset
  resetToDefaults: () => void;
}

const genId = () => `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// ── Default State ──────────────────────────────────────────────────

const defaultState: CMSData = {
  siteSettings: defaultSiteSettings,
  hero: defaultHero,
  stats: defaultStats,
  aboutPreview: defaultAboutPreview,
  causes: defaultCauses,
  testimonials: defaultTestimonials,
  gallery: defaultGallery,
  team: [],
  events: [],
  posts: [],
  programs: [],
  donations: [],
  pages: {},
};

// ── Store ──────────────────────────────────────────────────────────

export const useCMS = create<CMSStore>()(
  persist(
    (set) => ({
      ...defaultState,

      // Site settings
      updateSiteSettings: (settings) =>
        set((s) => ({ siteSettings: { ...s.siteSettings, ...settings } })),

      // Hero
      updateHero: (data) => set((s) => ({ hero: { ...s.hero, ...data } })),

      // Stats
      updateStats: (stats) => set({ stats }),
      addStat: (stat) => set((s) => ({ stats: [...s.stats, { ...stat, id: stat.id || genId() }] })),
      removeStat: (id) => set((s) => ({ stats: s.stats.filter((st) => st.label !== id && st.id !== id) })),

      // About preview
      updateAboutPreview: (data) =>
        set((s) => ({ aboutPreview: { ...s.aboutPreview, ...data } })),

      // Causes
      addCause: (cause) => set((s) => ({ causes: [...s.causes, { ...cause, id: genId() }] })),
      updateCause: (id, data) =>
        set((s) => ({
          causes: s.causes.map((c) => (c.id === id ? { ...c, ...data } : c)),
        })),
      removeCause: (id) => set((s) => ({ causes: s.causes.filter((c) => c.id !== id) })),

      // Testimonials
      addTestimonial: (data) =>
        set((s) => ({ testimonials: [...s.testimonials, { ...data, id: genId() }] })),
      updateTestimonial: (id, data) =>
        set((s) => ({
          testimonials: s.testimonials.map((t) => (t.id === id ? { ...t, ...data } : t)),
        })),
      removeTestimonial: (id) =>
        set((s) => ({ testimonials: s.testimonials.filter((t) => t.id !== id) })),

      // Gallery
      addGalleryImage: (data) =>
        set((s) => ({ gallery: [...s.gallery, { ...data, id: genId() }] })),
      updateGalleryImage: (id, data) =>
        set((s) => ({
          gallery: s.gallery.map((g) => (g.id === id ? { ...g, ...data } : g)),
        })),
      removeGalleryImage: (id) =>
        set((s) => ({ gallery: s.gallery.filter((g) => g.id !== id) })),

      // Team
      addTeamMember: (data) =>
        set((s) => ({ team: [...s.team, { ...data, id: genId() }] })),
      updateTeamMember: (id, data) =>
        set((s) => ({ team: s.team.map((t) => (t.id === id ? { ...t, ...data } : t)) })),
      removeTeamMember: (id) =>
        set((s) => ({ team: s.team.filter((t) => t.id !== id) })),

      // Events
      addEvent: (data) =>
        set((s) => ({ events: [...s.events, { ...data, id: genId() }] })),
      updateEvent: (id, data) =>
        set((s) => ({ events: s.events.map((e) => (e.id === id ? { ...e, ...data } : e)) })),
      removeEvent: (id) =>
        set((s) => ({ events: s.events.filter((e) => e.id !== id) })),

      // Posts
      addPost: (data) =>
        set((s) => ({ posts: [...s.posts, { ...data, id: genId() }] })),
      updatePost: (id, data) =>
        set((s) => ({ posts: s.posts.map((p) => (p.id === id ? { ...p, ...data } : p)) })),
      removePost: (id) =>
        set((s) => ({ posts: s.posts.filter((p) => p.id !== id) })),

      // Programs
      addProgram: (data) =>
        set((s) => ({ programs: [...s.programs, { ...data, id: genId() }] })),
      updateProgram: (id, data) =>
        set((s) => ({
          programs: s.programs.map((p) => (p.id === id ? { ...p, ...data } : p)),
        })),
      removeProgram: (id) =>
        set((s) => ({ programs: s.programs.filter((p) => p.id !== id) })),

      // Donations
      addDonation: (data) =>
        set((s) => ({ donations: [...s.donations, { ...data, id: genId() }] })),
      updateDonation: (id, data) =>
        set((s) => ({
          donations: s.donations.map((d) => (d.id === id ? { ...d, ...data } : d)),
        })),
      removeDonation: (id) =>
        set((s) => ({ donations: s.donations.filter((d) => d.id !== id) })),

      // Pages
      updatePage: (key, data) =>
        set((s) => ({
          pages: {
            ...s.pages,
            [key]: { ...(s.pages[key] || { title: '', subtitle: '', content: '', image: '' }), ...data },
          },
        })),

      // Reset
      resetToDefaults: () => set(defaultState),
    }),
    {
      name: 'df-cms',
    }
  )
);

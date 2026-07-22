// Category list is placeholder/demo. Broker list is real (licensed
// Cambodian insurance brokers), but specialties per category are not yet
// confirmed per broker — see the ALL_CATEGORY_SLUGS note below.

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export type Broker = {
  id: string;
  name: string;
  tagline?: string;
  categories: string[]; // Category slugs
  phone?: string;
  email?: string;
  location?: string;
  featured?: boolean;
};

export const categories: Category[] = [
  {
    slug: "health",
    name: "Health Insurance",
    description: "Medical coverage for individuals and families.",
    icon: "🩺",
  },
  {
    slug: "motor",
    name: "Motor Insurance",
    description: "Coverage for cars, motorbikes, and other vehicles.",
    icon: "🚗",
  },
  {
    slug: "life",
    name: "Life Insurance",
    description: "Life and savings plans for you and your loved ones.",
    icon: "❤️",
  },
  {
    slug: "travel",
    name: "Travel Insurance",
    description: "Protection for trips abroad and within Cambodia.",
    icon: "✈️",
  },
  {
    slug: "property",
    name: "Property Insurance",
    description: "Coverage for homes, buildings, and belongings.",
    icon: "🏠",
  },
  {
    slug: "business",
    name: "Business Insurance",
    description: "Liability, property, and staff coverage for companies.",
    icon: "💼",
  },
];

// Specialties per category are not yet confirmed per broker, so every
// broker below is listed under all categories as a general-broker
// assumption. Narrow individual brokers down to their real specialties
// once that's known.
const ALL_CATEGORY_SLUGS = ["health", "motor", "life", "travel", "property", "business"];

export const brokers: Broker[] = [
  {
    id: "affinity-star",
    name: "Affinity Star Insurance Brokers Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "javierneo@affinitystar.insure",
  },
  {
    id: "ag-insurance-broker",
    name: "AG Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "info@agcambodia.com",
    featured: true,
  },
  {
    id: "alpha-insurance-broker",
    name: "Alpha Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "hello@alphainb.com",
  },
  {
    id: "bassac-insurance-broker",
    name: "Bassac Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "info@bassacins.com",
  },
  {
    id: "blue-ocean-insurance-broker",
    name: "Blue Ocean Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "info@boinsurancebroker.com",
  },
  {
    id: "elite-insurance-brokers",
    name: "Elite Insurance Brokers (Cambodia) PLC.",
    categories: ALL_CATEGORY_SLUGS,
    email: "info@elitebrokercambodia.com",
  },
  {
    id: "fincorp-insurance-broker",
    name: "Fincorp Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "info@fincorpinsurancebroker.com.kh",
  },
  {
    id: "global-general-insurance-broker",
    name: "Global General Insurance Broker PLC.",
    categories: ALL_CATEGORY_SLUGS,
    email: "info@gg-insurancebroker.com",
    featured: true,
  },
  {
    id: "icon-insurance-brokers",
    name: "Icon Insurance Brokers Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
  },
  {
    id: "lc-insurance-broker",
    name: "LC Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "info@lc-cambodia.com",
  },
  {
    id: "lockton-ibs",
    name: "Lockton IBS Insurance Brokers (Cambodia) Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "op@lockton-ibs.com",
  },
  {
    id: "mga-asia-insurance-broker",
    name: "MGA Asia Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "asia@mga.com",
  },
  {
    id: "profound-insurance-broker",
    name: "Profound Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
  },
  {
    id: "provita-insurance-broker",
    name: "Provita Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "info@provitainsbroker.com",
  },
  {
    id: "rio-huot-insurance-broker",
    name: "Rio Huot Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
  },
  {
    id: "safetynet-insurance-brokers",
    name: "Safetynet Insurance Brokers (Cambodia) Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "help@safetynet-health.com",
  },
  {
    id: "sino-asean-international",
    name: "Sino ASEAN International Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
  },
  {
    id: "tb-insurance-broker",
    name: "TB Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "claims@tbinsurancebroker.com",
  },
  {
    id: "tigermar-cambodia",
    name: "Tigermar (Cambodia) Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "cambodia@tigermar-kh.com",
  },
  {
    id: "wecare-insurance-broker",
    name: "Wecare Insurance Broker Co., Ltd.",
    categories: ALL_CATEGORY_SLUGS,
    email: "info@wecareinsurance.asia",
    featured: true,
  },
  {
    id: "worldbridge-insurance-brokers",
    name: "Worldbridge Insurance Brokers PLC.",
    categories: ALL_CATEGORY_SLUGS,
    email: "hello@worldbridgeins.com",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getBroker(id: string): Broker | undefined {
  return brokers.find((b) => b.id === id);
}

export function brokersForCategory(slug: string): Broker[] {
  return brokers.filter((b) => b.categories.includes(slug));
}

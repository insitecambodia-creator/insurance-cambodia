// Placeholder demo data for the insurance directory.
// Replace with real broker/category data before launch.

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export type Broker = {
  id: string;
  name: string;
  tagline: string;
  categories: string[]; // Category slugs
  phone: string;
  email: string;
  location: string;
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

export const brokers: Broker[] = [
  {
    id: "mekong-shield",
    name: "Mekong Shield Insurance Brokers",
    tagline: "Family health and life plans across Phnom Penh.",
    categories: ["health", "life", "business"],
    phone: "+855 12 345 678",
    email: "contact@mekongshield.example",
    location: "Phnom Penh",
  },
  {
    id: "angkor-trust",
    name: "Angkor Trust Insurance",
    tagline: "Motor and property coverage with fast local claims.",
    categories: ["motor", "property"],
    phone: "+855 12 456 789",
    email: "hello@angkortrust.example",
    location: "Siem Reap",
  },
  {
    id: "tonle-sap-assurance",
    name: "Tonle Sap Assurance Partners",
    tagline: "Health and travel cover for individuals and groups.",
    categories: ["health", "travel"],
    phone: "+855 12 567 890",
    email: "info@tonlesapassurance.example",
    location: "Phnom Penh",
  },
  {
    id: "bayon-risk-advisors",
    name: "Bayon Risk Advisors",
    tagline: "Commercial and property risk advisory for SMEs.",
    categories: ["business", "property"],
    phone: "+855 12 678 901",
    email: "advisors@bayonrisk.example",
    location: "Phnom Penh",
  },
  {
    id: "khmer-family",
    name: "Khmer Family Insurance Co.",
    tagline: "Life and health plans built for growing families.",
    categories: ["life", "health"],
    phone: "+855 12 789 012",
    email: "care@khmerfamily.example",
    location: "Battambang",
  },
  {
    id: "riverside-brokers",
    name: "Riverside Insurance Brokers",
    tagline: "Motor and travel coverage with same-day quotes.",
    categories: ["motor", "travel"],
    phone: "+855 12 890 123",
    email: "quotes@riversidebrokers.example",
    location: "Phnom Penh",
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

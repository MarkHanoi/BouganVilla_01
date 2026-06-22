export interface Property {
  id: string;
  name: string;
  area: string;
  region: string;
  type: "villa" | "apartment";
  description: string;
  longDescription: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  image: string;
  images: string[];
  amenities: string[];
  tags: string[];
  highlights: { label: string; value: string }[];
  nearby: { label: string; distance: string }[];
  cta: { label: string; href: string; external?: boolean };
  basePriceEur?: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  origin: string;
  property: string;
  rating: number;
}

export const properties: Property[] = [
  {
    id: "villa-emerald",
    name: "Villa Emerald",
    area: "Belverde, Aroeira",
    region: "Setúbal Coast",
    type: "villa",
    description:
      "Wake up to natural light, step straight into the pool, and enjoy quiet days just minutes from the beach. A modern private retreat designed for relaxed holidays and outdoor living.",
    longDescription:
      "Villa Emerald sits in Belverde in the heart of the Aroeira pine forest — a modern, light-filled home designed around outdoor living. The bright open-plan living and dining area opens directly onto the swimming pool, creating a seamless indoor–outdoor flow with excellent sun exposure throughout the day.\n\nOn the ground floor, the master ensuite opens onto the patio and fragrant lemon trees. A sleek, fully equipped kitchen with a breakfast bar is perfect for leisurely mornings. Upstairs, two further bedrooms — a double and a twin — share a bathroom with bathtub, ideal for families or groups of friends.\n\nOutside, the 9m × 3.5m private pool is the heart of the villa, surrounded by a terrace with sun loungers, a dining table for six, and a built-in brick BBQ. You are just 6 km from the beach, 5 km from Aroeira Golf Course, and 23 km from Lisbon — close to everything, yet peaceful and private.",
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    image: "/photos/villa-bougainvillea/05_Outdoor_Proper_Main.avif",
    images: [
      "/photos/villa-bougainvillea/05_Outdoor_Proper_Main.avif",
      "/photos/villa-bougainvillea/01_Swimming_Pool_Water.avif",
      "/photos/villa-bougainvillea/03_Outdoor_From_Far.avif",
      "/photos/villa-bougainvillea/02_Outdoor_Swimmingpool.avif",
      "/photos/villa-bougainvillea/04_Outdoor_Dinning.avif",
      "/photos/villa-bougainvillea/01_Outdoor_main.avif",
      "/photos/villa-bougainvillea/01_Living_Room_Main.avif",
      "/photos/villa-bougainvillea/02_LivingRoom_CafeTable.avif",
      "/photos/villa-bougainvillea/01_Kitchen_main.avif",
      "/photos/villa-bougainvillea/02_Kitchen_CounterTop.avif",
      "/photos/villa-bougainvillea/01_Dinning_Area.avif",
      "/photos/villa-bougainvillea/01_Bedroom_Master.avif",
    ],
    amenities: [
      "Private Pool (9m × 3.5m)",
      "Garden & Terrace",
      "Built-in BBQ",
      "Indoor Parking",
      "Wi-Fi",
      "Air Conditioning",
      "Fully Equipped Kitchen",
      "Pool Towels Available",
      "Sun Loungers & Dining Terrace",
      "Guest WC",
    ],
    tags: ["Villa", "Private Pool", "Garden", "Sleeps 6", "Beach 6 km", "Near Lisbon"],
    highlights: [
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "2 + WC" },
      { label: "Guests", value: "Up to 6" },
      { label: "Pool", value: "9m × 3.5m" },
      { label: "Beach", value: "6 km" },
      { label: "Lisbon", value: "23 km" },
    ],
    nearby: [
      { label: "Fonte da Telha Beach", distance: "6 km" },
      { label: "Restaurants", distance: "500 m" },
      { label: "Supermarkets", distance: "750 m" },
      { label: "Aroeira Golf Course", distance: "5 km" },
      { label: "Tennis & Padel", distance: "3.5 km" },
      { label: "Costa da Caparica", distance: "11 km" },
      { label: "Arrábida Natural Park", distance: "23 km" },
      { label: "Lisbon Airport", distance: "28 km" },
    ],
    cta: {
      label: "View on Airbnb",
      href: "https://www.airbnb.com/hosting/listings/editor/1575967103888810416",
      external: true,
    },
  },
  {
    id: "apartamento-sao-martinho",
    name: "Apartamento São Martinho",
    area: "São Martinho",
    region: "Silver Coast",
    type: "apartment",
    description:
      "A bright and beautifully appointed apartment in São Martinho — the perfect base for exploring the silver coast, with charm and comfort in equal measure.",
    longDescription:
      "São Martinho do Porto is one of Portugal's best-kept secrets: a sheltered bay shaped like a giant scallop, warm turquoise water, and a village that moves at exactly the right pace. Apartamento São Martinho sits in the heart of it all — bright, well-appointed, and thoughtfully furnished. Walk to the beach in minutes, explore the local market, or simply sit on the terrace with a glass of wine and watch the light change. Sleeps four comfortably — ideal for couples or a small family.",
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    image: "/photos/apartamento-sao-martinho/01_main.jpg",
    images: [
      "/photos/apartamento-sao-martinho/01_main.jpg",
    ],
    amenities: [
      "Central Location",
      "Terrace",
      "Wi-Fi",
      "Beach Walk",
      "Fully Equipped Kitchen",
      "Air Conditioning",
    ],
    tags: ["Apartment", "Central", "Cosy", "Sleeps 4", "Silver Coast"],
    highlights: [
      { label: "Bedrooms", value: "2" },
      { label: "Bathrooms", value: "1" },
      { label: "Guests", value: "Up to 4" },
      { label: "Beach", value: "5 min walk" },
    ],
    nearby: [
      { label: "São Martinho Bay", distance: "5 min walk" },
      { label: "Village centre", distance: "2 min walk" },
      { label: "Nazaré (big waves)", distance: "25 min" },
      { label: "Óbidos (walled city)", distance: "30 min" },
      { label: "Lisbon", distance: "1h 15min" },
      { label: "Lisbon Airport", distance: "1h 20min" },
    ],
    cta: {
      label: "Enquire Now",
      href: "/contact?property=apartamento-sao-martinho",
      external: false,
    },
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "The villa was everything the description promised and more. The pine forest, the pool, the proximity to the beach — it felt like our own private corner of Portugal.",
    author: "Sarah & James",
    origin: "London",
    property: "Villa Emerald",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "São Martinho is magical and the apartment was perfectly placed. We didn't want to leave. Bougan Villa's personal touch made all the difference.",
    author: "Marie-Claire",
    origin: "Paris",
    property: "Apartamento São Martinho",
    rating: 5,
  },
];

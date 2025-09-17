"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

// --- TYPE DEFINITIONS (FIX 1) ---
// Define a strict type for Amenity to prevent typos and allow for better autocompletion.
type Amenity =
  | "Overwater Villa"
  | "Private Pool"
  | "Butler Service"
  | "Spa"
  | "Underwater Restaurant"
  | "Water Sports"
  | "Private Beach"
  | "Beach Villa"
  | "Overwater Bungalow"
  | "Diving Center"
  | "Wellness Spa"
  | "Yoga Pavilion"
  | "Fine Dining"
  | "City Views"
  | "Business Center";

// Define an interface for the Hotel object.
interface Hotel {
  id: number;
  name: string;
  image: string;
  rating: number;
  priceRange: string;
  amenities: Amenity[]; // Use the Amenity type
  description: string;
}

// Define an interface for the Destination object.
interface Destination {
  id: number;
  name: string;
  description: string;
  hotels: number;
  image: string;
  rating: number;
  country: string;
  longDescription: string;
}

// --- TYPED DATA (FIX 2) ---
const destinations: Destination[] = [
  {
    id: 1,
    name: "Maldives",
    description: "Crystal clear waters and overwater bungalows",
    hotels: 45,
    image: "/maldives-overwater-bungalows-crystal-clear-water.jpg",
    rating: 4.9,
    country: "Maldives",
    longDescription:
      "The Maldives offers an unparalleled luxury experience with its pristine white sand beaches, crystal-clear turquoise waters, and world-class overwater bungalows. This tropical paradise is perfect for romantic getaways, honeymoons, and those seeking ultimate relaxation in an idyllic setting.",
  },
  {
    id: 2,
    name: "Swiss Alps",
    description: "Mountain luxury and pristine ski slopes",
    hotels: 32,
    image: "/placeholder-swiss-alps.png",
    rating: 4.8,
    country: "Switzerland",
    longDescription:
      "Experience the majestic beauty of the Swiss Alps, where breathtaking peaks meet charming alpine villages. Whether you're seeking world-class skiing, scenic summer hikes, or simply cozying up in a luxury chalet, this mountain paradise offers an unforgettable adventure for every season.",
  },
  {
    id: 3,
    name: "Santorini",
    description: "Iconic white buildings and stunning sunsets",
    hotels: 28,
    image: "/placeholder-santorini.png",
    rating: 4.7,
    country: "Greece",
    longDescription:
      "Discover the magic of Santorini, a gem of the Aegean Sea. Famous for its whitewashed villages clinging to cliffs, blue-domed churches, and legendary sunsets over the caldera, this Greek island is the epitome of romance and picturesque beauty, offering a truly unique Mediterranean escape.",
  },
  {
    id: 4,
    name: "Tokyo",
    description: "Modern luxury meets traditional culture",
    hotels: 67,
    image: "/placeholder-tokyo.png",
    rating: 4.6,
    country: "Japan",
    longDescription:
      "Immerse yourself in the vibrant energy of Tokyo, a city where ancient traditions and futuristic technology coexist. From tranquil temples and serene gardens to bustling crossings and Michelin-starred dining, Tokyo offers a captivating journey through the heart of Japanese culture and innovation.",
  },
  {
    id: 5,
    name: "Dubai",
    description: "Opulent resorts and architectural marvels",
    hotels: 54,
    image: "/placeholder-dubai.png",
    rating: 4.8,
    country: "UAE",
    longDescription:
      "Welcome to Dubai, a city of superlatives where ambition and luxury know no bounds. Marvel at iconic skyscrapers, indulge in world-class shopping, relax on pristine beaches, and experience the ultimate in opulent hospitality. Dubai is a dazzling desert metropolis that promises an extraordinary adventure.",
  },
];

// Use a Record type for a strongly-typed dictionary. Keys are numbers, values are Hotel arrays.
const hotelsByDestination: Record<number, Hotel[]> = {
  1: [
    // Maldives
    {
      id: 1,
      name: "Soneva Jani",
      image: "/luxury-overwater-villa-maldives.png",
      rating: 4.9,
      priceRange: "$2,500 - $8,000",
      amenities: ["Overwater Villa", "Private Pool", "Butler Service", "Spa"],
      description: "Luxury overwater villas with unparalleled ocean views",
    },
    {
      id: 2,
      name: "Conrad Maldives Rangali Island",
      image: "/underwater-restaurant-maldives-resort.jpg",
      rating: 4.8,
      priceRange: "$1,800 - $5,500",
      amenities: [
        "Underwater Restaurant",
        "Spa",
        "Water Sports",
        "Private Beach",
      ],
      description: "Famous for its underwater restaurant and pristine beaches",
    },
    {
      id: 3,
      name: "Four Seasons Resort Maldives",
      image: "/four-seasons-maldives-beach-villa.jpg",
      rating: 4.9,
      priceRange: "$2,200 - $6,800",
      amenities: ["Beach Villa", "Overwater Bungalow", "Spa", "Diving Center"],
      description: "Elegant beachfront and overwater accommodations",
    },
    {
      id: 4,
      name: "COMO Maalifushi",
      image: "/como-maldives-resort-villa.jpg",
      rating: 4.7,
      priceRange: "$1,500 - $4,200",
      amenities: [
        "Wellness Spa",
        "Yoga Pavilion",
        "Water Sports",
        "Fine Dining",
      ],
      description: "Wellness-focused resort with holistic experiences",
    },
  ],
  2: [
    // Swiss Alps
    {
      id: 5,
      name: "The Chedi Andermatt",
      image: "/placeholder-swiss-alps-hotel.png",
      rating: 4.9,
      priceRange: "$1,200 - $3,500",
      amenities: ["Spa", "Fine Dining", "Private Pool", "Butler Service"],
      description: "An elegant blend of Alpine chic and Asian Zen.",
    },
    {
      id: 6,
      name: "Badrutt's Palace Hotel",
      image: "/placeholder-badrutts-palace.png",
      rating: 4.8,
      priceRange: "$1,500 - $4,000",
      amenities: ["Butler Service", "Spa", "Fine Dining", "City Views"],
      description: "A St. Moritz landmark of luxury and refined service.",
    },
  ],
  3: [
    // Santorini
    {
      id: 7,
      name: "Canaves Oia Suites",
      image: "/placeholder-santorini-hotel.png",
      rating: 4.9,
      priceRange: "$900 - $2,800",
      amenities: ["Private Pool", "Spa", "Water Sports", "Fine Dining"],
      description: "Carved into the cliffside with breathtaking caldera views.",
    },
    {
      id: 8,
      name: "Grace Hotel, Auberge Resorts",
      image: "/placeholder-grace-hotel-santorini.png",
      rating: 4.8,
      priceRange: "$1,100 - $3,200",
      amenities: [
        "Private Pool",
        "Wellness Spa",
        "Fine Dining",
        "Yoga Pavilion",
      ],
      description: "Iconic clifftop hotel with stunning infinity pools.",
    },
  ],
  4: [
    // Tokyo
    {
      id: 9,
      name: "The Ritz-Carlton, Tokyo",
      image: "/ritz-carlton-tokyo-luxury-hotel.jpg",
      rating: 4.8,
      priceRange: "$800 - $2,500",
      amenities: ["City Views", "Spa", "Fine Dining", "Business Center"],
      description: "Luxury hotel with stunning city and Mount Fuji views.",
    },
    {
      id: 10,
      name: "Aman Tokyo",
      image: "/placeholder-aman-tokyo.png",
      rating: 4.9,
      priceRange: "$1,500 - $4,500",
      amenities: ["Spa", "Private Pool", "City Views", "Fine Dining"],
      description: "A serene, ryokan-inspired sanctuary high above the city.",
    },
  ],
  5: [
    // Dubai
    {
      id: 11,
      name: "Burj Al Arab Jumeirah",
      image: "/placeholder-burj-al-arab.png",
      rating: 4.9,
      priceRange: "$1,800 - $7,000",
      amenities: ["Butler Service", "Private Beach", "Spa", "Fine Dining"],
      description: "The world's most iconic sail-shaped luxury hotel.",
    },
    {
      id: 12,
      name: "Atlantis, The Palm",
      image: "/placeholder-atlantis-dubai.png",
      rating: 4.7,
      priceRange: "$500 - $2,000",
      amenities: [
        "Water Sports",
        "Underwater Restaurant",
        "Private Beach",
        "Spa",
      ],
      description: "A majestic resort famous for its aquatic attractions.",
    },
  ],
};

// Type the icons dictionary. The key can be any Amenity string or 'default'. The value is a LucideIcon component.
const amenityIcons: Record<Amenity | "default", LucideIcon> = {
  "Overwater Villa": Waves,
  "Private Pool": Waves,
  "Butler Service": Coffee,
  Spa: Coffee,
  "Underwater Restaurant": Coffee,
  "Water Sports": Waves,
  "Private Beach": Waves,
  "Beach Villa": Waves,
  "Overwater Bungalow": Waves,
  "Diving Center": Waves,
  "Wellness Spa": Coffee,
  "Yoga Pavilion": Coffee,
  "Fine Dining": Coffee,
  "City Views": MapPin,
  "Business Center": Wifi,
  default: Wifi,
};

export default function DestinationDetailPage() {
  const router = useRouter();
  const params = useParams();

  // --- SAFE PARAMETER HANDLING (FIX 3) ---
  // params.id can be a string, string[], or undefined. Safely parse it.
  const destinationId = params.id
    ? parseInt(Array.isArray(params.id) ? params.id[0] : params.id, 10)
    : NaN;

  // Find the destination. It can be 'undefined' if the id doesn't match.
  const destination = destinations.find((d) => d.id === destinationId);

  // Get hotels only if the ID is a valid number.
  const hotels = !isNaN(destinationId)
    ? hotelsByDestination[destinationId] || []
    : [];

  // --- ERROR HANDLING (FIX 4) ---
  // If the destination ID is not a number or not found, show an error message.
  if (!destination) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Destination not found</h1>
        <p className="text-muted-foreground">
          The destination you're looking for does not exist.
        </p>
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="mt-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Destinations
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-96 rounded-lg overflow-hidden mb-8">
            <img
              // src={destination.image || "/placeholder.svg"}
              src={"http://placehold.co/400x300"}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {destination.country}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {destination.name}
              </h1>
              <p className="text-lg opacity-90 max-w-2xl">
                {destination.longDescription}
              </p>
            </div>
            <div className="absolute top-6 right-6 bg-black/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium border border-white/20">
              <Star className="w-4 h-4 inline mr-1 fill-yellow-400 text-yellow-400" />
              {destination.rating}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Available Hotels
              </h2>
              <p className="text-muted-foreground">
                {hotels.length} luxury hotels in {destination.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 py-0">
                  <div className="relative h-48">
                    <img
                      // src={hotel.image || "/placeholder.svg"}
                      src={"http://placehold.co/400x300"}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs font-medium">
                      <Star className="w-3 h-3 inline mr-1 fill-yellow-400 text-yellow-400" />
                      {hotel.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {hotel.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {hotel.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 3).map((amenity) => {
                        // --- TYPED ICONS (FIX 5) ---
                        // TypeScript now knows 'amenity' is a valid key for amenityIcons
                        const IconComponent =
                          amenityIcons[amenity] || amenityIcons.default;
                        return (
                          <Badge
                            variant={"secondary"}
                            key={amenity}
                            className="text-xs"
                          >
                            <IconComponent className="w-3 h-3 mr-1" />
                            {amenity}
                          </Badge>
                        );
                      })}
                      {hotel.amenities.length > 3 && (
                        <div className="bg-muted rounded-full px-3 py-1 text-xs">
                          +{hotel.amenities.length - 3} more
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Price range
                        </p>
                        <p className="font-bold text-foreground">
                          {hotel.priceRange}
                        </p>
                      </div>
                      <Button
                        onClick={() => router.push(`/hotels/${hotel.id}`)}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        Reserve Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, MapPin, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const allDestinations = [
  {
    id: 1,
    name: "Maldives",
    description: "Crystal clear waters and overwater bungalows",
    hotels: 45,
    image: "/maldives-overwater-bungalows-crystal-clear-water.jpg",
    rating: 4.9,
    country: "Maldives",
  },
  {
    id: 2,
    name: "Swiss Alps",
    description: "Mountain luxury and pristine ski slopes",
    hotels: 32,
    image: "/placeholder-764vw.png",
    rating: 4.8,
    country: "Switzerland",
  },
  {
    id: 3,
    name: "Santorini",
    description: "Iconic white buildings and stunning sunsets",
    hotels: 28,
    image: "/placeholder-i8u7f.png",
    rating: 4.7,
    country: "Greece",
  },
  {
    id: 4,
    name: "Tokyo",
    description: "Modern luxury meets traditional culture",
    hotels: 67,
    image: "/placeholder-d6rsd.png",
    rating: 4.6,
    country: "Japan",
  },
  {
    id: 5,
    name: "Dubai",
    description: "Opulent resorts and architectural marvels",
    hotels: 54,
    image: "/placeholder-nhb76.png",
    rating: 4.8,
    country: "UAE",
  },
];

export default function DestinationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Destinations
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Destinations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover luxury accommodations in the world's most beautiful
            locations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 py-0">
                <div className="relative h-64">
                  <img
                    // src={destination.image || "/placeholder.svg"}
                    src={"https://placehold.co/400x300"}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                    <Star className="w-4 h-4 inline mr-1 fill-yellow-400 text-yellow-400" />
                    {destination.rating}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {destination.country}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {destination.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary">
                      {destination.hotels} luxury hotels
                    </span>
                    <Button
                      size="sm"
                      onClick={() =>
                        router.push(`/destinations/${destination.id}`)
                      }
                    >
                      Explore
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

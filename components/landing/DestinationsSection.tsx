"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const destinations = [
  {
    id: 1,
    name: "Maldives",
    description: "Crystal clear waters and overwater bungalows",
    hotels: 45,
    image: "/maldives-overwater-bungalows-crystal-clear-water.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Swiss Alps",
    description: "Mountain luxury and pristine ski slopes",
    hotels: 32,
    image: "https://placehold.co/400",
    featured: false,
  },
  {
    id: 3,
    name: "Santorini",
    description: "Iconic white buildings and stunning sunsets",
    hotels: 28,
    image: "https://placehold.co/400",
    featured: false,
  },
  {
    id: 4,
    name: "Tokyo",
    description: "Modern luxury meets traditional culture",
    hotels: 67,
    image: "https://placehold.co/400",
    featured: false,
  },
  {
    id: 5,
    name: "Dubai",
    description: "Opulent resorts and architectural marvels",
    hotels: 54,
    image: "https://placehold.co/400",
    featured: false,
  },
];

export function DestinationsSection() {
  return (
    <section id="destinations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Explore Dream Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From tropical paradises to mountain retreats, discover luxury
            accommodations in the world's most sought-after locations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Destination - Large Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden h-full group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="relative h-80 lg:h-full">
                <img
                  src={destinations[0].image || "/placeholder.svg"}
                  alt={destinations[0].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {destinations[0].name}
                  </h3>
                  <p className="text-gray-200 mb-4 text-lg">
                    {destinations[0].description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      {destinations[0].hotels} luxury hotels
                    </span>
                    <Button variant="secondary" size="sm" className="group/btn">
                      Discover
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>

          {/* Other Destinations - Grid */}
          <div className="space-y-6">
            {destinations.slice(1).map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <div className="flex">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="flex-1 p-4">
                      <h4 className="font-semibold text-foreground mb-1">
                        {destination.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {destination.description}
                      </p>
                      <span className="text-xs text-secondary font-medium">
                        {destination.hotels} hotels
                      </span>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            View All Destinations
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

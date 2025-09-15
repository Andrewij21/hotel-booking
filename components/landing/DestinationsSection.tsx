"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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
    image: "/placeholder-764vw.png",
    featured: false,
  },
  {
    id: 3,
    name: "Santorini",
    description: "Iconic white buildings and stunning sunsets",
    hotels: 28,
    image: "/placeholder-i8u7f.png",
    featured: false,
  },
  {
    id: 4,
    name: "Tokyo",
    description: "Modern luxury meets traditional culture",
    hotels: 67,
    image: "/placeholder-d6rsd.png",
    featured: false,
  },
  {
    id: 5,
    name: "Dubai",
    description: "Opulent resorts and architectural marvels",
    hotels: 54,
    image: "/placeholder-nhb76.png",
    featured: false,
  },
];

export function DestinationsSection() {
  const router = useRouter();

  const handleDiscoverDestination = (destinationId: number) => {
    router.push(`/destinations/${destinationId}`);
  };

  const handleViewAllDestinations = () => {
    router.push("/destinations");
  };

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
            <Card
              className="overflow-hidden h-full group cursor-pointer hover:shadow-xl transition-all duration-300 py-0"
              onClick={() => handleDiscoverDestination(destinations[0].id)}
            >
              <div className="relative h-80 lg:h-full">
                <img
                  src={destinations[0].image || "/placeholder.svg"}
                  alt={destinations[0].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-lg">
                    {destinations[0].name}
                  </h3>
                  <p className="text-gray-100 mb-4 text-lg drop-shadow-md">
                    {destinations[0].description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-white border border-white/20">
                      {destinations[0].hotels} luxury hotels
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="group/btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDiscoverDestination(destinations[0].id);
                      }}
                    >
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
                className="min-h-52 flex"
              >
                <Card
                  className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 py-0 flex-1"
                  onClick={() => handleDiscoverDestination(destination.id)}
                >
                  <div
                    className="relative bg-cover bg-center group-hover:scale-105 transition-transform duration-300 min-h-full"
                    style={{
                      // backgroundImage: `url(${
                      //   destination.image || "/placeholder.svg"
                      // })`,
                      backgroundImage: `url(${destinations[0].image})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                    <CardContent className="relative h-full flex flex-col justify-center p-4 text-white">
                      <h4 className="font-semibold mb-1 text-white drop-shadow-lg">
                        {destination.name}
                      </h4>
                      <p className="text-sm text-gray-100 mb-2 line-clamp-1 drop-shadow-md">
                        {destination.description}
                      </p>
                      <span className="text-xs bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 w-fit text-white border border-white/30">
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
          <Button
            variant="outline"
            size="lg"
            className="px-8 bg-transparent"
            onClick={handleViewAllDestinations}
          >
            View All Destinations
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

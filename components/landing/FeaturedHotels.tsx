"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const hotels = [
  {
    id: 1,
    name: "The Ocean Pearl Resort",
    location: "Maldives",
    rating: 4.9,
    reviews: 1247,
    price: 850,
    image: "/placeholder-pgvxm.png",
    amenities: ["Free WiFi", "Spa", "Restaurant", "Pool"],
    badge: "Most Popular",
  },
  {
    id: 2,
    name: "Alpine Luxury Lodge",
    location: "Swiss Alps",
    rating: 4.8,
    reviews: 892,
    price: 650,
    image: "/placeholder-3tduv.png",
    amenities: ["Ski Access", "Spa", "Restaurant", "Parking"],
    badge: "Best Value",
  },
  {
    id: 3,
    name: "Urban Skyline Hotel",
    location: "New York City",
    rating: 4.7,
    reviews: 2156,
    price: 420,
    image: "/placeholder-1iuue.png",
    amenities: ["City View", "Gym", "Restaurant", "WiFi"],
    badge: "City Center",
  },
  {
    id: 4,
    name: "Tropical Paradise Villa",
    location: "Bali, Indonesia",
    rating: 4.9,
    reviews: 1543,
    price: 380,
    image: "/placeholder-0fvd5.png",
    amenities: ["Private Pool", "Spa", "Garden", "WiFi"],
    badge: "Romantic",
  },
];

export function FeaturedHotels() {
  const router = useRouter();

  const handleHotelClick = (hotelId: number) => {
    router.push(`/hotels/${hotelId}`);
  };

  const handleBookNow = (e: React.MouseEvent, hotelId: number) => {
    e.stopPropagation();
    router.push(`/hotels/${hotelId}`);
  };

  const handleViewAll = () => {
    router.push("/hotels");
  };
  return (
    <section id="hotels" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Featured Luxury Hotels
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Handpicked accommodations that offer exceptional experiences and
            world-class service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white py-0"
                onClick={() => handleHotelClick(hotel.id)}
              >
                <div className="relative">
                  <img
                    // src={hotel.image || "/placeholder.svg"}
                    src={"https://placehold.co/600x400"}
                    alt={hotel.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                    {hotel.badge}
                  </Badge>
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs font-medium">
                      {hotel.rating}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-lg leading-tight">
                      {hotel.name}
                    </h3>
                  </div>

                  <div className="flex items-center text-sm mb-3 text-muted">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(hotel.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({hotel.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {hotel.amenities.slice(0, 3).map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="secondary"
                        className="text-xs"
                      >
                        {amenity}
                      </Badge>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{hotel.amenities.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground">
                        ${hotel.price}
                      </span>
                      <span className="text-muted text-sm">/night</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      onClick={(e) => handleBookNow(e, hotel.id)}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
            onClick={handleViewAll}
          >
            View All Hotels
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

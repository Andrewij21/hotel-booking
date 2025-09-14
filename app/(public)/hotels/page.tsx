"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, MapPin, ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";
const allHotels = [
  {
    id: 1,
    name: "The Ocean Pearl Resort",
    location: "Maldives",
    rating: 4.9,
    reviews: 1247,
    price: 850,
    image: "/placeholder-a04m2.png",
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
    image: "/placeholder-sjq5x.png",
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
    image: "/placeholder-7elii.png",
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
    image: "/placeholder-qr0cn.png",
    amenities: ["Private Pool", "Spa", "Garden", "WiFi"],
    badge: "Romantic",
  },
  {
    id: 5,
    name: "Desert Oasis Resort",
    location: "Dubai, UAE",
    rating: 4.6,
    reviews: 987,
    price: 720,
    image: "/desert-luxury-resort-dubai.jpg",
    amenities: ["Desert View", "Spa", "Pool", "Restaurant"],
    badge: "Luxury",
  },
  {
    id: 6,
    name: "Coastal Retreat Hotel",
    location: "California, USA",
    rating: 4.5,
    reviews: 654,
    price: 480,
    image: "/coastal-hotel-california-beach.jpg",
    amenities: ["Beach Access", "WiFi", "Restaurant", "Gym"],
    badge: "Beach Front",
  },
  {
    id: 7,
    name: "Mountain View Chalet",
    location: "Canada",
    rating: 4.7,
    reviews: 789,
    price: 550,
    image: "/placeholder.svg",
    amenities: ["Mountain View", "Fireplace", "Hiking Trails"],
    badge: "Nature",
  },
  {
    id: 8,
    name: "City Lights Penthouse",
    location: "Tokyo, Japan",
    rating: 4.9,
    reviews: 3012,
    price: 950,
    image: "/placeholder.svg",
    amenities: ["Rooftop Bar", "Infinity Pool", "Concierge"],
    badge: "Exclusive",
  },
  {
    id: 9,
    name: "Safari Wilderness Camp",
    location: "Kenya",
    rating: 4.8,
    reviews: 543,
    price: 1200,
    image: "/placeholder.svg",
    amenities: ["Safari Tours", "All-inclusive", "Stargazing"],
    badge: "Adventure",
  },
  {
    id: 10,
    name: "Historic Grand Hotel",
    location: "Paris, France",
    rating: 4.6,
    reviews: 1890,
    price: 710,
    image: "/placeholder.svg",
    amenities: ["Historic Building", "Fine Dining", "Valet"],
    badge: "Classic",
  },
  {
    id: 11,
    name: "Rainforest Eco-Lodge",
    location: "Costa Rica",
    rating: 4.7,
    reviews: 632,
    price: 320,
    image: "/placeholder.svg",
    amenities: ["Jungle Tours", "Yoga Deck", "Organic Food"],
    badge: "Eco-friendly",
  },
  {
    id: 12,
    name: "Nordic Lights Igloo",
    location: "Finland",
    rating: 4.9,
    reviews: 998,
    price: 1100,
    image: "/placeholder.svg",
    amenities: ["Glass Igloo", "Sauna", "Northern Lights"],
    badge: "Once a Lifetime",
  },
  {
    id: 13,
    name: "Lakeside Serenity Inn",
    location: "Lake Como, Italy",
    rating: 4.8,
    reviews: 812,
    price: 680,
    image: "/placeholder.svg",
    amenities: ["Lake View", "Boat Rentals", "Garden"],
    badge: "Peaceful",
  },
  {
    id: 14,
    name: "The Royal Sands",
    location: "Cancun, Mexico",
    rating: 4.5,
    reviews: 2500,
    price: 450,
    image: "/placeholder.svg",
    amenities: ["All-inclusive", "Water Sports", "Kids Club"],
    badge: "Family Fun",
  },
  {
    id: 15,
    name: "Red Rock Canyon Resort",
    location: "Arizona, USA",
    rating: 4.6,
    reviews: 721,
    price: 530,
    image: "/placeholder.svg",
    amenities: ["Canyon Views", "Hiking", "Spa"],
    badge: "Scenic",
  },
  {
    id: 16,
    name: "The Ancient Temple Hotel",
    location: "Kyoto, Japan",
    rating: 4.9,
    reviews: 1234,
    price: 880,
    image: "/placeholder.svg",
    amenities: ["Zen Garden", "Tea Ceremony", "Onsen"],
    badge: "Cultural",
  },
  {
    id: 17,
    name: "Coral Reef Bungalows",
    location: "Fiji",
    rating: 4.8,
    reviews: 910,
    price: 920,
    image: "/placeholder.svg",
    amenities: ["Overwater Bungalow", "Snorkeling", "Private Beach"],
    badge: "Honeymoon",
  },
  {
    id: 18,
    name: "The Grand Budapest Hotel",
    location: "Budapest, Hungary",
    rating: 4.7,
    reviews: 1754,
    price: 620,
    image: "/placeholder.svg",
    amenities: ["Thermal Baths", "Historic Decor", "Gourmet"],
    badge: "Iconic",
  },
];
const ITEMS_PER_PAGE = 6;
export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState("all");

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const router = useRouter();

  const filteredHotels = allHotels
    .filter((hotel) => {
      const matchesSearch =
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "budget" && hotel.price < 400) ||
        (priceRange === "mid" && hotel.price >= 400 && hotel.price < 700) ||
        (priceRange === "luxury" && hotel.price >= 700);

      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.reviews - a.reviews;
      }
    });
  // Create a slice of the hotels to be displayed
  const visibleHotels = filteredHotels.slice(0, visibleCount);

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      // Load more items if there are more to load
      if (visibleCount < filteredHotels.length) {
        setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredHotels.length, visibleCount]); // Re-add listener if these change

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchTerm, sortBy, priceRange]);

  const handleHotelClick = (hotelId: number) => {
    router.push(`/hotels/${hotelId}`);
  };

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Hotels</span>
          </Button>
        </div>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              All Hotels
            </h1>
            <p className="text-lg text-muted">
              Discover amazing places to stay around the world
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <Input
                placeholder="Search hotels or destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full py-6 pl-12 pr-6 placeholder:text-muted"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 cursor-pointer">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full md:w-48 cursor-pointer">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Under $400</SelectItem>
                <SelectItem value="mid">$400 - $700</SelectItem>
                <SelectItem value="luxury">$700+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-muted">
              Showing {visibleHotels.length} of {allHotels.length} hotels
            </p>
          </div>
          {/* Hotels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer pt-0 bg-background"
                  onClick={() => handleHotelClick(hotel.id)}
                >
                  <div className="relative">
                    <img
                      //   src={hotel.image || "/placeholder.svg"}
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
                    <h3 className="font-semibold text-foreground text-lg mb-2">
                      {hotel.name}
                    </h3>

                    <div className="flex items-center text-muted text-sm mb-3">
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
                      <span className="text-sm text-muted ml-2">
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
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredHotels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted text-lg">
                No hotels found matching your criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchTerm("");
                  setPriceRange("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
          {visibleCount < filteredHotels.length && (
            <div className="text-center py-10">
              <p className="text-muted">Loading more hotels...</p>
            </div>
          )}

          {visibleHotels.length === 0 && (
            <div className="text-center py-12">
              {/* ... (your existing no results message) */}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

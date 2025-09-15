"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const hotels = [
  {
    id: 1,
    name: "The Ocean Pearl Resort",
    location: "Maldives",
    rating: 4.9,
    reviews: 1247,
    price: 850,
    images: [
      "/placeholder-a04m2.png",
      "/placeholder-x0fjp.png",
      "/luxury-hotel-room.png",
      "/resort-restaurant.png",
    ],
    amenities: [
      "Free WiFi",
      "Spa",
      "Restaurant",
      "Pool",
      "Beach Access",
      "Room Service",
      "Gym",
      "Bar",
    ],
    badge: "Most Popular",
    description:
      "Experience ultimate luxury at The Ocean Pearl Resort, where pristine beaches meet world-class service. This exclusive resort offers breathtaking ocean views, private beach access, and unparalleled amenities for the perfect tropical getaway.",
    rooms: [
      { type: "Ocean View Suite", price: 850, capacity: 2 },
      { type: "Beach Villa", price: 1200, capacity: 4 },
      { type: "Presidential Suite", price: 2500, capacity: 6 },
    ],
  },
  {
    id: 2,
    name: "Alpine Luxury Lodge",
    location: "Swiss Alps",
    rating: 4.8,
    reviews: 892,
    price: 650,
    images: [
      "/placeholder-sjq5x.png",
      "/placeholder-c654p.png",
      "/placeholder-cky28.png",
      "/placeholder-818g0.png",
    ],
    amenities: [
      "Ski Access",
      "Spa",
      "Restaurant",
      "Parking",
      "Mountain Views",
      "Fireplace",
      "Ski Equipment",
      "Hot Tub",
    ],
    badge: "Best Value",
    description:
      "Nestled in the heart of the Swiss Alps, our luxury lodge offers direct ski access and stunning mountain views. Perfect for winter sports enthusiasts and those seeking alpine tranquility.",
    rooms: [
      { type: "Mountain View Room", price: 650, capacity: 2 },
      { type: "Alpine Suite", price: 950, capacity: 4 },
      { type: "Chalet Villa", price: 1800, capacity: 8 },
    ],
  },
  {
    id: 3,
    name: "Urban Skyline Hotel",
    location: "New York City",
    rating: 4.7,
    reviews: 2156,
    price: 420,
    images: [
      "/placeholder-7elii.png",
      "/modern-hotel-lobby.png",
      "/placeholder-c3n19.png",
      "/placeholder-rvp7p.png",
    ],
    amenities: [
      "City View",
      "Gym",
      "Restaurant",
      "WiFi",
      "Business Center",
      "Rooftop Bar",
      "Concierge",
      "Valet",
    ],
    badge: "City Center",
    description:
      "Located in the heart of Manhattan, Urban Skyline Hotel offers spectacular city views and easy access to NYC's top attractions. Modern luxury meets urban convenience.",
    rooms: [
      { type: "City View Room", price: 420, capacity: 2 },
      { type: "Executive Suite", price: 680, capacity: 3 },
      { type: "Penthouse Suite", price: 1500, capacity: 4 },
    ],
  },
  {
    id: 4,
    name: "Tropical Paradise Villa",
    location: "Bali, Indonesia",
    rating: 4.9,
    reviews: 1543,
    price: 380,
    images: [
      "/placeholder-qr0cn.png",
      "/placeholder-nt2pi.png",
      "/placeholder-2xtrx.png",
      "/placeholder-dmqut.png",
    ],
    amenities: [
      "Private Pool",
      "Spa",
      "Garden",
      "WiFi",
      "Butler Service",
      "Yoga Studio",
      "Tropical Views",
      "Kitchen",
    ],
    badge: "Romantic",
    description:
      "Escape to your own private paradise in Bali. This exclusive villa features a private pool, lush tropical gardens, and personalized butler service for the ultimate romantic getaway.",
    rooms: [
      { type: "Garden Villa", price: 380, capacity: 2 },
      { type: "Pool Villa", price: 580, capacity: 4 },
      { type: "Royal Villa", price: 980, capacity: 6 },
    ],
  },
];

export default function HotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const hotel = hotels.find(
    (h) => h.id === Number.parseInt(params.id as string)
  );

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  const handleBooking = () => {
    // Check if user is logged in (simulate)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      // Redirect to login
      router.push("/auth/login?redirect=/hotel/" + hotel.id);
    } else {
      // Proceed with booking
      alert(
        `Booking confirmed for ${hotel.name}!\nRoom: ${hotel.rooms[selectedRoom].type}\nPrice: $${hotel.rooms[selectedRoom].price}/night`
      );
    }
  };

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        {/* Back Button */}
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

        {/* Hotel Images */}
        <div className="container mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-96">
            <div className="lg:col-span-3">
              <img
                // src={hotel.images[selectedImage] || "/placeholder.svg"}
                src={"https://placehold.co/600x400"}
                alt={hotel.name}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() =>
                  setSelectedImage((selectedImage + 1) % hotel.images.length)
                }
              />
            </div>
            <div className="grid grid-cols-4 lg:grid-cols-1 gap-2">
              {hotel.images.map((image, index) => (
                <img
                  key={index}
                  //   src={image || "/placeholder.svg"}
                  src={"https://placehold.co/600x400"}
                  alt={`${hotel.name} ${index + 1}`}
                  className={`w-full h-20 lg:h-24 object-cover rounded cursor-pointer transition-all ${
                    selectedImage === index
                      ? "ring-2 ring-secondary"
                      : "hover:opacity-80"
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hotel Info */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {hotel.name}
                    </h1>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hotel.location}
                    </div>
                    <div className="flex items-center space-x-4">
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
                        <span className="ml-2 font-medium">{hotel.rating}</span>
                      </div>
                      <span className="text-muted-foreground">
                        ({hotel.reviews} reviews)
                      </span>
                      <Badge className="bg-secondary text-secondary-foreground">
                        {hotel.badge}
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 text-pretty">
                  {hotel.description}
                </p>

                {/* Amenities */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {hotel.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Room Types */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Room Types</h3>
                  <div className="space-y-4">
                    {hotel.rooms.map((room, index) => (
                      <Card
                        key={index}
                        className={`cursor-pointer transition-all ${
                          selectedRoom === index
                            ? "ring-2 ring-secondary"
                            : "hover:shadow-md"
                        }`}
                        onClick={() => setSelectedRoom(index)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold">{room.type}</h4>
                              <p className="text-sm text-muted-foreground">
                                Up to {room.capacity} guests
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-bold">
                                ${room.price}
                              </span>
                              <span className="text-muted-foreground">
                                /night
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-foreground">
                      ${hotel.rooms[selectedRoom].price}
                      <span className="text-lg font-normal text-muted-foreground">
                        /night
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {hotel.rooms[selectedRoom].type}
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) =>
                          setGuests(Number.parseInt(e.target.value))
                        }
                        className="w-full p-2 border rounded-md"
                      >
                        {[...Array(hotel.rooms[selectedRoom].capacity)].map(
                          (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1} Guest{i > 0 ? "s" : ""}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    onClick={handleBooking}
                  >
                    Book Now
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    You won't be charged yet
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

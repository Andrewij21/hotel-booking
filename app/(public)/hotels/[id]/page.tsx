"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, MapPin, ArrowLeft, Check, MapPinOff } from "lucide-react";
import { motion } from "framer-motion";

const hotels = [
  // ... (Salin dan tempel data hotel Anda yang sudah ada di sini)
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
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <MapPinOff className="mx-auto h-24 w-24 text-muted-foreground/50 mb-6" />

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Hotel Not Found
          </h1>

          <p className="max-w-md text-lg text-muted-foreground mb-8">
            We couldn't find the hotel you were looking for. It might have been
            moved, or the URL is incorrect.
          </p>

          <Button
            size="lg"
            onClick={() => router.push("/hotels")}
            variant={"ghost"}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Hotels
          </Button>
        </motion.div>
      </div>
    );
  }

  const handleBooking = () => {
    // ... (Your existing booking logic)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      router.push("/auth/login?redirect=/hotel/" + hotel.id);
    } else {
      alert(
        `Booking confirmed for ${hotel.name}!\nRoom: ${hotel.rooms[selectedRoom].type}\nPrice: $${hotel.rooms[selectedRoom].price}/night`
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Back Button and Hotel Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hotels
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {hotel.name}
          </h1>
          <div className="flex items-center text-muted mt-2 text-lg">
            <MapPin className="w-5 h-5 mr-2" />
            {hotel.location}
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] mb-12"
        >
          <div className="col-span-4 md:col-span-2 row-span-2 overflow-hidden rounded-lg">
            <img
              src={"https://placehold.co/800x800"}
              alt={hotel.name}
              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </div>
          {hotel.images.slice(1, 3).map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg col-span-2 md:col-span-1"
            >
              <img
                src={"https://placehold.co/400x400"}
                alt={`${hotel.name} ${index + 2}`}
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
          <div className="overflow-hidden rounded-lg col-span-2 md:col-span-1 relative">
            <img
              src={"https://placehold.co/400x400"}
              alt={`${hotel.name} 4`}
              className="w-full h-full object-cover"
            />
            <Button className="absolute inset-0 w-full h-full bg-black/40 text-white text-lg hover:bg-black/60 transition-colors">
              Show all photos
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Rating and Description */}
              <div className="border-b pb-6 mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge className="text-sm py-1 px-3">{hotel.badge}</Badge>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                    <span className="font-bold text-lg">{hotel.rating}</span>
                    <span className="text-muted-foreground ml-2">
                      ({hotel.reviews} reviews)
                    </span>
                  </div>
                </div>
                <p className="text-muted text-lg leading-relaxed">
                  {hotel.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4">
                  What this place offers
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {hotel.amenities.slice(0, 8).map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-secondary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Types */}
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Choose your room
                </h3>
                <div className="space-y-4">
                  {hotel.rooms.map((room, index) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedRoom === index
                          ? "ring-2 ring-secondary bg-secondary/10"
                          : "hover:bg-card/80"
                      }`}
                      onClick={() => setSelectedRoom(index)}
                    >
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-lg">{room.type}</h4>
                          <p className="text-sm text-muted">
                            Max capacity: {room.capacity} guests
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold">
                            ${room.price}
                          </span>
                          <span className="text-muted text-sm">/night</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sticky top-24"
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <span className="font-bold">
                      ${hotel.rooms[selectedRoom].price}
                    </span>
                    <span className="text-base font-normal text-muted">
                      /night
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted">
                        Check-in
                      </label>
                      <Input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted">
                        Check-out
                      </label>
                      <Input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted">
                      Guests
                    </label>
                    <Select
                      value={guests.toString()}
                      onValueChange={(value) =>
                        setGuests(Number.parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(hotel.rooms[selectedRoom].capacity)].map(
                          (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1} Guest{i > 0 ? "s" : ""}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button size="lg" className="w-full" onClick={handleBooking}>
                    Reserve
                  </Button>
                  <p className="text-xs text-muted text-center">
                    You won't be charged yet
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

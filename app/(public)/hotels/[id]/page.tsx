// app/hotel/[id]/page.tsx

"use client";

import { useState, useEffect } from "react";
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
import { toast } from "sonner"; // FIX: Import toast for notifications
import { Star, MapPin, ArrowLeft, Check, MapPinOff, X } from "lucide-react";
import { motion } from "framer-motion";

// FIX: Added one more hotel for variety
const hotels = [
  {
    id: 1,
    name: "The Ocean Pearl Resort",
    location: "Maldives",
    rating: 4.9,
    reviews: 1247,
    price: 850,
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
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
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
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
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
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
    name: "Kyoto Serenity Garden",
    location: "Kyoto, Japan",
    rating: 4.9,
    reviews: 987,
    price: 550,
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
    ],
    amenities: [
      "Onsen (Hot Spring)",
      "Zen Garden",
      "Tea House",
      "Free WiFi",
      "Restaurant",
      "Spa",
      "Concierge",
      "Tatami Rooms",
    ],
    badge: "Cultural Gem",
    description:
      "Find tranquility at Kyoto Serenity Garden, a traditional Ryokan-style hotel. Experience authentic Japanese hospitality with serene gardens, a calming onsen, and beautifully designed tatami rooms.",
    rooms: [
      { type: "Garden View Tatami", price: 550, capacity: 2 },
      { type: "Suite with Onsen", price: 850, capacity: 3 },
      { type: "Imperial Suite", price: 1400, capacity: 5 },
    ],
  },
];
export default function HotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0); // FIX: State for total price
  const [isGalleryOpen, setIsGalleryOpen] = useState(false); // FIX: State for gallery modal

  const hotel = hotels.find(
    (h) => h.id === Number.parseInt(params.id as string)
  );

  // FIX: Calculate total price whenever dates or room selection change
  useEffect(() => {
    if (checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      if (endDate > startDate) {
        const timeDiff = endDate.getTime() - startDate.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setTotalPrice(days * hotel!.rooms[selectedRoom].price);
      } else {
        setTotalPrice(0); // Reset if dates are invalid
      }
    }
  }, [checkIn, checkOut, selectedRoom, hotel]);

  // FIX: Adjust guest count if the selected room has a lower capacity
  useEffect(() => {
    if (hotel) {
      const maxCapacity = hotel.rooms[selectedRoom].capacity;
      if (guests > maxCapacity) {
        setGuests(maxCapacity);
      }
    }
  }, [selectedRoom, hotel, guests]);

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
            We couldn't find the hotel you were looking for.
          </p>
          <Button size="lg" onClick={() => router.push("/")} variant={"ghost"}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select a check-in and check-out date.");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      toast.error("Check-out date must be after the check-in date.");
      return;
    }

    const isLoggedIn = true; // Replace with your actual auth check

    if (!isLoggedIn) {
      router.push("/auth/login?redirect=/hotel/" + hotel.id);
    } else {
      // FIX: Use a toast notification instead of an alert
      toast.success("Booking Confirmed!", {
        description: `Your stay at ${hotel.name} in a ${hotel.rooms[selectedRoom].type} is confirmed.`,
        duration: 5000,
      });
    }
  };

  // FIX: Get today's date for min attribute on date inputs
  const today = new Date().toISOString().split("T")[0];

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
            className="mb-4 text-muted-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to results
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {hotel.name}
          </h1>
          <div className="flex items-center text-muted-foreground mt-2 text-lg">
            <MapPin className="w-5 h-5 mr-2" />
            {hotel.location}
          </div>
        </motion.div>

        {/* --- DYNAMIC IMAGE GALLERY (FIX) --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] mb-12"
        >
          <div
            className="col-span-4 md:col-span-2 row-span-2 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setIsGalleryOpen(true)}
          >
            <img
              // src={hotel.images[0]}
              src={"https://placehold.co/600x400"}
              alt={hotel.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          {hotel.images.slice(1, 4).map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg col-span-2 md:col-span-1 cursor-pointer"
              onClick={() => setIsGalleryOpen(true)}
            >
              <img
                src={image}
                alt={`${hotel.name} ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
          <div className="overflow-hidden rounded-lg col-span-2 md:col-span-1 relative">
            <img
              src={hotel.images[4] || hotel.images[0]}
              alt={`${hotel.name} extra`}
              className="w-full h-full object-cover"
            />
            <Button
              onClick={() => setIsGalleryOpen(true)}
              className="absolute inset-0 w-full h-full bg-black/40 text-white text-lg hover:bg-black/60 transition-colors"
            >
              Show all photos
            </Button>
          </div>
        </motion.div>

        {/* Main Content (Rest of the page is the same, with booking card updated below) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
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
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {hotel.description}
                </p>
              </div>

              <div className="border-b pb-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4">
                  What this place offers
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {hotel.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-secondary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

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
                          <p className="text-sm text-muted-foreground">
                            Max capacity: {room.capacity} guests
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold">
                            ${room.price}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            /night
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- UPDATED BOOKING CARD (FIX) --- */}
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
                    <span className="text-base font-normal text-muted-foreground">
                      /night
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">
                        Check-in
                      </label>
                      <Input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={today}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">
                        Check-out
                      </label>
                      <Input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn || today}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
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

                  {/* Total price calculation */}
                  {totalPrice > 0 && (
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-muted-foreground">
                        <span>
                          ${hotel.rooms[selectedRoom].price} x{" "}
                          {Math.ceil(
                            Math.abs(
                              new Date(checkOut).getTime() -
                                new Date(checkIn).getTime()
                            ) /
                              (1000 * 3600 * 24)
                          )}{" "}
                          nights
                        </span>
                        <span>${totalPrice}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-2">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>
                  )}

                  <Button size="lg" className="w-full" onClick={handleBooking}>
                    Reserve
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    You won't be charged yet
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- GALLERY MODAL (FIX) --- */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsGalleryOpen(false)}
        >
          <div
            className="relative bg-background rounded-lg p-4 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10"
              onClick={() => setIsGalleryOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <h2 className="text-2xl font-bold mb-4">Photos of {hotel.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hotel.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${hotel.name} view ${index + 1}`}
                  className="w-full h-auto object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

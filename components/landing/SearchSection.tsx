"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import the router
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner"; // Optional: for user feedback

export function SearchSection() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const router = useRouter(); // Initialize the router

  // Function to handle the search click
  const handleSearch = () => {
    // Basic validation
    if (!destination.trim()) {
      // Using toast for better UX, but an alert would also work
      toast.error("Please enter a destination to search.");
      return;
    }

    // Create a URLSearchParams object to build the query string
    const params = new URLSearchParams();
    params.append("destination", destination);
    if (checkIn) params.append("checkIn", checkIn);
    if (checkOut) params.append("checkOut", checkOut);
    params.append("guests", guests);

    // Navigate to the hotels page with the query parameters
    router.push(`/hotels?${params.toString()}`);
  };

  return (
    <section className="py-16 bg-background relative -mt-20 z-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-6xl mx-auto p-6 shadow-2xl border-2 bg-white text-black">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Destination */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Destination
                </label>
                <Input
                  placeholder="Where to?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-12 placeholder:text-black"
                />
              </div>

              {/* Check-in */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Check-in
                </label>
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Check-out */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Check-out
                </label>
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Guests & Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Guests
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="h-12 flex-1"
                  />
                  <Button
                    size="lg"
                    className="h-12 px-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    onClick={handleSearch} // Add the onClick handler here
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

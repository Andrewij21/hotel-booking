"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const searchFormSchema = z.object({
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  guests: z.string().min(1, "Number of guests is required"),
  rooms: z.string().min(1, "Number of rooms is required"),
});

const destinations = [
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
  // Add other destinations...
];

export default function DestinationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const destinationId = Number.parseInt(params.id as string);

  const destination =
    destinations.find((d) => d.id === destinationId) || destinations[0];

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      checkIn: "",
      checkOut: "",
      guests: "2",
      rooms: "1",
    },
  });

  function onSubmit(values: z.infer<typeof searchFormSchema>) {
    console.log("[v0] Search form submitted:", values);
    router.push(
      `/hotels?destination=${destinationId}&checkIn=${values.checkIn}&checkOut=${values.checkOut}&guests=${values.guests}&rooms=${values.rooms}`
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Destinations
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-96 rounded-lg overflow-hidden mb-6">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium border border-white/20">
                <Star className="w-4 h-4 inline mr-1 fill-yellow-400 text-yellow-400" />
                {destination.rating}
              </div>
            </div>

            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {destination.country}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {destination.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {destination.longDescription}
            </p>
            <div className="text-sm font-medium text-secondary">
              {destination.hotels} luxury hotels available
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Search Hotels</h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Check-in</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="checkOut"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Check-out</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guests</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select guests" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 Guest</SelectItem>
                              <SelectItem value="2">2 Guests</SelectItem>
                              <SelectItem value="3">3 Guests</SelectItem>
                              <SelectItem value="4">4 Guests</SelectItem>
                              <SelectItem value="5">5+ Guests</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rooms</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select rooms" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 Room</SelectItem>
                              <SelectItem value="2">2 Rooms</SelectItem>
                              <SelectItem value="3">3 Rooms</SelectItem>
                              <SelectItem value="4">4+ Rooms</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Search Hotels
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

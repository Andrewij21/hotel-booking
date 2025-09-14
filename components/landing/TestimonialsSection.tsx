"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    text: "Absolutely incredible experience! The attention to detail and service quality exceeded all expectations. The ocean view from our suite was breathtaking.",
    avatar: "/professional-woman-smiling-headshot.png",
    hotel: "The Ocean Pearl Resort",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    text: "LuxeStay made our anniversary trip unforgettable. The booking process was seamless, and the hotel recommendations were spot-on. Highly recommended!",
    avatar: "/placeholder-h5ks2.png",
    hotel: "Alpine Luxury Lodge",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Madrid, Spain",
    rating: 5,
    text: "The perfect blend of luxury and comfort. Every detail was thoughtfully arranged, from the welcome amenities to the personalized concierge service.",
    avatar: "/placeholder-edhkw.png",
    hotel: "Urban Skyline Hotel",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            What Our Guests Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Real experiences from travelers who chose LuxeStay for their luxury
            getaways
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-background ">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-secondary mb-2" />
                  </div>

                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-muted mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted">
                        {testimonial.location}
                      </div>
                      <div className="text-xs text-secondary font-medium">
                        {testimonial.hotel}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-foreground mb-2">50K+</div>
            <div className="text-muted">Happy Guests</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground mb-2">500+</div>
            <div className="text-muted">Luxury Hotels</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground mb-2">150+</div>
            <div className="text-muted">Destinations</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground mb-2">4.9</div>
            <div className="text-muted">Average Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

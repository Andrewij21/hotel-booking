"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/luxury-hotel-room-with-ocean-view-at-sunset.jpg"
          alt="Luxury hotel room"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
          >
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">
              Trusted by 50,000+ travelers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance"
          >
            Discover Your Perfect
            <span className="block text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
              Luxury Escape
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto text-pretty"
          >
            Experience world-class accommodations, exceptional service, and
            unforgettable moments at handpicked luxury hotels around the globe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 text-lg group"
            >
              Explore Hotels
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg bg-transparent"
            >
              Watch Video
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 150 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex items-center space-x-8 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4"
        >
          <div className="text-center">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm text-gray-300">Luxury Hotels</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold">150+</div>
            <div className="text-sm text-gray-300">Destinations</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold">4.9</div>
            <div className="text-sm text-gray-300">Guest Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

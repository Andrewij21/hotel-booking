"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-secondary-foreground" />
              </div>
              <span className="text-xl font-bold">LuxeStay</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 leading-relaxed">
              Your gateway to extraordinary luxury accommodations worldwide.
              Experience the finest hotels with unmatched service and comfort.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:text-secondary"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:text-secondary"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:text-secondary"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:text-secondary"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#hotels"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Hotels
                </a>
              </li>
              <li>
                <a
                  href="#destinations"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#help"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Booking Support
                </a>
              </li>
              <li>
                <a
                  href="#cancellation"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-primary-foreground/80 mb-4">
              Subscribe to get exclusive deals and travel inspiration.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-primary-foreground/20 mt-12 pt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Phone className="w-4 h-4" />
              <span className="text-primary-foreground/80">
                +1 (555) 123-4567
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Mail className="w-4 h-4" />
              <span className="text-primary-foreground/80">
                hello@luxestay.com
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="text-primary-foreground/80">
                New York, NY 10001
              </span>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-primary-foreground/20 mt-8 pt-8 text-center"
        >
          <p className="text-primary-foreground/60">
            © 2024 LuxeStay. All rights reserved. Crafted with care for luxury
            travelers.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

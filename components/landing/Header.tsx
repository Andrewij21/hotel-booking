"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, User, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      const email = localStorage.getItem("userEmail") || "";
      const name = email.split("@")[0] || "User";
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    }
  }, []);

  const handleSignIn = () => {
    if (isLoggedIn) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      setIsLoggedIn(false);
      setUserName("");
    } else {
      router.push("/login");
    }
  };

  const handleReserveHistory = () => {
    router.push("/reservations");
  };

  const handleUserProfile = () => {
    router.push("/profile");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => router.push("/")}
          >
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-secondary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">LuxeStay</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#hotels"
              className="text-foreground hover:text-secondary transition-colors"
            >
              Hotels
            </a>
            <a
              href="#destinations"
              className="text-foreground hover:text-secondary transition-colors"
            >
              Destinations
            </a>
            <a
              href="#about"
              className="text-foreground hover:text-secondary transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-foreground hover:text-secondary transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-secondary-foreground flex items-center space-x-2"
                  onClick={handleUserProfile}
                >
                  <User className="w-4 h-4" />
                  <span>{userName}</span>
                </Button>
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-secondary-foreground flex items-center space-x-2"
                  onClick={handleReserveHistory}
                >
                  <History className="w-4 h-4" />
                  <span>Reserve History</span>
                </Button>
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-secondary-foreground"
                  onClick={handleSignIn}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-secondary-foreground"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border"
            >
              <nav className="py-4 space-y-4">
                <Link
                  href="#hotels"
                  className="block text-foreground hover:text-secondary transition-colors"
                >
                  Hotels
                </Link>
                <Link
                  href="#destinations"
                  className="block text-foreground hover:text-secondary transition-colors"
                >
                  Destinations
                </Link>
                <Link
                  href="#about"
                  className="block text-foreground hover:text-secondary transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#contact"
                  className="block text-foreground hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
                <div className="pt-4 space-y-2">
                  {isLoggedIn ? (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-foreground hover:text-secondary flex items-center space-x-2"
                        onClick={handleUserProfile}
                      >
                        <User className="w-4 h-4" />
                        <span>{userName}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-foreground hover:text-secondary flex items-center space-x-2"
                        onClick={handleReserveHistory}
                      >
                        <History className="w-4 h-4" />
                        <span>Reserve History</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-foreground hover:text-secondary"
                        onClick={handleSignIn}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-foreground hover:text-secondary"
                        onClick={handleSignIn}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground flex items-center justify-center space-x-2"
                        onClick={handleReserveHistory}
                      >
                        <History className="w-4 h-4" />
                        <span>Reserve History</span>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

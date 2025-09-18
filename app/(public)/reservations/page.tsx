"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Star, ArrowLeft } from "lucide-react";

interface Reservation {
  id: string;
  hotelName: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "confirmed" | "pending" | "cancelled";
  totalPrice: string;
  bookingDate: string;
  rating?: number;
}

export default function ReservationsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      router.push("/login");
      return;
    }

    setIsLoggedIn(true);

    // Load reservations from localStorage or set sample data
    const savedReservations = localStorage.getItem("userReservations");
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    } else {
      // Sample reservation data
      const sampleReservations: Reservation[] = [
        {
          id: "RES001",
          hotelName: "Conrad Maldives Rangali Island",
          destination: "Maldives",
          checkIn: "2024-03-15",
          checkOut: "2024-03-22",
          guests: 2,
          status: "confirmed",
          totalPrice: "$4,200",
          bookingDate: "2024-02-10",
          rating: 5,
        },
        {
          id: "RES002",
          hotelName: "The Ritz-Carlton Tokyo",
          destination: "Tokyo, Japan",
          checkIn: "2024-04-10",
          checkOut: "2024-04-15",
          guests: 1,
          status: "pending",
          totalPrice: "$1,800",
          bookingDate: "2024-02-20",
        },
        {
          id: "RES003",
          hotelName: "Burj Al Arab Jumeirah",
          destination: "Dubai, UAE",
          checkIn: "2024-01-20",
          checkOut: "2024-01-25",
          guests: 2,
          status: "cancelled",
          totalPrice: "$3,500",
          bookingDate: "2023-12-15",
        },
      ];
      setReservations(sampleReservations);
      localStorage.setItem(
        "userReservations",
        JSON.stringify(sampleReservations)
      );
    }
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Reservation History
            </h1>
            <p className="text-muted-foreground">
              View and manage your hotel bookings
            </p>
          </div>
          <Button variant="outline" onClick={() => router.push("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {reservations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No Reservations Yet
              </h3>
              <p className="text-muted-foreground mb-4">
                You haven't made any hotel reservations yet.
              </p>
              <Button onClick={() => router.push("/")}>Start Booking</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {reservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        {reservation.hotelName}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{reservation.destination}</span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(reservation.status)}>
                        {reservation.status.charAt(0).toUpperCase() +
                          reservation.status.slice(1)}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        Booking ID: {reservation.id}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Check-in</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(reservation.checkIn).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Check-out</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(reservation.checkOut).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Guests</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.guests}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Booked on{" "}
                          {new Date(
                            reservation.bookingDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      {reservation.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {reservation.rating}/5
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">
                        {reservation.totalPrice}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Price
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

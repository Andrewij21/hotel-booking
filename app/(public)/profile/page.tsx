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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    joinDate: "",
  });
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      router.push("/login");
      return;
    }

    setIsLoggedIn(true);

    // Load user profile from localStorage or set defaults
    const email = localStorage.getItem("userEmail") || "";
    const name = email.split("@")[0] || "User";
    const savedProfile = localStorage.getItem("userProfile");

    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      setUserProfile({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email,
        phone: "+1 (555) 123-4567",
        address: "123 Main St, City, State 12345",
        joinDate: new Date().toLocaleDateString(),
      });
    }
  }, [router]);

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    setIsEditing(false);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            User Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Personal Information</span>
              </CardTitle>
              <CardDescription>
                Your account details and contact information
              </CardDescription>
            </div>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={userProfile.name}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, name: e.target.value })
                    }
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{userProfile.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{userProfile.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={userProfile.phone}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, phone: e.target.value })
                    }
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{userProfile.phone}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="joinDate">Member Since</Label>
                <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{userProfile.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={userProfile.address}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, address: e.target.value })
                  }
                />
              ) : (
                <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{userProfile.address}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

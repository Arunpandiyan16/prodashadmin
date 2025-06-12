
"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserCircle, Edit3, Camera, Shield, Bell, Settings as SettingsIcon } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export default function ProfilePage() {
  const [user, setUser] = React.useState({
    name: "Admin User",
    email: "admin@example.com",
    bio: "Full-stack developer with a passion for creating intuitive and dynamic user experiences. Loves coding in React and Next.js.",
    avatarUrl: "https://placehold.co/128x128.png",
    initials: "AU",
  });
  const [isEditing, setIsEditing] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically send the updated user data to your backend
    console.log("Profile updated:", user);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <UserCircle className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">User Profile</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader className="items-center text-center">
            <div className="relative group mb-4">
              <Avatar className="h-32 w-32 border-4 border-card shadow-md">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar large" />
                <AvatarFallback className="text-4xl">{user.initials}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="icon" className="absolute bottom-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background">
                <Camera className="h-5 w-5" />
                <span className="sr-only">Change_avatar</span>
              </Button>
            </div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" className="w-full mb-2">View Public Profile</Button>
            <Button variant="default" className="w-full" onClick={() => setIsEditing(!isEditing)}>
              <Edit3 className="mr-2 h-4 w-4" /> {isEditing ? "Cancel Editing" : "Edit Profile"}
            </Button>
          </CardContent>
        </Card>

        {/* Profile Form/Details Card */}
        <Card className="md:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Manage your personal information and account settings.</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={user.name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" name="bio" value={user.bio} onChange={handleInputChange} rows={4} placeholder="Tell us a little about yourself" />
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Full Name</h4>
                  <p className="text-foreground">{user.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Email Address</h4>
                  <p className="text-foreground">{user.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Bio</h4>
                  <p className="text-foreground whitespace-pre-line">{user.bio || "No bio provided."}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Settings Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Security</CardTitle>
             </div>
            <CardDescription>Manage your password and two-factor authentication.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button variant="outline">Change Password</Button>
             <div className="flex items-center justify-between">
                <Label htmlFor="2fa" className="flex flex-col space-y-1">
                  <span>Two-Factor Authentication</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Enhance your account security.
                  </span>
                </Label>
                <Switch id="2fa" />
              </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Notifications</CardTitle>
             </div>
            <CardDescription>Configure your notification preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch id="push-notifications" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cog, Globe, Palette, RefreshCw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Separator } from '@/components/ui/separator';

const primaryColorPresets = [
  { name: "Default Purple", primary: "258 36% 51%", accent: "232 39% 34%" },
  { name: "Oceanic Blue", primary: "210 70% 55%", accent: "190 60% 45%" },
  { name: "Forest Green", primary: "140 60% 45%", accent: "120 50% 35%" },
  { name: "Sunset Orange", primary: "30 90% 55%", accent: "15 80% 50%" },
];

export default function SettingsPage() {
  const [username, setUsername] = React.useState("Admin User");
  const [email, setEmail] = React.useState("admin@example.com");
  const [language, setLanguage] = React.useState("en");
  const [refreshInterval, setRefreshInterval] = React.useState("15min");

  // State for appearance customization
  const [currentPrimary, setCurrentPrimary] = React.useState<string | null>(null);
  const [currentAccent, setCurrentAccent] = React.useState<string | null>(null);
  const [currentRadius, setCurrentRadius] = React.useState<number | null>(null);
  const [initialRadius, setInitialRadius] = React.useState<number>(0.5); // Default if CSS var not found

  const handleAccountSave = () => {
    console.log("Account settings saved:", { username, email });
  };

  const handleApplicationSave = () => {
    console.log("Application settings saved:", { language, refreshInterval });
  };

  const applyColorPreset = (primary: string, accent: string) => {
    setCurrentPrimary(primary);
    setCurrentAccent(accent);
  };

  const handleRadiusChange = (value: number[]) => {
    setCurrentRadius(value[0]);
  };
  
  const resetAppearance = () => {
    setCurrentPrimary(null);
    setCurrentAccent(null);
    setCurrentRadius(null); // This will trigger useEffect to remove inline styles
    // Force removal of inline styles if any were manually uncleared by useEffect returning before null set
    // or if initial styles need to be restored cleanly
    document.documentElement.style.removeProperty('--primary');
    document.documentElement.style.removeProperty('--accent');
    document.documentElement.style.removeProperty('--radius');
    // Re-read initial radius in case it was from CSS and needs to be reapplied by slider state
     if (typeof window !== 'undefined') {
      const radiusFromCSS = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--radius'));
      setCurrentRadius(isNaN(radiusFromCSS) ? initialRadius : radiusFromCSS);
    }
  };

  React.useEffect(() => {
    const docStyle = document.documentElement.style;
    if (currentPrimary) docStyle.setProperty('--primary', currentPrimary); else docStyle.removeProperty('--primary');
    if (currentAccent) docStyle.setProperty('--accent', currentAccent); else docStyle.removeProperty('--accent');
    if (currentRadius !== null) docStyle.setProperty('--radius', `${currentRadius}rem`); else docStyle.removeProperty('--radius');
    
    return () => {
        // More robust cleanup: always attempt to remove these specific properties if they were potentially set.
        // This avoids issues if the component unmounts while a value is set.
        docStyle.removeProperty('--primary');
        docStyle.removeProperty('--accent');
        docStyle.removeProperty('--radius');
    };
  }, [currentPrimary, currentAccent, currentRadius]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const radiusFromCSS = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--radius'));
      const validRadius = isNaN(radiusFromCSS) ? 0.5 : radiusFromCSS; // Default to 0.5 if CSS var is not a number
      setInitialRadius(validRadius);
      if (currentRadius === null) { // Only set if not already customized by user action
        setCurrentRadius(validRadius);
      }
    }
  }, []);


  return (
    <div className="flex flex-col gap-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cog className="h-6 w-6 text-primary" />
            <CardTitle>Account Settings</CardTitle>
          </div>
          <CardDescription>Manage your personal account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <Button onClick={handleAccountSave}>Save Account Changes</Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            <CardTitle>Application Settings</CardTitle>
          </div>
          <CardDescription>Configure application-wide preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="language">Language Preference</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es" disabled>Spanish (Coming Soon)</SelectItem>
                <SelectItem value="fr" disabled>French (Coming Soon)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="refreshInterval">Data Refresh Interval</Label>
            <Select value={refreshInterval} onValueChange={setRefreshInterval}>
              <SelectTrigger id="refreshInterval">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5min">5 Minutes</SelectItem>
                <SelectItem value="15min">15 Minutes</SelectItem>
                <SelectItem value="30min">30 Minutes</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleApplicationSave}>Save Preferences</Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-6 w-6 text-primary" />
            <CardTitle>Appearance Settings (Live Preview)</CardTitle>
          </div>
          <CardDescription>
            Experiment with the application's look and feel. Changes made here are applied live for your current session only and will reset on page refresh or when you navigate away.
            The 'Save Appearance' button below is for demonstration; actual persistence would require further development (e.g., saving to user preferences).
            For permanent, global theme definitions, developers should edit <code>src/app/globals.css</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium">Theme Color Presets</Label>
            <p className="text-sm text-muted-foreground mb-3">Select a primary and accent color scheme to preview.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {primaryColorPresets.map(preset => (
                <Button 
                  key={preset.name} 
                  variant="outline"
                  onClick={() => applyColorPreset(preset.primary, preset.accent)}
                  className="w-full justify-start"
                >
                   <span style={{ backgroundColor: `hsl(${preset.primary})` }} className="w-4 h-4 rounded-full mr-2 border"/>
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <Label htmlFor="radius-slider" className="text-base font-medium">
              Border Radius Preview: <span className="font-normal text-muted-foreground">{currentRadius !== null ? currentRadius.toFixed(1) : initialRadius.toFixed(1)}rem</span>
            </Label>
            <p className="text-sm text-muted-foreground mb-3">Adjust the roundness of UI elements for this session.</p>
            <Slider
                id="radius-slider"
                min={0}
                max={1.5}
                step={0.1}
                value={[currentRadius ?? initialRadius]} 
                onValueChange={handleRadiusChange}
            />
          </div>
          <Separator />
           <div className="flex items-center gap-2">
             <Button onClick={resetAppearance} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset to Defaults
             </Button>
            <Button disabled title="Conceptual: Requires implementation for persistence">Save Appearance (Demo)</Button>
          </div>
           <div className="p-4 border rounded-md bg-card space-y-2">
             <h4 className="font-medium text-card-foreground">Preview Elements</h4>
             <div className="flex gap-2 items-center flex-wrap">
                <Button size="sm">Primary Button</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <span className="p-2 bg-accent text-accent-foreground rounded-md text-xs">Accent Box</span>
             </div>
             <p className="text-primary text-sm">This text uses the primary color.</p>
             <Input placeholder="Input field with current radius" />
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

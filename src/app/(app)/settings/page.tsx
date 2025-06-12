
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

// Helper function to convert HEX to HSL string "H S% L%"
function hexToHslString(hex: string): string {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  } else {
    return "0 0% 0%"; // Default to black if invalid hex
  }

  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return `${h} ${s}% ${l}%`;
}

// Helper function to convert HSL string "H S% L%" to HEX
function hslStringToHex(hslString: string): string {
  const [hStr, sStr, lStr] = hslString.split(" ");
  let h = parseFloat(hStr);
  let s = parseFloat(sStr.replace('%', '')) / 100;
  let l = parseFloat(lStr.replace('%', '')) / 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}


export default function SettingsPage() {
  const [username, setUsername] = React.useState("Admin User");
  const [email, setEmail] = React.useState("admin@example.com");
  const [language, setLanguage] = React.useState("en");
  const [refreshInterval, setRefreshInterval] = React.useState("15min");

  // State for appearance customization
  const [currentPrimaryHsl, setCurrentPrimaryHsl] = React.useState<string | null>(null);
  const [currentAccentHsl, setCurrentAccentHsl] = React.useState<string | null>(null);
  const [pickerPrimaryHex, setPickerPrimaryHex] = React.useState("#6750A4"); // Default hex
  const [pickerAccentHex, setPickerAccentHex] = React.useState("#343D79"); // Default hex

  const [currentRadius, setCurrentRadius] = React.useState<number | null>(null);
  const [initialRadius, setInitialRadius] = React.useState<number>(0.5);
  const [initialPrimaryHsl, setInitialPrimaryHsl] = React.useState<string | null>(null);
  const [initialAccentHsl, setInitialAccentHsl] = React.useState<string | null>(null);


  const handleAccountSave = () => {
    console.log("Account settings saved:", { username, email });
  };

  const handleApplicationSave = () => {
    console.log("Application settings saved:", { language, refreshInterval });
  };

  const applyColorPreset = (primaryHsl: string, accentHsl: string) => {
    setCurrentPrimaryHsl(primaryHsl);
    setCurrentAccentHsl(accentHsl);
    setPickerPrimaryHex(hslStringToHex(primaryHsl));
    setPickerAccentHex(hslStringToHex(accentHsl));
  };

  const handlePrimaryColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setPickerPrimaryHex(newHex);
    setCurrentPrimaryHsl(hexToHslString(newHex));
  };

  const handleAccentColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setPickerAccentHex(newHex);
    setCurrentAccentHsl(hexToHslString(newHex));
  };

  const handleRadiusChange = (value: number[]) => {
    setCurrentRadius(value[0]);
  };
  
  const resetAppearance = () => {
    setCurrentPrimaryHsl(initialPrimaryHsl);
    setCurrentAccentHsl(initialAccentHsl);
    setCurrentRadius(initialRadius); // Reset to the actual initial radius
    if (initialPrimaryHsl) setPickerPrimaryHex(hslStringToHex(initialPrimaryHsl));
    if (initialAccentHsl) setPickerAccentHex(hslStringToHex(initialAccentHsl));
  };
  
  React.useEffect(() => {
    // On component mount, read initial theme values from CSS
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      
      const radiusFromCSS = parseFloat(computedStyle.getPropertyValue('--radius'));
      const validRadius = isNaN(radiusFromCSS) ? 0.5 : radiusFromCSS;
      setInitialRadius(validRadius);
      if (currentRadius === null) setCurrentRadius(validRadius);

      const primaryHslFromCSS = computedStyle.getPropertyValue('--primary').trim();
      const accentHslFromCSS = computedStyle.getPropertyValue('--accent').trim();

      if (primaryHslFromCSS) {
        setInitialPrimaryHsl(primaryHslFromCSS);
        if (currentPrimaryHsl === null) setCurrentPrimaryHsl(primaryHslFromCSS);
        setPickerPrimaryHex(hslStringToHex(primaryHslFromCSS));
      }
      if (accentHslFromCSS) {
        setInitialAccentHsl(accentHslFromCSS);
        if (currentAccentHsl === null) setCurrentAccentHsl(accentHslFromCSS);
        setPickerAccentHex(hslStringToHex(accentHslFromCSS));
      }
    }
  }, []);


  React.useEffect(() => {
    const docStyle = document.documentElement.style;
    if (currentPrimaryHsl) {
      docStyle.setProperty('--primary', currentPrimaryHsl);
    } else if (initialPrimaryHsl) {
      docStyle.setProperty('--primary', initialPrimaryHsl);
    } else {
      docStyle.removeProperty('--primary');
    }

    if (currentAccentHsl) {
      docStyle.setProperty('--accent', currentAccentHsl);
    } else if (initialAccentHsl) {
      docStyle.setProperty('--accent', initialAccentHsl);
    } else {
      docStyle.removeProperty('--accent');
    }
    
    if (currentRadius !== null) {
      docStyle.setProperty('--radius', `${currentRadius}rem`);
    } else {
       docStyle.setProperty('--radius', `${initialRadius}rem`);
    }
    
    return () => {
        if (initialPrimaryHsl) docStyle.setProperty('--primary', initialPrimaryHsl); else docStyle.removeProperty('--primary');
        if (initialAccentHsl) docStyle.setProperty('--accent', initialAccentHsl); else docStyle.removeProperty('--accent');
        docStyle.setProperty('--radius', `${initialRadius}rem`);
    };
  }, [currentPrimaryHsl, currentAccentHsl, currentRadius, initialPrimaryHsl, initialAccentHsl, initialRadius]);


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
            Experiment with the application's look and feel. Changes made here (primary color, accent color, border radius) are applied live for your current session only and will reset on page refresh or when you navigate away, reverting to the theme defined in <code>src/app/globals.css</code>.
            The 'Save Appearance' button below is for demonstration; actual persistence would require further development (e.g., saving to user preferences).
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

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="primary-color-picker" className="text-base font-medium">Custom Primary Color</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="color" 
                  id="primary-color-picker" 
                  value={pickerPrimaryHex} 
                  onChange={handlePrimaryColorPickerChange}
                  className="p-1 h-10 w-14"
                />
                <span className="text-sm text-muted-foreground">{pickerPrimaryHex} (HSL: {currentPrimaryHsl || "N/A"})</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accent-color-picker" className="text-base font-medium">Custom Accent Color</Label>
               <div className="flex items-center gap-2">
                <Input 
                  type="color" 
                  id="accent-color-picker" 
                  value={pickerAccentHex} 
                  onChange={handleAccentColorPickerChange}
                  className="p-1 h-10 w-14"
                />
                <span className="text-sm text-muted-foreground">{pickerAccentHex} (HSL: {currentAccentHsl || "N/A"})</span>
              </div>
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

    

"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cog, Globe, Palette, RefreshCw, DollarSign } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Separator } from '@/components/ui/separator';

const primaryColorPresets = [
  { name: "Default Purple", primary: "258 36% 51%", accent: "232 39% 34%" },
  { name: "Oceanic Blue", primary: "210 70% 55%", accent: "190 60% 45%" },
  { name: "Forest Green", primary: "140 60% 45%", accent: "120 50% 35%" },
  { name: "Sunset Orange", primary: "30 90% 55%", accent: "15 80% 50%" },
];

// Helper function to parse HSL string "H S% L%" or "H S L"
function parseHslString(hslString?: string | null): { h: number; s: number; l: number } | null {
  if (!hslString) return null;
  const parts = hslString.trim().replace(/%/g, "").split(/\s+/);
  if (parts.length !== 3) return null;
  const [h, s, l] = parts.map(parseFloat);
  if (isNaN(h) || isNaN(s) || isNaN(l)) return null;
  return { h, s, l };
}

// Helper function to convert HSL object to string "H S% L%"
function hslToString(hsl: { h: number; s: number; l: number }): string {
  return `${Math.round(hsl.h)} ${Math.round(hsl.s)}% ${Math.round(hsl.l)}%`;
}

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
    return "0 0% 0%"; 
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
  const parsed = parseHslString(hslString);
  if (!parsed) return "#000000";
  let {h,s,l} = parsed;

  s /= 100;
  l /= 100;

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

// Derives a contrasting foreground color (light/dark)
function deriveForegroundColor(backgroundHsl: { h: number; s: number; l: number }): { h: number; s: number; l: number } {
  if (backgroundHsl.l > 55) { 
    return { h: backgroundHsl.h, s: Math.min(100, backgroundHsl.s + 5), l: Math.max(0, backgroundHsl.l - 40 > 15 ? backgroundHsl.l - 40: 10) }; 
  } else { 
    return { h: 0, s: 0, l: 95 }; 
  }
}


export default function SettingsPage() {
  const [username, setUsername] = React.useState("Admin User");
  const [email, setEmail] = React.useState("admin@example.com");
  const [language, setLanguage] = React.useState("en");
  const [currency, setCurrency] = React.useState("USD");
  const [refreshInterval, setRefreshInterval] = React.useState("15min");

  const [currentPrimaryHsl, setCurrentPrimaryHsl] = React.useState<string | null>(null);
  const [currentAccentHsl, setCurrentAccentHsl] = React.useState<string | null>(null);
  const [pickerPrimaryHex, setPickerPrimaryHex] = React.useState("#6750A4"); 
  const [pickerAccentHex, setPickerAccentHex] = React.useState("#343D79"); 

  const [currentRadius, setCurrentRadius] = React.useState<number | null>(null);
  
  const [initialValues, setInitialValues] = React.useState<{
    primary: string | null;
    primaryForeground: string | null;
    secondary: string | null;
    secondaryForeground: string | null;
    accent: string | null;
    accentForeground: string | null;
    ring: string | null;
    radius: number;
  }>({
    primary: null, primaryForeground: null, secondary: null, secondaryForeground: null,
    accent: null, accentForeground: null, ring: null, radius: 0.5
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem('userCurrency');
      if (savedCurrency) {
        setCurrency(savedCurrency);
      }
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userCurrency', currency);
    }
  }, [currency]);


  const handleAccountSave = () => {
    console.log("Account settings saved:", { username, email });
  };

  const handleApplicationSave = () => {
    console.log("Application settings saved:", { language, currency, refreshInterval });
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
    setCurrentPrimaryHsl(initialValues.primary);
    setCurrentAccentHsl(initialValues.accent);
    setCurrentRadius(initialValues.radius); 
    
    if (initialValues.primary) setPickerPrimaryHex(hslStringToHex(initialValues.primary));
    if (initialValues.accent) setPickerAccentHex(hslStringToHex(initialValues.accent));
  };
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      const initialPrimary = computedStyle.getPropertyValue('--primary').trim();
      const initialPrimaryFg = computedStyle.getPropertyValue('--primary-foreground').trim();
      const initialSecondary = computedStyle.getPropertyValue('--secondary').trim();
      const initialSecondaryFg = computedStyle.getPropertyValue('--secondary-foreground').trim();
      const initialAccent = computedStyle.getPropertyValue('--accent').trim();
      const initialAccentFg = computedStyle.getPropertyValue('--accent-foreground').trim();
      const initialRing = computedStyle.getPropertyValue('--ring').trim();
      const radiusFromCSS = parseFloat(computedStyle.getPropertyValue('--radius'));
      const validRadius = isNaN(radiusFromCSS) ? 0.5 : radiusFromCSS;

      setInitialValues({
        primary: initialPrimary,
        primaryForeground: initialPrimaryFg,
        secondary: initialSecondary,
        secondaryForeground: initialSecondaryFg,
        accent: initialAccent,
        accentForeground: initialAccentFg,
        ring: initialRing,
        radius: validRadius,
      });

      if (currentPrimaryHsl === null) setCurrentPrimaryHsl(initialPrimary);
      if (currentAccentHsl === null) setCurrentAccentHsl(initialAccent);
      if (currentRadius === null) setCurrentRadius(validRadius);
      
      if (initialPrimary) setPickerPrimaryHex(hslStringToHex(initialPrimary));
      if (initialAccent) setPickerAccentHex(hslStringToHex(initialAccent));
    }
  }, []);


  React.useEffect(() => {
    const docStyle = document.documentElement.style;
    const propertiesToClean = [
        '--primary', '--primary-foreground', 
        '--secondary', '--secondary-foreground',
        '--accent', '--accent-foreground',
        '--ring', '--radius'
    ];

    if (currentPrimaryHsl) {
      docStyle.setProperty('--primary', currentPrimaryHsl);
      const primary = parseHslString(currentPrimaryHsl);
      if (primary) {
        const primaryFg = deriveForegroundColor(primary);
        docStyle.setProperty('--primary-foreground', hslToString(primaryFg));

        const secondary = { 
          h: primary.h, 
          s: Math.max(0, primary.s - 15), 
          l: primary.l > 50 ? Math.max(10, primary.l - 20) : Math.min(90, primary.l + 20) 
        };
        if (Math.abs(secondary.l - primary.l) < 10) { 
            secondary.l = primary.l > 50 ? primary.l - 25 : primary.l + 25;
            secondary.l = Math.max(0, Math.min(100, secondary.l));
        }
        docStyle.setProperty('--secondary', hslToString(secondary));
        
        const secondaryFg = deriveForegroundColor(secondary);
        docStyle.setProperty('--secondary-foreground', hslToString(secondaryFg));
        
        const ring = { h: primary.h, s: Math.min(100, primary.s + 10), l: Math.min(100, primary.l + 5) };
        docStyle.setProperty('--ring', hslToString(ring));
      }
    } else if (initialValues.primary) {
      docStyle.setProperty('--primary', initialValues.primary);
      if (initialValues.primaryForeground) docStyle.setProperty('--primary-foreground', initialValues.primaryForeground);
      if (initialValues.secondary) docStyle.setProperty('--secondary', initialValues.secondary);
      if (initialValues.secondaryForeground) docStyle.setProperty('--secondary-foreground', initialValues.secondaryForeground);
      if (initialValues.ring) docStyle.setProperty('--ring', initialValues.ring);
    } else {
        docStyle.removeProperty('--primary');
        docStyle.removeProperty('--primary-foreground');
        docStyle.removeProperty('--secondary');
        docStyle.removeProperty('--secondary-foreground');
        docStyle.removeProperty('--ring');
    }

    if (currentAccentHsl) {
      docStyle.setProperty('--accent', currentAccentHsl);
      const accent = parseHslString(currentAccentHsl);
      if (accent) {
        const accentFg = deriveForegroundColor(accent);
        docStyle.setProperty('--accent-foreground', hslToString(accentFg));
      }
    } else if (initialValues.accent) {
      docStyle.setProperty('--accent', initialValues.accent);
      if (initialValues.accentForeground) docStyle.setProperty('--accent-foreground', initialValues.accentForeground);
    } else {
        docStyle.removeProperty('--accent');
        docStyle.removeProperty('--accent-foreground');
    }
    
    if (currentRadius !== null) {
      docStyle.setProperty('--radius', `${currentRadius}rem`);
    } else {
       docStyle.setProperty('--radius', `${initialValues.radius}rem`);
    }
    
    return () => {
        propertiesToClean.forEach(prop => {
            const initialVal = initialValues[prop.substring(2) as keyof typeof initialValues];
            if (typeof initialVal === 'string' && initialVal) {
                 docStyle.setProperty(prop, initialVal);
            } else if (prop === '--radius') {
                 docStyle.setProperty(prop, `${initialValues.radius}rem`);
            }
            else {
                 docStyle.removeProperty(prop);
            }
        });
        docStyle.setProperty('--radius', `${initialValues.radius}rem`);
        if(initialValues.primary) docStyle.setProperty('--primary', initialValues.primary);
        if(initialValues.primaryForeground) docStyle.setProperty('--primary-foreground', initialValues.primaryForeground);
        if(initialValues.secondary) docStyle.setProperty('--secondary', initialValues.secondary);
        if(initialValues.secondaryForeground) docStyle.setProperty('--secondary-foreground', initialValues.secondaryForeground);
        if(initialValues.accent) docStyle.setProperty('--accent', initialValues.accent);
        if(initialValues.accentForeground) docStyle.setProperty('--accent-foreground', initialValues.accentForeground);
        if(initialValues.ring) docStyle.setProperty('--ring', initialValues.ring);
    };
  }, [currentPrimaryHsl, currentAccentHsl, currentRadius, initialValues]);


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
            <Label htmlFor="currency" className="flex items-center gap-1"><DollarSign size={16}/>Currency Preference</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
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
            Experiment with the application's look and feel. Changes made here (primary/accent colors, border radius) dynamically adjust several related theme colors (like foregrounds and secondary shades) for this session only based on your selections. These changes will reset on page refresh or when you navigate away, reverting to the theme defined in <code>src/app/globals.css</code>.
            The 'Save Appearance' button below is for demonstration; actual persistence would require further development.
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
              Border Radius Preview: <span className="font-normal text-muted-foreground">{currentRadius !== null ? currentRadius.toFixed(1) : initialValues.radius.toFixed(1)}rem</span>
            </Label>
            <p className="text-sm text-muted-foreground mb-3">Adjust the roundness of UI elements for this session.</p>
            <Slider
                id="radius-slider"
                min={0}
                max={1.5}
                step={0.1}
                value={[currentRadius ?? initialValues.radius]} 
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
    

    

    
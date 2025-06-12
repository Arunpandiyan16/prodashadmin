
"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Mail, Terminal, Users, ShieldCheck, Paintbrush, Settings2, Palette, RotateCcw, Baseline, Wallpaper, Square } from "lucide-react";
import Image from 'next/image';
import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';


type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
type ButtonSize = VariantProps<typeof buttonVariants>['size'];

const colorPresets = [
    { name: "Default Theme", primary: null, accent: null }, 
    { name: "Oceanic (Blue/Teal)", primary: "210 70% 55%", accent: "170 60% 45%" },
    { name: "Sunset (Orange/Red)", primary: "30 90% 55%", accent: "0 80% 60%" },
    { name: "Verdant (Green/Gold)", primary: "140 60% 45%", accent: "40 70% 50%" },
    { name: "Indigo & Pink", primary: "240 50% 50%", accent: "330 80% 70%" },
    { name: "Charcoal & Lime", primary: "210 10% 30%", accent: "90 70% 55%" },
];

const fontOptions = [
    { value: "system-default-font", label: "Default (Inter)" },
    { value: "Roboto, sans-serif", label: "Roboto" },
    { value: "Georgia, serif", label: "Georgia (Serif)" },
    { value: "Verdana, sans-serif", label: "Verdana" },
    { value: "Arial, sans-serif", label: "Arial" },
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
  if (hex.length === 4) { // #RGB
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) { // #RRGGBB
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
function hslStringToHex(hslString?: string | null): string {
  if (!hslString || typeof hslString !== 'string') return "#000000";
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
    const hexVal = Math.round(x * 255).toString(16);
    return hexVal.length === 1 ? '0' + hexVal : hexVal;
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


export default function UiElementsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const [buttonVariant, setButtonVariant] = React.useState<ButtonVariant>("default");
  const [buttonSize, setButtonSize] = React.useState<ButtonSize>("default");
  const [progressValue, setProgressValue] = React.useState(66);

  // State for playground overrides
  const [pgPrimaryHsl, setPgPrimaryHsl] = React.useState<string | null>(null);
  const [pgAccentHsl, setPgAccentHsl] = React.useState<string | null>(null);
  const [pgBackgroundHsl, setPgBackgroundHsl] = React.useState<string | null>(null);
  const [pgCardHsl, setPgCardHsl] = React.useState<string | null>(null);
  
  const [pgPickerPrimaryHex, setPgPickerPrimaryHex] = React.useState("#6750A4"); 
  const [pgPickerAccentHex, setPgPickerAccentHex] = React.useState("#343D79"); 
  const [pgPickerBackgroundHex, setPgPickerBackgroundHex] = React.useState("#E6E0EB");
  const [pgPickerCardHex, setPgPickerCardHex] = React.useState("#FFFFFF");

  const [pgRadius, setPgRadius] = React.useState<number | null>(null); 
  const [pgFontFamily, setPgFontFamily] = React.useState<string | null>(null); 

  
  const [initialThemeValuesFromCSS, setInitialThemeValuesFromCSS] = React.useState<{
    primary: string; primaryForeground: string;
    secondary: string; secondaryForeground: string;
    accent: string; accentForeground: string;
    background: string; foreground: string;
    card: string; cardForeground: string;
    ring: string; radius: number; fontFamily: string;
  }>({
    primary: "258 36% 51%", primaryForeground: "0 0% 100%",
    secondary: "262 28% 80%", secondaryForeground: "258 36% 30%",
    accent: "232 39% 34%", accentForeground: "0 0% 100%",
    background: "262 28% 90%", foreground: "258 10% 20%",
    card: "0 0% 100%", cardForeground: "258 10% 20%",
    ring: "258 36% 61%", radius: 0.5, fontFamily: "Inter, sans-serif",
  });


  const allButtonVariants: ButtonVariant[] = ["default", "destructive", "outline", "secondary", "ghost", "link"];
  const allButtonSizes: ButtonSize[] = ["default", "sm", "lg", "icon"];

  const applyPlaygroundColors = (primaryHsl: string | null, accentHsl: string | null) => {
    setPgPrimaryHsl(primaryHsl); 
    setPgAccentHsl(accentHsl);   

    if (primaryHsl) setPgPickerPrimaryHex(hslStringToHex(primaryHsl));
    else setPgPickerPrimaryHex(hslStringToHex(initialThemeValuesFromCSS.primary));

    if (accentHsl) setPgPickerAccentHex(hslStringToHex(accentHsl));
    else setPgPickerAccentHex(hslStringToHex(initialThemeValuesFromCSS.accent));
  };
  
  const handlePrimaryColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setPgPickerPrimaryHex(newHex);
    setPgPrimaryHsl(hexToHslString(newHex)); 
  };

  const handleAccentColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setPgPickerAccentHex(newHex);
    setPgAccentHsl(hexToHslString(newHex)); 
  };

  const handleBackgroundColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setPgPickerBackgroundHex(newHex);
    setPgBackgroundHsl(hexToHslString(newHex));
  };

  const handleCardColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setPgPickerCardHex(newHex);
    setPgCardHsl(hexToHslString(newHex));
  };

  const handlePlaygroundFontChange = (selectedValue: string) => {
    if (selectedValue === "system-default-font") {
      setPgFontFamily(null);
    } else {
      setPgFontFamily(selectedValue);
    }
  };
  
  const handlePlaygroundRadiusChange = (value: number[]) => {
    setPgRadius(value[0]);
  };

  const resetPlaygroundOverrides = () => {
    setPgPrimaryHsl(null);
    setPgAccentHsl(null);
    setPgBackgroundHsl(null);
    setPgCardHsl(null);
    setPgRadius(null); 
    setPgFontFamily(null);
    
    setPgPickerPrimaryHex(hslStringToHex(initialThemeValuesFromCSS.primary));
    setPgPickerAccentHex(hslStringToHex(initialThemeValuesFromCSS.accent));
    setPgPickerBackgroundHex(hslStringToHex(initialThemeValuesFromCSS.background));
    setPgPickerCardHex(hslStringToHex(initialThemeValuesFromCSS.card));
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const rootStyle = getComputedStyle(document.documentElement);
      const bodyStyle = getComputedStyle(document.body);
      
      const initialVals = {
        primary: rootStyle.getPropertyValue('--primary').trim() || "258 36% 51%",
        primaryForeground: rootStyle.getPropertyValue('--primary-foreground').trim() || "0 0% 100%",
        secondary: rootStyle.getPropertyValue('--secondary').trim() || "262 28% 80%",
        secondaryForeground: rootStyle.getPropertyValue('--secondary-foreground').trim() || "258 36% 30%",
        accent: rootStyle.getPropertyValue('--accent').trim() || "232 39% 34%",
        accentForeground: rootStyle.getPropertyValue('--accent-foreground').trim() || "0 0% 100%",
        background: rootStyle.getPropertyValue('--background').trim() || "262 28% 90%",
        foreground: rootStyle.getPropertyValue('--foreground').trim() || "258 10% 20%",
        card: rootStyle.getPropertyValue('--card').trim() || "0 0% 100%",
        cardForeground: rootStyle.getPropertyValue('--card-foreground').trim() || "258 10% 20%",
        ring: rootStyle.getPropertyValue('--ring').trim() || "258 36% 61%",
        radius: parseFloat(rootStyle.getPropertyValue('--radius')) || 0.5,
        fontFamily: bodyStyle.fontFamily || "Inter, sans-serif",
      };
      setInitialThemeValuesFromCSS(initialVals);

      if (pgPrimaryHsl === null) setPgPickerPrimaryHex(hslStringToHex(initialVals.primary));
      if (pgAccentHsl === null) setPgPickerAccentHex(hslStringToHex(initialVals.accent));
      if (pgBackgroundHsl === null) setPgPickerBackgroundHex(hslStringToHex(initialVals.background));
      if (pgCardHsl === null) setPgPickerCardHex(hslStringToHex(initialVals.card));
    }
  }, []); 

  React.useEffect(() => {
    const docStyle = document.documentElement.style;
    const bodyStyle = document.body.style;
    const {radius: initialRadius, fontFamily: initialFontFamily, ...initialColors} = initialThemeValuesFromCSS;

    // Apply primary color and its derivatives
    if (pgPrimaryHsl) {
      docStyle.setProperty('--primary', pgPrimaryHsl);
      const primary = parseHslString(pgPrimaryHsl);
      if (primary) {
        docStyle.setProperty('--primary-foreground', hslToString(deriveForegroundColor(primary)));
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
        docStyle.setProperty('--secondary-foreground', hslToString(deriveForegroundColor(secondary)));
        docStyle.setProperty('--ring', hslToString({ h: primary.h, s: Math.min(100, primary.s + 10), l: Math.min(100, primary.l + 5) }));
      }
    } else {
      docStyle.setProperty('--primary', initialColors.primary);
      docStyle.setProperty('--primary-foreground', initialColors.primaryForeground);
      docStyle.setProperty('--secondary', initialColors.secondary);
      docStyle.setProperty('--secondary-foreground', initialColors.secondaryForeground);
      docStyle.setProperty('--ring', initialColors.ring);
    }

    // Apply accent color and its derivative
    if (pgAccentHsl) {
      docStyle.setProperty('--accent', pgAccentHsl);
      const accent = parseHslString(pgAccentHsl);
      if (accent) docStyle.setProperty('--accent-foreground', hslToString(deriveForegroundColor(accent)));
    } else {
      docStyle.setProperty('--accent', initialColors.accent);
      docStyle.setProperty('--accent-foreground', initialColors.accentForeground);
    }

    // Apply background color and its derivative
    if (pgBackgroundHsl) {
        docStyle.setProperty('--background', pgBackgroundHsl);
        const background = parseHslString(pgBackgroundHsl);
        if (background) docStyle.setProperty('--foreground', hslToString(deriveForegroundColor(background)));
    } else {
        docStyle.setProperty('--background', initialColors.background);
        docStyle.setProperty('--foreground', initialColors.foreground);
    }

    // Apply card background color and its derivative
    if (pgCardHsl) {
        docStyle.setProperty('--card', pgCardHsl);
        const card = parseHslString(pgCardHsl);
        if (card) docStyle.setProperty('--card-foreground', hslToString(deriveForegroundColor(card)));
    } else {
        docStyle.setProperty('--card', initialColors.card);
        docStyle.setProperty('--card-foreground', initialColors.cardForeground);
    }
    
    if (pgRadius !== null) docStyle.setProperty('--radius', `${pgRadius}rem`);
    else docStyle.setProperty('--radius', `${initialRadius}rem`);

    if (pgFontFamily !== null) bodyStyle.fontFamily = pgFontFamily;
    else bodyStyle.fontFamily = initialFontFamily;

    return () => {
        docStyle.setProperty('--primary', initialColors.primary);
        docStyle.setProperty('--primary-foreground', initialColors.primaryForeground);
        docStyle.setProperty('--secondary', initialColors.secondary);
        docStyle.setProperty('--secondary-foreground', initialColors.secondaryForeground);
        docStyle.setProperty('--accent', initialColors.accent);
        docStyle.setProperty('--accent-foreground', initialColors.accentForeground);
        docStyle.setProperty('--background', initialColors.background);
        docStyle.setProperty('--foreground', initialColors.foreground);
        docStyle.setProperty('--card', initialColors.card);
        docStyle.setProperty('--card-foreground', initialColors.cardForeground);
        docStyle.setProperty('--ring', initialColors.ring);
        docStyle.setProperty('--radius', `${initialRadius}rem`);
        bodyStyle.fontFamily = initialFontFamily;
    };
  }, [pgPrimaryHsl, pgAccentHsl, pgBackgroundHsl, pgCardHsl, pgRadius, pgFontFamily, initialThemeValuesFromCSS]);


  return (
    <TooltipProvider>
      <div className="container mx-auto py-10 space-y-12">
        <Toaster />
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-8">UI Elements Showcase</h1>

        <Alert>
          <Paintbrush className="h-4 w-4" />
          <AlertTitle>Customize Your Global UI!</AlertTitle>
          <AlertDescription>
            The UI components showcased below are styled using the theme defined in <strong>src/app/globals.css</strong>.
            You can customize the application&apos;s appearance, including colors and border radius, by modifying the HSL variables
            in that file. Use the theme toggle in the header to switch between light, dark, and system modes to see your changes in action.
            The playground below offers temporary, session-only experimentation with more dynamic color derivations.
          </AlertDescription>
        </Alert>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Live Theme Playground (Session Only)</h2>
          <Card className="p-6 shadow-lg">
            <CardHeader className="p-0 pb-4">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle>Theme Playground</CardTitle>
              </div>
              <CardDescription>
                Experiment with colors, color pickers, border radius, and font family in real-time. Changes here (primary, accent, background, card colors, radius, font) dynamically adjust several related theme colors (like foregrounds and secondary shades) for this session only. These changes do not modify <code>globals.css</code> and will reset on page refresh or when toggling the main theme (light/dark).
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div className="grid md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-1 space-y-4 p-4 border rounded-lg bg-card">
                  <h4 className="font-medium text-center mb-2 text-card-foreground">Preview Elements</h4>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Button variant="default" size="default">Primary Btn</Button>
                    <Button variant="secondary" size="default">Secondary Btn</Button>
                    <Button variant="outline" size="default">Outline Btn</Button>
                  </div>
                   <div className="flex flex-wrap gap-2">
                     <Badge variant="default">Primary Badge</Badge>
                     <Badge variant="secondary">Secondary Badge</Badge>
                     <Badge variant="outline" className="border-accent text-accent">Accent Outline</Badge>
                   </div>
                  <p className="text-primary font-semibold">This text uses the primary color.</p>
                  <p className="text-secondary-foreground bg-secondary p-2 rounded-md text-sm">This text uses secondary colors.</p>
                  <div className="p-3 bg-accent text-accent-foreground rounded-md">
                    This box uses the accent color for its background.
                  </div>
                  <Input placeholder="Input with current radius & ring" />
                  <p className="text-xs text-muted-foreground">Page background and card background will also change based on your selections below.</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Color Presets</h4>
                    <p className="text-xs text-muted-foreground mb-2">Change primary & accent colors.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {colorPresets.map(preset => (
                             <Button 
                                key={preset.name} 
                                variant="outline"
                                onClick={() => applyPlaygroundColors(preset.primary, preset.accent)}
                                className="w-full justify-start text-xs"
                                size="sm"
                            >
                                {preset.primary && preset.accent ? (
                                  <span style={{ backgroundColor: `hsl(${preset.primary})` }} className="w-3 h-3 rounded-full mr-2 border"/>
                                ) : (
                                  <RotateCcw className="w-3 h-3 mr-2" /> 
                                )}
                                {preset.name}
                            </Button>
                        ))}
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pg-primary-color-picker" className="text-sm font-medium flex items-center gap-1"> <Paintbrush size={14}/> Primary Color</Label>
                      <Input 
                        type="color" 
                        id="pg-primary-color-picker" 
                        value={pgPickerPrimaryHex} 
                        onChange={handlePrimaryColorPickerChange}
                        className="p-1 h-10 w-full mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">{pgPickerPrimaryHex} (HSL: {pgPrimaryHsl || initialThemeValuesFromCSS.primary || "N/A"})</p>
                    </div>
                     <div>
                      <Label htmlFor="pg-accent-color-picker" className="text-sm font-medium flex items-center gap-1"><Paintbrush size={14}/> Accent Color</Label>
                      <Input 
                        type="color" 
                        id="pg-accent-color-picker" 
                        value={pgPickerAccentHex} 
                        onChange={handleAccentColorPickerChange}
                        className="p-1 h-10 w-full mt-1"
                      />
                       <p className="text-xs text-muted-foreground mt-1">{pgPickerAccentHex} (HSL: {pgAccentHsl || initialThemeValuesFromCSS.accent || "N/A"})</p>
                    </div>
                     <div>
                      <Label htmlFor="pg-background-color-picker" className="text-sm font-medium flex items-center gap-1"><Wallpaper size={14}/> Background Color</Label>
                      <Input 
                        type="color" 
                        id="pg-background-color-picker" 
                        value={pgPickerBackgroundHex} 
                        onChange={handleBackgroundColorPickerChange}
                        className="p-1 h-10 w-full mt-1"
                      />
                       <p className="text-xs text-muted-foreground mt-1">{pgPickerBackgroundHex} (HSL: {pgBackgroundHsl || initialThemeValuesFromCSS.background || "N/A"})</p>
                    </div>
                     <div>
                      <Label htmlFor="pg-card-color-picker" className="text-sm font-medium flex items-center gap-1"><Square size={14}/> Card Background</Label>
                      <Input 
                        type="color" 
                        id="pg-card-color-picker" 
                        value={pgPickerCardHex} 
                        onChange={handleCardColorPickerChange}
                        className="p-1 h-10 w-full mt-1"
                      />
                       <p className="text-xs text-muted-foreground mt-1">{pgPickerCardHex} (HSL: {pgCardHsl || initialThemeValuesFromCSS.card || "N/A"})</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-1">Border Radius</h4>
                     <p className="text-xs text-muted-foreground mb-2">Adjust roundness of UI elements.</p>
                    <div className="space-y-1">
                        <Label htmlFor="radius-slider" className="text-sm">Radius: {pgRadius !== null ? pgRadius.toFixed(1) : initialThemeValuesFromCSS.radius.toFixed(1)}rem</Label>
                        <Slider
                            id="radius-slider"
                            min={0}
                            max={1.5}
                            step={0.1}
                            value={[pgRadius ?? initialThemeValuesFromCSS.radius]}
                            onValueChange={handlePlaygroundRadiusChange}
                        />
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-1">Font Family</h4>
                    <p className="text-xs text-muted-foreground mb-2">Switch the application font (body).</p>
                     <Select value={pgFontFamily ?? "system-default-font"} onValueChange={handlePlaygroundFontChange}>
                        <SelectTrigger id="font-family-select">
                            <Baseline className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                        <SelectContent>
                            {fontOptions.map(font => (
                                <SelectItem 
                                  key={font.value} 
                                  value={font.value} 
                                  style={{fontFamily: font.value === "system-default-font" ? 'Inter, sans-serif' : font.value}}
                                >
                                    {font.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </div>

                  <Separator />
                  <Button onClick={resetPlaygroundOverrides} variant="outline" className="w-full">
                    <RotateCcw className="mr-2 h-4 w-4" /> Reset Playground Overrides
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
          <Card className="p-6 shadow-lg">
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button><Mail className="mr-2 h-4 w-4" /> Login with Email</Button>
              <Button disabled>Disabled</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><Users className="h-4 w-4" /></Button>
            </div>
            <Separator className="my-6" />
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2"><Settings2 className="h-5 w-5" />Interactive Button Customization</h3>
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="button-variant">Variant</Label>
                  <Select value={buttonVariant || "default"} onValueChange={(value) => setButtonVariant(value as ButtonVariant)}>
                    <SelectTrigger id="button-variant">
                      <SelectValue placeholder="Select variant" />
                    </SelectTrigger>
                    <SelectContent>
                      {allButtonVariants.map(variant => (
                        <SelectItem key={variant || 'default'} value={variant || 'default'}>{variant ? variant.charAt(0).toUpperCase() + variant.slice(1) : 'Default'}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="button-size">Size</Label>
                   <Select value={buttonSize || "default"} onValueChange={(value) => setButtonSize(value as ButtonSize)}>
                    <SelectTrigger id="button-size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {allButtonSizes.map(size => (
                        <SelectItem key={size || 'default'} value={size || 'default'}>{size ? size.charAt(0).toUpperCase() + size.slice(1) : 'Default'}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant={buttonVariant} size={buttonSize} className="w-full md:w-auto">
                  {buttonSize === 'icon' ? <Users /> : 'Try Me!'}
                </Button>
              </div>
            </div>
          </Card>
        </section>
        
        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Forms</h2>
          <Card className="p-6 grid md:grid-cols-2 gap-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here." />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Compact</Label>
                </div>
              </RadioGroup>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div>
            </div>
          </Card>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>This is a basic card component.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here. Use it to display information or actions.</p>
                 <Image src="https://placehold.co/600x400.png" alt="Placeholder" width={600} height={400} className="rounded-md mt-4" data-ai-hint="abstract background" />
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>
            <Card className="shadow-lg bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Primary Card</CardTitle>
                <CardDescription className="text-primary-foreground/80">This card uses primary colors.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Styled content emphasizing importance.</p>
              </CardContent>
               <CardFooter>
                <Button variant="secondary">Action</Button>
              </CardFooter>
            </Card>
             <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Icon Card</CardTitle>
                <ShieldCheck className="w-6 h-6 text-accent"/>
              </CardHeader>
              <CardContent>
                <p>A card with an icon in the header for visual emphasis.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Alerts & Badges</h2>
          <Card className="p-6 grid md:grid-cols-2 gap-6 shadow-lg">
            <div className="space-y-4">
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  You can add components to your app using the cli.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Your session has expired. Please log in again.
                </AlertDescription>
              </Alert>
            </div>
            <div className="flex flex-wrap gap-2 items-start">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge className="bg-accent text-accent-foreground hover:bg-accent/80">Custom Accent</Badge>
            </div>
          </Card>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Accordion & Tabs</h2>
          <Card className="p-6 grid md:grid-cols-2 gap-6 shadow-lg">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Tabs defaultValue="account" className="w-full">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Make changes to your account here.</TabsContent>
              <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
          </Card>
        </section>
        
        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Dialog, Popover & Tooltip</h2>
          <Card className="p-6 flex flex-wrap gap-4 shadow-lg">
            <Dialog>
              <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Popover>
              <PopoverTrigger asChild><Button variant="outline">Open Popover</Button></PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline">Hover for Tooltip</Button></TooltipTrigger>
              <TooltipContent><p>Add to library</p></TooltipContent>
            </Tooltip>
          </Card>
        </section>

        <Separator />

         <section>
          <h2 className="text-2xl font-semibold mb-4">Progress, Slider & Calendar</h2>
          <Card className="p-6 grid md:grid-cols-3 gap-6 shadow-lg">
            <div className="space-y-4 md:col-span-2">
                <Label htmlFor="progress-bar-interactive">Progress Bar (Value: {progressValue}%)</Label>
                <Progress id="progress-bar-interactive" value={progressValue} className="w-full" />
                <div className="pt-2">
                  <Label htmlFor="progress-slider">Control Progress:</Label>
                  <Slider
                    id="progress-slider"
                    value={[progressValue]}
                    onValueChange={(value) => setProgressValue(value[0])}
                    max={100}
                    step={1}
                    className="w-full mt-2"
                   />
                </div>
            </div>
            <div className="flex justify-center items-start">
               <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
          </Card>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Table</h2>
          <Card className="p-6 shadow-lg">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell>INV002</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </section>

        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Toast Notifications</h2>
          <Card className="p-6 shadow-lg">
            <Button
              onClick={() => {
                toast({
                  title: "Scheduled: Catch up ",
                  description: "Friday, February 10, 2023 at 5:57 PM",
                  action: (
                     <Button variant="outline" size="sm" onClick={() => console.log('Undo')}>Undo</Button>
                  ),
                })
              }}
            >
              Show Toast
            </Button>
          </Card>
        </section>

      </div>
    </TooltipProvider>
  );
}
    

    


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
import { AlertCircle, Mail, Terminal, Users, ShieldCheck, Paintbrush, Settings2, Palette, RotateCcw, Font } from "lucide-react";
import Image from 'next/image';
import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';


type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
type ButtonSize = VariantProps<typeof buttonVariants>['size'];

const colorPresets = [
    { name: "Oceanic (Blue/Teal)", primary: "210 70% 55%", accent: "170 60% 45%" },
    { name: "Sunset (Orange/Red)", primary: "30 90% 55%", accent: "0 80% 60%" },
    { name: "Verdant (Green/Gold)", primary: "140 60% 45%", accent: "40 70% 50%" },
    { name: "Indigo & Pink", primary: "240 50% 50%", accent: "330 80% 70%" },
    { name: "Charcoal & Lime", primary: "210 10% 30%", accent: "90 70% 55%" },
];

const fontOptions = [
    { value: "", label: "Default (Inter)" },
    { value: "Roboto, sans-serif", label: "Roboto" },
    { value: "Georgia, serif", label: "Georgia (Serif)" },
    { value: "Verdana, sans-serif", label: "Verdana" },
    { value: "Arial, sans-serif", label: "Arial" },
];


export default function UiElementsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const [buttonVariant, setButtonVariant] = React.useState<ButtonVariant>("default");
  const [buttonSize, setButtonSize] = React.useState<ButtonSize>("default");
  const [progressValue, setProgressValue] = React.useState(66);

  // State for playground overrides
  const [pgPrimary, setPgPrimary] = React.useState<string | null>(null);
  const [pgAccent, setPgAccent] = React.useState<string | null>(null);
  const [pgRadius, setPgRadius] = React.useState<number | null>(null);
  const [pgFontFamily, setPgFontFamily] = React.useState<string | null>(null);
  const [initialRadius, setInitialRadius] = React.useState<number>(0.5);


  const allButtonVariants: ButtonVariant[] = ["default", "destructive", "outline", "secondary", "ghost", "link"];
  const allButtonSizes: ButtonSize[] = ["default", "sm", "lg", "icon"];

  const applyPlaygroundColors = (primary: string, accent: string) => {
    setPgPrimary(primary);
    setPgAccent(accent);
  };

  const handlePlaygroundFontChange = (font: string) => {
    setPgFontFamily(font === "" ? null : font);
  };

  const resetPlaygroundOverrides = () => {
    setPgPrimary(null);
    setPgAccent(null);
    setPgRadius(null);
    setPgFontFamily(null);
  };

  React.useEffect(() => {
    // On component mount, read the initial radius from CSS
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      const radiusFromCSS = parseFloat(computedStyle.getPropertyValue('--radius'));
      const validRadius = isNaN(radiusFromCSS) ? 0.5 : radiusFromCSS;
      setInitialRadius(validRadius);
      if (pgRadius === null) {
        setPgRadius(validRadius);
      }
    }
  }, []); // Empty dependency array for mount only

  React.useEffect(() => {
    const docStyle = document.documentElement.style;
    const bodyStyle = document.body.style;

    if (pgPrimary) docStyle.setProperty('--primary', pgPrimary); else docStyle.removeProperty('--primary');
    if (pgAccent) docStyle.setProperty('--accent', pgAccent); else docStyle.removeProperty('--accent');
    if (pgRadius !== null) docStyle.setProperty('--radius', `${pgRadius}rem`); else docStyle.removeProperty('--radius');
    if (pgFontFamily) bodyStyle.fontFamily = pgFontFamily; else bodyStyle.fontFamily = '';


    // Cleanup function to reset all playground overrides when component unmounts or for HMR
    return () => {
      docStyle.removeProperty('--primary');
      docStyle.removeProperty('--accent');
      docStyle.removeProperty('--radius');
      bodyStyle.fontFamily = '';
    };
  }, [pgPrimary, pgAccent, pgRadius, pgFontFamily]);


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
            The playground below offers temporary, session-only experimentation.
          </AlertDescription>
        </Alert>

        {/* Live Theme Playground */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Live Theme Playground (Session Only)</h2>
          <Card className="p-6 shadow-lg">
            <CardHeader className="p-0 pb-4">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle>Theme Playground</CardTitle>
              </div>
              <CardDescription>
                Experiment with colors, border radius, and font family in real-time. These changes are temporary for this session and do not modify the global <code>globals.css</code> file. Refreshing the page or toggling the main theme (light/dark) will reset these temporary changes unless reapplied.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4 p-4 border rounded-lg bg-card">
                  <h4 className="font-medium text-center mb-2 text-card-foreground">Preview Elements</h4>
                  <Button variant="default" size="lg">Primary Button</Button>
                  <Button variant="outline" size="lg">Outline Button</Button>
                   <div className="flex gap-2">
                     <Badge variant="default">Primary Badge</Badge>
                     <Badge variant="outline" className="border-accent text-accent">Accent Outline</Badge>
                   </div>
                  <p className="text-primary font-semibold">This text uses the primary color.</p>
                  <div className="p-3 bg-accent text-accent-foreground rounded-md">
                    This box uses the accent color for its background.
                  </div>
                  <Input placeholder="Input with current radius" />
                </div>
                <div className="space-y-4">
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
                                <span style={{ backgroundColor: `hsl(${preset.primary})` }} className="w-3 h-3 rounded-full mr-2 border"/>
                                {preset.name}
                            </Button>
                        ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-1">Border Radius</h4>
                     <p className="text-xs text-muted-foreground mb-2">Adjust roundness of UI elements.</p>
                    <div className="space-y-1">
                        <Label htmlFor="radius-slider" className="text-sm">Radius: {pgRadius !== null ? pgRadius.toFixed(1) : initialRadius.toFixed(1)}rem</Label>
                        <Slider
                            id="radius-slider"
                            min={0}
                            max={1.5}
                            step={0.1}
                            value={[pgRadius ?? initialRadius]}
                            onValueChange={(value) => setPgRadius(value[0])}
                        />
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-1">Font Family</h4>
                    <p className="text-xs text-muted-foreground mb-2">Switch the application font (body).</p>
                     <Select value={pgFontFamily || ""} onValueChange={handlePlaygroundFontChange}>
                        <SelectTrigger id="font-family-select">
                            <Font className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                        <SelectContent>
                            {fontOptions.map(font => (
                                <SelectItem key={font.value} value={font.value} style={{fontFamily: font.value || 'Inter, sans-serif'}}>
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

        {/* Buttons */}
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

        {/* Forms */}
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

        {/* Cards */}
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

        {/* Alerts & Badges */}
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

        {/* Accordion & Tabs */}
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

        {/* Dialog, Popover, Tooltip */}
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
                  {/* Form fields */}
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

        {/* Progress, Slider, Calendar */}
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

        {/* Table */}
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
        
        {/* Toast */}
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

    

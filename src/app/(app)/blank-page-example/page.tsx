
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileOutput } from "lucide-react";

export default function BlankPageExample() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <FileOutput className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold">Blank Page Example</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Starter Content Area</CardTitle>
          <CardDescription>
            This is a blank page. Use it as a starting point for your new features or content.
            Modify this content, add your components, and build amazing things!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You can duplicate this file (`src/app/(app)/blank-page-example/page.tsx`)
            and the corresponding navigation item in `src/components/main-nav.tsx`
            to create new pages within the authenticated layout.
          </p>
          <div className="mt-6 p-8 border-2 border-dashed border-muted-foreground/30 rounded-lg text-center">
            <p className="text-muted-foreground">Your content goes here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

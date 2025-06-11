"use client"
import * as React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell } from "lucide-react";
import { Logo } from "@/components/logo";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { MainNav } from "@/components/main-nav";
import { cn } from "@/lib/utils";


function AppHeader() {
  const { state: sidebarState, isMobile } = useSidebar();
  const showLogo = isMobile || sidebarState === "collapsed";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
       <SidebarTrigger className="md:hidden" />
      {showLogo && (
         <div className="hidden md:block">
          <Logo collapsed={sidebarState === "collapsed"} />
        </div>
      )}
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[320px] focus-visible:ring-primary"
        />
      </div>
      <Button variant="outline" size="icon" className="h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <ThemeToggle />
      <UserNav />
    </header>
  );
}


export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar 
        variant="sidebar" 
        collapsible="icon"
        className="border-r"
      >
        <SidebarHeader className="p-4">
           <Logo />
        </SidebarHeader>
        <SidebarContent className="p-2 pr-0">
          <MainNav />
        </SidebarContent>
        <SidebarFooter className="p-4">
          {/* Footer content if any */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className={cn("flex flex-col")}>
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/40">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

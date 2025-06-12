
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  sidebarMenuButtonVariants,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  ToyBrick,
  Settings,
  AlertTriangle,
  ShieldCheck,
  GanttChartSquare,
  AppWindow,
  UserCircle,
  ShoppingCart,
} from "lucide-react"
import * as React from "react"

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserCircle,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    label: "UI Elements",
    href: "/ui-elements",
    icon: ToyBrick,
  },
  {
    label: "Pages",
    icon: AppWindow,
    subMenu: [
      { label: "Settings", href: "/settings", icon: Settings },
      { label: "Authentication", href: "/authentication", icon: ShieldCheck },
      { label: "Error 404 Example", href: "/404-example", icon: AlertTriangle },
    ],
  },
]

export function MainNav() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({})

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  React.useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {};
    menuItems.forEach(item => {
      if (item.subMenu) {
        const isActiveParent = item.subMenu.some(subItem => pathname === subItem.href || pathname.startsWith(subItem.href + '/'));
        if (isActiveParent) {
          newOpenMenus[item.label] = true;
        }
      }
    });
    setOpenMenus(prev => ({...prev, ...newOpenMenus}));
  }, [pathname]);


  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          {item.subMenu ? (
            <>
              <SidebarMenuButton
                onClick={() => toggleMenu(item.label)}
                isActive={item.subMenu.some(subItem => pathname.startsWith(subItem.href!))}
                aria-expanded={openMenus[item.label]}
                className="justify-between"
              >
                <div className="flex items-center gap-2">
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </div>
                <GanttChartSquare 
                  size={16} 
                  className={cn("transform transition-transform duration-200", openMenus[item.label] ? "rotate-90" : "")}
                />
              </SidebarMenuButton>
              {openMenus[item.label] && (
                <SidebarMenuSub>
                  {item.subMenu.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.label}>
                      <Link href={subItem.href!} asChild>
                        <SidebarMenuSubButton
                          isActive={pathname === subItem.href || pathname.startsWith(subItem.href! + '/')}
                        >
                          {subItem.icon && <subItem.icon size={16} />}
                          <span>{subItem.label}</span>
                        </SidebarMenuSubButton>
                      </Link>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </>
          ) : (
            <Link
              href={item.href!}
              className={cn(
                sidebarMenuButtonVariants({ variant: "default", size: "default" }),
                (pathname === item.href || pathname.startsWith(item.href! + '/')) && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              data-active={pathname === item.href || pathname.startsWith(item.href! + '/')}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

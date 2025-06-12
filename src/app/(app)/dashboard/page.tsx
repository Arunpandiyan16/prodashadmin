
"use client"
import React from "react";
import { OverviewChart, SalesByRegionChart, OrderStatusChart } from "@/components/overview-chart"
import { RecentSales } from "@/components/recent-sales"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, Activity } from "lucide-react"

const getCurrencySymbol = (currencyCode: string | null) => {
  switch (currencyCode) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "JPY":
      return "¥";
    default:
      return "$";
  }
};

export default function DashboardPage() {
  const [currentSymbol, setCurrentSymbol] = React.useState("$");

  React.useEffect(() => {
    const updateUserCurrency = () => {
      if (typeof window !== 'undefined') {
        const savedCurrency = localStorage.getItem('userCurrency');
        setCurrentSymbol(getCurrencySymbol(savedCurrency));
      }
    };

    updateUserCurrency(); // Initial check

    window.addEventListener('storage', updateUserCurrency); // Listen for changes from other tabs/windows

    return () => {
      window.removeEventListener('storage', updateUserCurrency);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSymbol}45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Subscriptions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <OverviewChart />
        </div>
        <div className="lg:col-span-3">
         <RecentSales />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <SalesByRegionChart />
        <OrderStatusChart />
      </div>

    </div>
  )
}

    
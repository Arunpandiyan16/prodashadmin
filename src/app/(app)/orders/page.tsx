
"use client"

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ShoppingCart, Search, Filter, MoreHorizontal, ExternalLink, FileDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const mockOrders = [
  { id: "ORD001", customer: "Alice Wonderland", date: "2024-03-15", status: "Shipped", total: "$150.00", items: 3, paymentMethod: "Credit Card" },
  { id: "ORD002", customer: "Bob The Builder", date: "2024-03-14", status: "Delivered", total: "$75.50", items: 1, paymentMethod: "PayPal" },
  { id: "ORD003", customer: "Charlie Chaplin", date: "2024-03-14", status: "Pending", total: "$220.00", items: 5, paymentMethod: "Bank Transfer" },
  { id: "ORD004", customer: "Diana Prince", date: "2024-03-13", status: "Cancelled", total: "$99.99", items: 2, paymentMethod: "Credit Card" },
  { id: "ORD005", customer: "Edward Scissorhands", date: "2024-03-12", status: "Delivered", total: "$310.75", items: 4, paymentMethod: "PayPal" },
  { id: "ORD006", customer: "Fiona Gallagher", date: "2024-03-11", status: "Shipped", total: "$88.00", items: 2, paymentMethod: "Credit Card" },
];

type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";

const statusVariant: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
  Pending: "secondary",
  Shipped: "default",
  Delivered: "default", // Using default for delivered, could be a success variant if added
  Cancelled: "destructive",
};


export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<OrderStatus | "all">("all");
  const [visibleColumns, setVisibleColumns] = React.useState({
    id: true,
    customer: true,
    date: true,
    status: true,
    total: true,
    items: false,
    paymentMethod: false,
  });


  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>
         <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export Orders
          </Button>
          <Button>Add New Order</Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>View, search, and manage all customer orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders by ID or customer..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value: OrderStatus | "all") => setStatusFilter(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.keys(visibleColumns).map((key) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    className="capitalize"
                    checked={visibleColumns[key as keyof typeof visibleColumns]}
                    onCheckedChange={(value) =>
                      setVisibleColumns((prev) => ({
                        ...prev,
                        [key]: !!value,
                      }))
                    }
                  >
                    {key.replace(/([A-Z])/g, ' $1')} 
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableCaption>A list of recent orders.</TableCaption>
              <TableHeader>
                <TableRow>
                  {visibleColumns.id && <TableHead>Order ID</TableHead>}
                  {visibleColumns.customer && <TableHead>Customer</TableHead>}
                  {visibleColumns.date && <TableHead>Date</TableHead>}
                  {visibleColumns.status && <TableHead>Status</TableHead>}
                  {visibleColumns.total && <TableHead className="text-right">Total</TableHead>}
                  {visibleColumns.items && <TableHead className="text-center">Items</TableHead>}
                  {visibleColumns.paymentMethod && <TableHead>Payment</TableHead>}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    {visibleColumns.id && <TableCell className="font-medium">{order.id}</TableCell>}
                    {visibleColumns.customer && <TableCell>{order.customer}</TableCell>}
                    {visibleColumns.date && <TableCell>{order.date}</TableCell>}
                    {visibleColumns.status && (
                      <TableCell>
                        <Badge variant={statusVariant[order.status as OrderStatus]}>{order.status}</Badge>
                      </TableCell>
                    )}
                    {visibleColumns.total && <TableCell className="text-right">{order.total}</TableCell>}
                    {visibleColumns.items && <TableCell className="text-center">{order.items}</TableCell>}
                    {visibleColumns.paymentMethod && <TableCell>{order.paymentMethod}</TableCell>}
                    <TableCell className="text-right">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Order Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Shipped</DropdownMenuItem>
                          <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="h-24 text-center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

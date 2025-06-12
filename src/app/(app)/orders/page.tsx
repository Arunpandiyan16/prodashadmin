
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
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ShoppingCart, Search, Filter, MoreHorizontal, FileDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";
type Order = {
  id: string;
  customer: string;
  date: string;
  status: OrderStatus;
  total: string;
  items: number;
  paymentMethod: string;
};

const mockOrders: Order[] = [
  { id: "ORD001", customer: "Alice Wonderland", date: "2024-03-15", status: "Shipped", total: "$150.00", items: 3, paymentMethod: "Credit Card" },
  { id: "ORD002", customer: "Bob The Builder", date: "2024-03-14", status: "Delivered", total: "$75.50", items: 1, paymentMethod: "PayPal" },
  { id: "ORD003", customer: "Charlie Chaplin", date: "2024-03-14", status: "Pending", total: "$220.00", items: 5, paymentMethod: "Bank Transfer" },
  { id: "ORD004", customer: "Diana Prince", date: "2024-03-13", status: "Cancelled", total: "$99.99", items: 2, paymentMethod: "Credit Card" },
  { id: "ORD005", customer: "Edward Scissorhands", date: "2024-03-12", status: "Delivered", total: "$310.75", items: 4, paymentMethod: "PayPal" },
  { id: "ORD006", customer: "Fiona Gallagher", date: "2024-03-11", status: "Shipped", total: "$88.00", items: 2, paymentMethod: "Credit Card" },
];


const statusVariant: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
  Pending: "secondary",
  Shipped: "default",
  Delivered: "default", 
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

  const [isViewDetailsOpen, setIsViewDetailsOpen] = React.useState(false);
  const [currentOrderForView, setCurrentOrderForView] = React.useState<Order | null>(null);
  
  // State for Add New Order Dialog form
  const [newOrderCustomer, setNewOrderCustomer] = React.useState("");
  const [newOrderItems, setNewOrderItems] = React.useState("");
  const [newOrderTotal, setNewOrderTotal] = React.useState("");


  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (order: Order) => {
    setCurrentOrderForView(order);
    setIsViewDetailsOpen(true);
  };

  const handleAddNewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for adding order logic
    console.log("New Order:", { customer: newOrderCustomer, items: newOrderItems, total: newOrderTotal });
    // Reset form and close dialog
    setNewOrderCustomer("");
    setNewOrderItems("");
    setNewOrderTotal("");
    // find a way to close dialog: DialogClose can be used, or manage open state
  };

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
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Order</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Order</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new order. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddNewOrder}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customerName" className="text-right">
                      Customer
                    </Label>
                    <Input 
                      id="customerName" 
                      value={newOrderCustomer} 
                      onChange={(e) => setNewOrderCustomer(e.target.value)} 
                      className="col-span-3" 
                      placeholder="Customer name" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="itemsCount" className="text-right">
                      Items
                    </Label>
                    <Input 
                      id="itemsCount" 
                      type="number" 
                      value={newOrderItems} 
                      onChange={(e) => setNewOrderItems(e.target.value)} 
                      className="col-span-3" 
                      placeholder="Number of items"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="totalAmount" className="text-right">
                      Total
                    </Label>
                    <Input 
                      id="totalAmount" 
                      value={newOrderTotal} 
                      onChange={(e) => setNewOrderTotal(e.target.value)} 
                      className="col-span-3" 
                      placeholder="e.g., $100.00"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Order</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
                          <DropdownMenuItem onSelect={() => handleViewDetails(order)}>
                            View Details
                          </DropdownMenuItem>
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

      {/* View Order Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details: {currentOrderForView?.id}</DialogTitle>
            <DialogDescription>
              Detailed information for the selected order.
            </DialogDescription>
          </DialogHeader>
          {currentOrderForView && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
                <Label className="font-semibold">Order ID:</Label>
                <span>{currentOrderForView.id}</span>
              </div>
              <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
                <Label className="font-semibold">Customer:</Label>
                <span>{currentOrderForView.customer}</span>
              </div>
              <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
                <Label className="font-semibold">Date:</Label>
                <span>{currentOrderForView.date}</span>
              </div>
              <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
                <Label className="font-semibold">Status:</Label>
                <Badge variant={statusVariant[currentOrderForView.status]}>{currentOrderForView.status}</Badge>
              </div>
              <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
                <Label className="font-semibold">Total:</Label>
                <span>{currentOrderForView.total}</span>
              </div>
              <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
                <Label className="font-semibold">Items:</Label>
                <span>{currentOrderForView.items}</span>
              </div>
              <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
                <Label className="font-semibold">Payment Method:</Label>
                <span>{currentOrderForView.paymentMethod}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

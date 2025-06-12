
"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const salesData = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00", avatar: "OM", image: "https://placehold.co/40x40.png?text=OM", dataAiHint: "person avatar" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00", avatar: "JL", image: "https://placehold.co/40x40.png?text=JL", dataAiHint: "person avatar" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00", avatar: "IN", image: "https://placehold.co/40x40.png?text=IN", dataAiHint: "person avatar" },
  { name: "William Kim", email: "will@email.com", amount: "+$99.00", avatar: "WK", image: "https://placehold.co/40x40.png?text=WK", dataAiHint: "person avatar" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00", avatar: "SD", image: "https://placehold.co/40x40.png?text=SD", dataAiHint: "person avatar" },
]

export function RecentSales() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8">
        {salesData.map((sale) => (
          <div key={sale.email} className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src={sale.image} alt="Avatar" data-ai-hint={sale.dataAiHint} />
              <AvatarFallback>{sale.avatar}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{sale.name}</p>
              <p className="text-sm text-muted-foreground">{sale.email}</p>
            </div>
            <div className="ml-auto font-medium">{sale.amount}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

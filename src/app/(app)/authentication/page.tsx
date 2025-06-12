
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Users, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function AuthenticationPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <CardTitle>Authentication Management</CardTitle>
          </div>
          <CardDescription>Manage users, roles, and authentication settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">User Accounts</h3>
            <Button><Users className="mr-2 h-4 w-4" /> Add New User</Button>
          </div>
          <Table>
            <TableCaption>A list of user accounts.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Admin User</TableCell>
                <TableCell>admin@example.com</TableCell>
                <TableCell><Badge variant="secondary">Admin</Badge></TableCell>
                <TableCell><Badge variant="default">Active</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Editor User</TableCell>
                <TableCell>editor@example.com</TableCell>
                <TableCell><Badge variant="secondary">Editor</Badge></TableCell>
                <TableCell><Badge variant="default">Active</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

           <div className="space-y-4 pt-4 border-t mt-6">
             <h3 className="text-lg font-medium flex items-center gap-2"><KeyRound className="h-5 w-5" /> Security Settings</h3>
             <div className="flex gap-2">
                <Button variant="outline">Configure SSO</Button>
                <Button variant="outline">Manage API Keys</Button>
             </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

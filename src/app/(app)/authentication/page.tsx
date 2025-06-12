
"use client"

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Users, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function AuthenticationPage() {
  const [newUserName, setNewUserName] = React.useState("");
  const [newUserEmail, setNewUserEmail] = React.useState("");
  const [newUserRole, setNewUserRole] = React.useState("Editor"); // Default role

  const handleAddNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for adding user logic
    console.log("New User:", { name: newUserName, email: newUserEmail, role: newUserRole });
    // Reset form fields
    setNewUserName("");
    setNewUserEmail("");
    setNewUserRole("Editor");
    // Programmatically close dialog if needed, or use DialogClose
  };

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
            <Dialog>
              <DialogTrigger asChild>
                <Button><Users className="mr-2 h-4 w-4" /> Add New User</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new user account.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddNewUser}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="userName" className="text-right">
                        Name
                      </Label>
                      <Input 
                        id="userName" 
                        value={newUserName} 
                        onChange={(e) => setNewUserName(e.target.value)} 
                        className="col-span-3"
                        placeholder="Full name" 
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="userEmail" className="text-right">
                        Email
                      </Label>
                      <Input 
                        id="userEmail" 
                        type="email" 
                        value={newUserEmail} 
                        onChange={(e) => setNewUserEmail(e.target.value)} 
                        className="col-span-3"
                        placeholder="user@example.com"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="userRole" className="text-right">
                        Role
                      </Label>
                       <Select value={newUserRole} onValueChange={setNewUserRole}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                     <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Create User</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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

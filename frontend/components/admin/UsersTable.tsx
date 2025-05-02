"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { EyeIcon, MoreHorizontal, Search, ShieldAlert, ShieldCheck } from "lucide-react"
import type { User } from "@/types/admin"

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder-user.jpg",
    status: "active",
    role: "customer",
    orders: 12,
    joined: "2023-01-15",
    lastActive: "2023-05-18",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/placeholder-user.jpg",
    status: "active",
    role: "customer",
    orders: 8,
    joined: "2023-02-20",
    lastActive: "2023-05-17",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    avatar: "/placeholder-user.jpg",
    status: "inactive",
    role: "customer",
    orders: 5,
    joined: "2023-03-10",
    lastActive: "2023-04-25",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "/placeholder-user.jpg",
    status: "active",
    role: "admin",
    orders: 0,
    joined: "2023-01-05",
    lastActive: "2023-05-18",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    avatar: "/placeholder-user.jpg",
    status: "active",
    role: "customer",
    orders: 3,
    joined: "2023-04-12",
    lastActive: "2023-05-16",
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    avatar: "/placeholder-user.jpg",
    status: "banned",
    role: "customer",
    orders: 2,
    joined: "2023-02-28",
    lastActive: "2023-03-15",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david.miller@example.com",
    avatar: "/placeholder-user.jpg",
    status: "active",
    role: "customer",
    orders: 7,
    joined: "2023-03-05",
    lastActive: "2023-05-15",
  },
  {
    id: 8,
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    avatar: "/placeholder-user.jpg",
    status: "active",
    role: "customer",
    orders: 4,
    joined: "2023-04-20",
    lastActive: "2023-05-17",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 hover:bg-green-100/80"
    case "inactive":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    case "banned":
      return "bg-red-100 text-red-800 hover:bg-red-100/80"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
  }
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case "admin":
      return <ShieldCheck className="h-4 w-4 text-blue-500" />
    case "moderator":
      return <ShieldAlert className="h-4 w-4 text-amber-500" />
    default:
      return null
  }
}

export default function UsersTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setDialogOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage your customer accounts</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search users..." className="pl-8 w-full sm:w-[300px]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>
                              {user.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRoleIcon(user.role)}
                          <span className="capitalize">{user.role}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.orders}</TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewUser(user)}>
                              <EyeIcon className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            {user.status !== "banned" ? (
                              <DropdownMenuItem className="text-red-600">
                                <ShieldAlert className="mr-2 h-4 w-4" />
                                Ban User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                Unban User
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>Detailed information about the user</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                  <AvatarFallback className="text-lg">
                    {selectedUser.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(selectedUser.status)}>
                      {selectedUser.status}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getRoleIcon(selectedUser.role)}
                      <span className="text-xs capitalize">{selectedUser.role}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Joined</h4>
                  <p>{selectedUser.joined}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Last Active</h4>
                  <p>{selectedUser.lastActive}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Total Orders</h4>
                  <p>{selectedUser.orders}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Account Status</h4>
                  <p className="capitalize">{selectedUser.status}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline">View Orders</Button>
                {selectedUser.status !== "banned" ? (
                  <Button variant="destructive">Ban User</Button>
                ) : (
                  <Button variant="default">Unban User</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

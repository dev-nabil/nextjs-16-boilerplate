"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, ArrowUpDown, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react"
import { useState, useMemo } from "react"

type User = {
  id: number
  name: string
  email: string
  role: "Admin" | "User" | "Manager"
  status: "Active" | "Inactive" | "Pending"
  joinDate: string
}

const sampleData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", joinDate: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", joinDate: "2024-02-20" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager", status: "Inactive", joinDate: "2023-12-10" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", role: "User", status: "Active", joinDate: "2024-03-05" },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
    status: "Pending",
    joinDate: "2024-03-15",
  },
  { id: 6, name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "Active", joinDate: "2023-11-20" },
  { id: 7, name: "Eve Davis", email: "eve@example.com", role: "Manager", status: "Active", joinDate: "2024-01-25" },
  { id: 8, name: "Frank Miller", email: "frank@example.com", role: "User", status: "Inactive", joinDate: "2023-10-15" },
  { id: 9, name: "Grace Lee", email: "grace@example.com", role: "User", status: "Active", joinDate: "2024-02-28" },
  {
    id: 10,
    name: "Henry Wilson",
    email: "henry@example.com",
    role: "Manager",
    status: "Active",
    joinDate: "2024-01-10",
  },
  { id: 11, name: "Ivy Chen", email: "ivy@example.com", role: "User", status: "Pending", joinDate: "2024-03-20" },
  { id: 12, name: "Jack Taylor", email: "jack@example.com", role: "Admin", status: "Active", joinDate: "2023-09-05" },
]

export default function TablesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<keyof User>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredAndSortedData = useMemo(() => {
    const filtered = sampleData.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = roleFilter === "all" || user.role === roleFilter
      const matchesStatus = statusFilter === "all" || user.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    return filtered
  }, [searchQuery, roleFilter, statusFilter, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "Inactive":
        return "bg-red-500/10 text-red-700 dark:text-red-400"
      case "Pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
    }
  }

  const getRoleColor = (role: User["role"]) => {
    switch (role) {
      case "Admin":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400"
      case "Manager":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
      case "User":
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link href="/examples">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Examples
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Data Tables</h1>
          <p className="text-muted-foreground">Advanced table with filtering, sorting, and pagination</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Management Table</CardTitle>
            <CardDescription>
              Filter by role and status, search by name or email, sort columns, and paginate results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Select
                    value={roleFilter}
                    onValueChange={(value) => {
                      setRoleFilter(value)
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={statusFilter}
                    onValueChange={(value) => {
                      setStatusFilter(value)
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("name")}
                          className="gap-1 px-0 hover:bg-transparent"
                        >
                          Name
                          <ArrowUpDown className="w-4 h-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("email")}
                          className="gap-1 px-0 hover:bg-transparent"
                        >
                          Email
                          <ArrowUpDown className="w-4 h-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("role")}
                          className="gap-1 px-0 hover:bg-transparent"
                        >
                          Role
                          <ArrowUpDown className="w-4 h-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("status")}
                          className="gap-1 px-0 hover:bg-transparent"
                        >
                          Status
                          <ArrowUpDown className="w-4 h-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("joinDate")}
                          className="gap-1 px-0 hover:bg-transparent"
                        >
                          Join Date
                          <ArrowUpDown className="w-4 h-4" />
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell className="text-muted-foreground">{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No results found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length}{" "}
                  results
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-9"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code Example */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Implementation Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Real-time search filtering across multiple fields</li>
                  <li>Multi-select dropdown filters for role and status</li>
                  <li>Column sorting with visual indicators</li>
                  <li>Pagination with page numbers</li>
                  <li>Responsive design with mobile-friendly layout</li>
                  <li>Color-coded badges for quick status recognition</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tech Stack:</h3>
                <p className="text-muted-foreground">
                  React hooks (useState, useMemo), shadcn/ui components, Lucide icons, Tailwind CSS
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

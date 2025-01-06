// "use client"

// import * as React from "react"
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table"
// import { ArrowUpDown, ChevronDown, MoreHorizontal, Search } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { InventoryDataProps } from "@/lib/interface"
// import { updateUser } from "@/actions/user"
// import { toast } from "sonner"
// import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu"
// import { signOut } from "next-auth/react"


// export const columns: ColumnDef<InventoryDataProps>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },


//   {
//     accessorKey: "name",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Name
//           <ArrowUpDown />
//         </Button>
//       )
//     },
//     cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
//   },
//   {
//     accessorKey: "quantity",
//     header: "Quantity",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("quantity")}</div>
//     ),
//   },

//   {
//     accessorKey: "price",
//     header: () => <div className="text-right">Price</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("price"))

//       // Format the amount as a dollar amount
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount)

//       return <div className="text-right font-medium">{formatted}</div>
//     },
//   },
//   {
//     accessorKey: "assignAction",
//     header: "Transaction Status",
//     cell: ({ row }) => {
//       const task: any = row?.original;
//       const client: any = task?.clients?.find((cli: any) => cli.id === task?.userId);

//       const handleChange = async (userId: string) => {
//         const res: any = await updateUser(task?.id, userId, true);

//         if (res?.error) {
//           toast(res?.error)
//         } else {
//           toast("Inventory successfully transferred")
//         }
//       }

//       return (
//         <Select onValueChange={handleChange}>
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder={client ? `Transfer to ${client?.name}` : "Select a client"} />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectLabel>Select a user</SelectLabel>
//               {task?.clients?.map((item: any) => (
//                 <SelectItem key={item.id} value={item.id}>{item?.name}</SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       );
//     },
//   },

//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       return null; // You may want to implement actions here
//     },
//   },
// ]


// const DashboardDataTable = ({ data }: any) => {

//   function DataTableDemo() {
//     const [sorting, setSorting] = React.useState<SortingState>([])
//     const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
//     const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
//     const [rowSelection, setRowSelection] = React.useState({})

//     const table = useReactTable({
//       data,
//       columns,
//       onSortingChange: setSorting,
//       onColumnFiltersChange: setColumnFilters,
//       getCoreRowModel: getCoreRowModel(),
//       getPaginationRowModel: getPaginationRowModel(),
//       getSortedRowModel: getSortedRowModel(),
//       getFilteredRowModel: getFilteredRowModel(),
//       onColumnVisibilityChange: setColumnVisibility,
//       onRowSelectionChange: setRowSelection,
//       state: {
//         sorting,
//         columnFilters,
//         columnVisibility,
//         rowSelection,
//       },
//     });

//     return (
//       <div>
//         <div className="flex justify-between w-full h-14 lg:h-16 items-center gap-4 border-b bg-gray-100/40 px-6">
//           <div className="flex items-center gap-3 w-full">
//             <div className="relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
//               <Input placeholder="Search name..." value={(table?.getColumn("name")?.getFilterValue() as string) ?? ""}
//                 onChange={(event) => table?.getColumn("name")?.setFilterValue(event?.target?.value)}
//                 className="pl-8 max-w-sm outline-none focus:outline-none"
//               />
//             </div>
//             <div>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" className="ml-auto">
//                     Columns <ChevronDown className="ml-2 h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   {table
//                     .getAllColumns()
//                     .filter((column) => column.getCanHide())
//                     .map((column) => {
//                       return (
//                         <DropdownMenuCheckboxItem
//                           key={column.id}
//                           className="capitalize"
//                           checked={column.getIsVisible()}
//                           onCheckedChange={(value) =>
//                             column.toggleVisibility(!!value)
//                           }>
//                           {column.id}
//                         </DropdownMenuCheckboxItem>
//                       )
//                     })};
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//           <Button onClick={() => signOut() }>Sign Out</Button>
//         </div>

//         <div className="p-6">
//           <div className="flex items-center justify-between pt-3 pb-6">
//             <h1 className="text-3xl font-bold tracking-tight">Inventory Data </h1>
//           </div>
//           <div >
//             <div className="rounded-md border">
//               <Table>
//                 <TableHeader>
//                   {table.getHeaderGroups().map((headerGroup) => (
//                     <TableRow key={headerGroup.id}>
//                       {headerGroup.headers.map((header) => {
//                         return (
//                           <TableHead key={header.id}>
//                             {header.isPlaceholder
//                               ? null
//                               : flexRender(
//                                 header.column.columnDef.header,
//                                 header.getContext()
//                               )}
//                           </TableHead>
//                         )
//                       })}
//                     </TableRow>
//                   ))}
//                 </TableHeader>
//                 <TableBody>
//                   {table.getRowModel().rows?.length ? (
//                     table.getRowModel().rows.map((row) => (
//                       <TableRow
//                         key={row.id}
//                         data-state={row.getIsSelected() && "selected"}
//                       >
//                         {row.getVisibleCells().map((cell) => (
//                           <TableCell key={cell.id}>
//                             {flexRender(
//                               cell.column.columnDef.cell,
//                               cell.getContext()
//                             )}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell
//                         colSpan={columns.length}
//                         className="h-24 text-center"
//                       >
//                         No results.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//             <div className="flex items-center justify-end space-x-2 py-4">
//               <div className="flex-1 text-sm text-muted-foreground">
//                 {table.getFilteredSelectedRowModel().rows.length} of{" "}
//                 {table.getFilteredRowModel().rows.length} row(s) selected.
//               </div>
//               <div className="space-x-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => table.previousPage()}
//                   disabled={!table.getCanPreviousPage()}
//                 >
//                   Previous
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => table.nextPage()}
//                   disabled={!table.getCanNextPage()}
//                 >
//                   Next
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     )
//   }

//   return <DataTableDemo />;
// }

// export default DashboardDataTable;


"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { InventoryDataProps } from "@/lib/interface"
import { updateUser } from "@/actions/user"
import { toast } from "sonner"
import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu"
import { signOut } from "next-auth/react"


export const columns: ColumnDef<InventoryDataProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "assignAction",
    header: "Transaction Status",
    cell: ({ row }) => {
      const task: any = row?.original;
      const client: any = task?.clients?.find((cli: any) => cli.id === task?.userId);

      const handleChange = async (userId: string) => {
        const res: any = await updateUser(task?.id, userId, true);

        if (res?.error) {
          toast(res?.error)
        } else {
          toast("Inventory successfully transferred")
        }
      }

      return (
        <Select onValueChange={handleChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={client ? `Transfer to ${client?.name}` : "Select a client"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a user</SelectLabel>
              {task?.clients?.map((item: any) => (
                <SelectItem key={item.id} value={item.id}>{item?.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return null; // You may want to implement actions here
    },
  },
]

const DashboardDataTable = ({ data }: any) => {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div>
      <div className="flex justify-between w-full h-14 lg:h-16 items-center gap-4 border-b bg-gray-100/40 px-6">
        <div className="flex items-center gap-3 w-full">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search name..." value={(table?.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table?.getColumn("name")?.setFilterValue(event?.target?.value)}
              className="pl-8 max-w-sm outline-none focus:outline-none"
            />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }>
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })};
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Button onClick={() => signOut() }>Sign Out</Button>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between pt-3 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Inventory Data </h1>
        </div>
        <div >
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardDataTable

// // import React from 'react'

// // const ClientsData = ({data}: any) => {
// //   return (
// //     <div>ClientsData</div>
// //   )
// // };

// // export default ClientsData

// "use client"
// import * as React from "react"
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
// import AssignInventoryActions from "./AssignInventoryActions"
// import { InventoryDataProps } from "@/lib/interface"
// import ClientActions from "./ClientActions"

// import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
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
//     header: ({column})=>{
//         return (
//             <Button variant="ghost" onClick={()=>column.toggleSorting(column.getIsSorted()==="asc")}>
//                 Name <ArrowUpDown className="ml-2 h-4 w-4"/>
//             </Button>
//         )
//     },
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("name")}</div>
//     ),
// },

// {
//     accessorKey: "email",  // Fixed typo from "quantityt"
//     header:"Email",
//     cell: ({ row }) => (
//         <div className="lowercase line-clamp-2">{row.getValue("email")}</div>
//     ),
// },

// {
//     accessorKey: "password",  // Fixed typo from "quantityt"
//     header:"Password",
//     cell: ({ row }) => (
//         <div className="lowercase line-clamp-2">{row.getValue("password")}</div>
//     ),
// },

//   {
//     id: "actions",
//     header:"Transfer Inventory",
//     cell:({row})=> <ClientActions row={row} />,
// },
// ];

// const ClientInventory = ({data}:any) => {
//     const [sorting, setSorting] = React.useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   )
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({})
//   const [rowSelection, setRowSelection] = React.useState({})

//     const table = useReactTable({
//         data,
//         columns,
//         onSortingChange: setSorting,
//         onColumnFiltersChange: setColumnFilters,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         onColumnVisibilityChange: setColumnVisibility,
//         onRowSelectionChange: setRowSelection,
//         state: {
//           sorting,
//           columnFilters,
//           columnVisibility,
//           rowSelection,
//         },
//       })
//   return (
// <div className='w-full'>
// <div className="flex justify-between w-full h-14 lg:h-16 items-center gap-4 border-b bg-gray-100/40 px-6">
//           <div className="flex items-center gap-3 w-full">
//             <div className="relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
//               <Input placeholder="Search name..." value={(table?.getColumn("name")?.getFilterValue() as string) ?? ""}
//                 onChange={(event:any) => table?.getColumn("name")?.setFilterValue(event?.target?.value)}
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
//           <Button onClick={() => signOut()} type="submit">Sign Out</Button>
//         </div>
// <div className="p-6">
//             <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   )
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       </div>
//     </div>
//   )
// }

// export default ClientInventory

"use client"
import React, { useEffect, useState } from "react"
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
import { ArrowUpDown, ChevronDown, Search } from "lucide-react"

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
import ClientActions from "./ClientActions"
import { InventoryDataProps } from "@/lib/interface"

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "email",  // Fixed typo from "quantityt"
        header: "Email",
        cell: ({ row }) => (
            <div className="lowercase line-clamp-2">{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "password",  // Fixed typo from "quantityt"
        header: "Password",
        cell: ({ row }) => (
            <div className="lowercase line-clamp-2">{row.getValue("password")}</div>
        ),
    },
    {
        id: "actions",
        header: "Transfer Inventory",
        cell: ({ row }) => <ClientActions row={row} />,
    },
]

const ClientInventory = ({ data }: any) => {

    const [tableData, setTableData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [sorting, setSorting] = React.useState<SortingState>([])

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    useEffect(() => {
        const fetchData = async () => {
            // Handle the ReactPromise and resolve it
            if (data && data.value) {
                try {
                    // Parse the JSON string into an actual array of objects
                    const parsedData = JSON.parse(data.value)
                    setTableData(parsedData)
                } catch (error) {
                    console.error("Error parsing data:", error)
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchData()
    }, [data])

    console.log("Received data:", data)

    const table = useReactTable({
        data: tableData,
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
        <div className="w-full">
            <div className="flex justify-between w-full h-14 lg:h-16 items-center gap-4 border-b bg-gray-100/40 px-6">
                <div className="flex items-center gap-3 w-full">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search name..."
                            value={(table?.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event: any) => table?.getColumn("name")?.setFilterValue(event?.target?.value)}
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
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <Button onClick={() => signOut()} type="submit">Sign Out</Button>
            </div>

            <div className="p-6">
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
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ClientInventory

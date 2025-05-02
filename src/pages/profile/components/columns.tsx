import { PostData } from "@/@types/post";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<PostData>[] = [
  {
    accessorKey: "title",
    header: "Titulo"
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <Button 
      variant="ghost" 
      className="text-right"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      Criado em
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))

      return <div>{date.toLocaleString()}</div>
    }
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right">Atualizado em</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))

      return <div className="text-right">{date.toLocaleString()}</div>
    },
  },

  {
    id: "actions",
    cell: (/*{ row }*/) => {
      //const post = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="primary" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem>
              Visualizar Publicação
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar Publicação</DropdownMenuItem>
            <DropdownMenuItem>Apagar Publicação</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
];
import { PostData } from "@/@types/post";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

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
      size="sm"
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
        <DropdownMenu.Root positioning={{ strategy: "fixed" }} composite={true}>
          <DropdownMenu.Trigger>
            <Button variant="primary">...</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.ItemGroup>
              <DropdownMenu.ItemGroupLabel>Ações</DropdownMenu.ItemGroupLabel>
              <DropdownMenu.Separator />
              <DropdownMenu.Item value="view_post">
                  Ver publicação
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item value="edit_post">
                  Editar publicação
              </DropdownMenu.Item>
            </DropdownMenu.ItemGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )
    },
  }
];
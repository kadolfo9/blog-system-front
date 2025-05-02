import { PostData } from "@/@types/post";
import { Button } from "@/components/ui/button";
import { Menu } from "@ark-ui/react";
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
        <Menu.Root>
          <Menu.Trigger>
            <Button variant="primary">...</Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel>Ações</Menu.ItemGroupLabel>
                <Menu.Separator />
                <Menu.Item value="view_post">
                  Ver publicação
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item value="edit_post">
                  Editar publicação
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      )
    },
  }
];
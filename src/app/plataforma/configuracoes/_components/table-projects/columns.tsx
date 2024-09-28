"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { ColumnDef } from "@tanstack/react-table";

import { Avatar } from "@/components/ui/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/ui/dropdown";
import { Text } from "@/components/ui/text";
import { EllipsisVertical } from "lucide-react";
import { ProjectType } from "@/@types/project";

export type Case = {
  id: number;
};

export const columnsProjects: ColumnDef<ProjectType>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return (
        <div className="flex items-center">
          <div className="ml-4">
            <Text className="font-medium text-gray-950 dark:text-gray-100">
              {name}
            </Text>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: "",
  },
  {
    accessorKey: "role",
    header: "",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Dropdown>
          <DropdownButton aria-label="More options">
            <EllipsisVertical className="h-5 w-5 text-white" />
          </DropdownButton>
          <DropdownMenu>
            <DropdownItem href={`/plataforma/configuracoes?project=${id}`}>
              Editar
            </DropdownItem>
            <DropdownItem
              href={`/plataforma/configuracoes?deleteProject=${id}`}
            >
              Excluir
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    },
  },
];

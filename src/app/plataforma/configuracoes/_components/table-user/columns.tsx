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
import { UserType } from "@/@types/user";
import { EllipsisVertical } from "lucide-react";

export type Case = {
  id: number;
};

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return (
        <div className="flex items-center">
          <div className="h-11 w-11 flex-shrink-0">
            <Avatar
              slot="icon"
              initials={name[0] + name[1]}
              className="text-white"
              style={{
                backgroundColor: "black",
              }}
            />
          </div>
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
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
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
            <DropdownItem href={`/plataforma/configuracoes?user=${id}`}>
              Editar
            </DropdownItem>
            <DropdownItem href={`/plataforma/configuracoes?deleteUser=${id}`}>
              Excluir
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    },
  },
];

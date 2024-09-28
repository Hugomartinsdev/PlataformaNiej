"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { ColumnDef } from "@tanstack/react-table";

import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/ui/dropdown";
import { ArrowUpDown, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Case = {
  id: string;
  name: string;
};

export const columns: ColumnDef<Case>[] = [
  // {
  //   accessorKey: "id",
  //   header: "id",
  // },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <Dropdown>
          <DropdownButton variant={"secondary"} aria-label="More options">
            <EllipsisVertical className="h-5 w-5 text-black" />
          </DropdownButton>
          <DropdownMenu>
            {/*
            <DropdownItem href={`/convenios?id=${id}`}>Visualizar</DropdownItem>
            <DropdownItem href={`/convenios?delete=${id}`}>
              Excluir
            </DropdownItem>
            */}
            <DropdownItem href={`residentes/${id}`}>Visualizar</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    },
  },
];

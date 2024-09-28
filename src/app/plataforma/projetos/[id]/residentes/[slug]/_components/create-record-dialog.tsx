"use client";

import { CheckIcon, TrashIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";
import { z } from "zod";

import { Dialog } from "@/components/ui/dialog";
import { Divider } from "@/components/ui/divider";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { ButtonAnimated } from "@/components/ui/ButtonAnimated";
import { UserType } from "@/@types/user";
import { SignUp } from "@/actions/auth/sign-up";
import { toast } from "sonner";
import { UpdateUser } from "@/actions/auth/update-user";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ProjectType } from "@/@types/project";
import { AddMemberToProject } from "@/actions/add-member-to-project";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-shadcn";
import { NormalizeTextToSlug } from "@/lib/utils";

export default function CreateRecordDialog({
  idResident,
}: {
  idResident: string;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const router = useRouter();
  const searchParams = useSearchParams();

  const action = searchParams.get("action");

  const [select, setSelect] = useState("");

  function handleRedirectToRecord() {
    router.push(`${idResident}/fichas/${NormalizeTextToSlug(select)}/novo`);
  }

  const Content = () => (
    <div>
      <Heading>Ficha</Heading>
      <Divider soft className="my-2" />
      <div className="mt-6" />
      <Select
        value={select}
        onValueChange={setSelect}
        defaultValue="Triagem enfermagem"
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Triagem enfermagem">Triagem enfermagem</SelectItem>
          <SelectItem value="Atendimento Medico">Atendimento Médico</SelectItem>
          <SelectItem value="Triagem psicologia">Triagem psicologia</SelectItem>
          <SelectItem value="Triagem Nutricao">Triagem Nutrição</SelectItem>
          <SelectItem value="Sociodemografica">Sociodemográfica</SelectItem>
          <SelectItem value="Triagem Fisioterapia">
            Triagem Fisioterapia
          </SelectItem>
          <SelectItem value="Direito">Direito</SelectItem>
          <SelectItem value="Odontologia">Odontologia</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const ButtonEdit = () => (
    <Button
      type="submit"
      className="w-full"
      onClick={() => {
        handleRedirectToRecord();
      }}
    >
      Criar
    </Button>
  );

  if (isDesktop) {
    return (
      <Dialog
        open={!!action}
        onClose={() => {
          router.back();
        }}
      >
        <div className="flex h-[15rem] flex-col gap-4 overflow-auto">
          <Content />
          <div className="mt-3 flex w-full justify-end">
            <ButtonEdit />
          </div>
        </div>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={!!action}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DrawerContent className="px-4 pb-16">
        <Content />
        <div className="mt-4 flex flex-col gap-4">
          <ButtonEdit />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ButtonAnimated } from "@/components/ui/ButtonAnimated";
import { Divider } from "@/components/ui/divider";
import { Field, Fieldset, Label } from "@/components/ui/fieldset";
import { Subheading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";

// import { Case, columns } from "./table/columns";
// import { BulletinDataTable } from "./table/data-table";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-shadcn";
import { toast } from "sonner";
import { CreateResident } from "@/actions/create-resident";
import { UpdateResident } from "@/actions/update-resident";
// import SuccessDialog from "@/components/success-dialog";
// import { GetMedicResponse } from "@ydoc/contracts";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(3, "Nome deve ter no mínimo 3 caracteres"),
  socialName: z.string().optional(),
  motherName: z.string().optional(),
  birthDate: z.string().optional(),
  residenceInfo: z.string().optional(),
  genderIdentity: z.string().optional(),
  ethnicRacialIdentification: z.string().optional(),
  quilombola: z.string().optional(),
  susCardNumber: z.string().optional(),
  contactPhone: z.string().optional(),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  maritalStatus: z.string().optional(),
  dependents: z.string().optional(),
});

export type ResidentType = z.infer<typeof formSchema> & {
  id?: string;
};

export function FormResident({
  data,
  projectId,
}: {
  projectId: string;
  data: ResidentType | null | undefined;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      socialName: data?.socialName ?? "",
      motherName: data?.motherName ?? "",
      birthDate: data?.birthDate ?? "",
      residenceInfo: data?.residenceInfo ?? "",
      genderIdentity: data?.genderIdentity ?? "",
      ethnicRacialIdentification: data?.ethnicRacialIdentification ?? "",
      quilombola: data?.quilombola ?? "",
      susCardNumber: data?.susCardNumber ?? "",
      contactPhone: data?.contactPhone ?? "",
      cpf: data?.cpf ?? "",
      rg: data?.rg ?? "",
      maritalStatus: data?.maritalStatus ?? "",
      dependents: data?.dependents ?? "",
    },
  });

  async function handleCreateMedic(formData: z.infer<typeof formSchema>) {
    if (data) {
      try {
        await UpdateResident({
          resident: {
            ...formData,
            projectId,
            id: data.id,
          },
        });

        router.refresh();
        toast.success("Residente atualizado com sucesso");
      } catch (error) {
        alert("Erro ao atualizar procedimento");
        throw error;
      }

      return;
    }

    try {
      await CreateResident({
        resident: {
          ...formData,
          projectId,
        },
      });

      router.refresh();

      form.reset();

      toast.success("Residente criado com sucesso");
    } catch (error) {
      toast.error("Erro ao criar residente");
      throw error;
    }
  }

  return (
    <>
      <div className="mt-10">
        <Subheading>Informações básicas</Subheading>
        <Divider className="my-4" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateMedic)}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialName"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Nome Social</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="motherName"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Nome da mãe</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="residenceInfo"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Residência e Domicílio</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genderIdentity"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Qual a sua identidade de gênero?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mulher CIS">Mulher CIS</SelectItem>
                        <SelectItem value="Mulher Trans">
                          Mulher Trans
                        </SelectItem>
                        <SelectItem value="Homem CIS">Homem CIS</SelectItem>
                        <SelectItem value="Homem Trans">Homem Trans</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ethnicRacialIdentification"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Identificação Étnico-Racial</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Branca">Branca</SelectItem>
                        <SelectItem value="Preta">Preta</SelectItem>
                        <SelectItem value="Amarela">Amarela</SelectItem>
                        <SelectItem value="Parda">Parda</SelectItem>
                        <SelectItem value="Indígena">Indígena</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quilombola"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Você se considera Quilombola? Se sim, qual o nome da sua
                      comunidade?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="susCardNumber"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Você possui cartão SUS? Se sim, qual o número do cartão
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Telefone para contato</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rg"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>RG</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Estado Civil</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Solteiro(a)">Solteiro(a)</SelectItem>
                        <SelectItem value="Casado(a)">Casado(a)</SelectItem>
                        <SelectItem value="Separado(a)">Separado(a)</SelectItem>
                        <SelectItem value="Divorciado(a)">
                          Divorciado(a)
                        </SelectItem>
                        <SelectItem value="Viúvo(a)">Viúvo(a)</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dependents"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Possui filhos e/ou dependentes? Se sim, especificar
                      quantos
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8 flex">
              <ButtonAnimated
                type="submit"
                animated
                className="w-60"
                loader={<Loader className="h-6 w-6 animate-spin" />}
                success={
                  <div className="flex">
                    <CheckIcon className="h-6 w-6" />
                    <span className="ml-2">Salvo com sucesso!</span>
                  </div>
                }
                state={
                  form.formState.isSubmitSuccessful
                    ? "success"
                    : form.formState.isSubmitting
                      ? "loading"
                      : "idle"
                }
                disabled={
                  form.formState.isSubmitting ||
                  form.formState.isSubmitSuccessful
                }
              >
                Salvar
              </ButtonAnimated>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

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
import { Textarea } from "@/components/ui/textarea";
import { UpdateNursingTriage } from "@/actions/update-nursing-triage";
import { CreateNursingTriage } from "@/actions/create-nursing-triage";

const formSchema = z.object({
  mainComplaint: z.string().optional(),
  associatedSystemicDiseases: z.string().optional(),
  currentMedications: z.string().optional(),
  familyHistory: z.string().optional(),
  allergies: z.string().optional(),
  alcoholUse: z.string().optional(),
  smokingStatus: z.string().optional(),
  diet: z.string().optional(),
  waterIntake: z.string().optional(),
  bloodPressure: z.string().optional(),
  heartRate: z.string().optional(),
  respiratoryRate: z.string().optional(),
  temperature: z.string().optional(),
  oxygenSaturation: z.string().optional(),
  bloodGlucose: z.string().optional(),
  painScale: z.string().optional(),
  painLocation: z.string().optional(),
  generalObservations: z.string().optional(),
});

export type ResidentType = z.infer<typeof formSchema> & {
  id?: string;
};

export function FormResident({
  data,
  projectId,
  residentId,
}: {
  residentId: string;
  projectId: string;
  data: ResidentType | null | undefined;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainComplaint: data?.mainComplaint ?? "",
      associatedSystemicDiseases: data?.associatedSystemicDiseases ?? "",
      currentMedications: data?.currentMedications ?? "",
      familyHistory: data?.familyHistory ?? "",
      allergies: data?.allergies ?? "",
      alcoholUse: data?.alcoholUse ?? "",
      smokingStatus: data?.smokingStatus ?? "",
      diet: data?.diet ?? "",
      waterIntake: data?.waterIntake ?? "",
      bloodPressure: data?.bloodPressure ?? "",
      heartRate: data?.heartRate ?? "",
      respiratoryRate: data?.respiratoryRate ?? "",
      temperature: data?.temperature ?? "",
      oxygenSaturation: data?.oxygenSaturation ?? "",
      bloodGlucose: data?.bloodGlucose ?? "",
      painScale: data?.painScale ?? "",
      painLocation: data?.painLocation ?? "",
      generalObservations: data?.generalObservations ?? "",
    },
  });

  async function handleCreateMedic(formData: z.infer<typeof formSchema>) {
    if (data) {
      try {
        await UpdateNursingTriage({
          nursingTriage: {
            ...formData,
            id: data.id,
          },
        });

        router.refresh();
        toast.success("Ficha atualizada com sucesso");
      } catch (error) {
        alert("Erro ao atualizar procedimento");
        throw error;
      }

      return;
    }

    try {
      await CreateNursingTriage({
        nursingTriage: {
          ...formData,
          residentId: residentId,
          projectId,
        },
      });

      router.refresh();

      toast.success("Ficha criada com sucesso");

      setTimeout(() => {
        router.push(`/plataforma/projetos/${projectId}/residentes`);
      }, 1000);
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
                name="mainComplaint"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Queixa Principal:</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <Divider className="my-4" />

            <Subheading>Histórico Clínico:</Subheading>

            <Divider className="my-4" />

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
              <FormField
                control={form.control}
                name="associatedSystemicDiseases"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Doenças sistêmicas associadas:</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentMedications"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Medicações em uso:</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="familyHistory"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Antecedentes Familiares:</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <Divider className="my-4" />

            <Subheading>Fatores de risco:</Subheading>

            <Divider className="my-4" />

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Tem alergias? Sim, quais?</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alcoholUse"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>É etilista? Sim, quais?</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="smokingStatus"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>É tabagista? Sim, quais?</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diet"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Dieta - Adequada - Inadequada ( explique )
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
                name="waterIntake"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Ingestão Hídrica</FormLabel>
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
                        <SelectItem value="Adequada">Adequada</SelectItem>
                        <SelectItem value="Inadequada">Inadequada</SelectItem>
                        <SelectItem value="Desidratação">
                          Desidratação
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Divider className="my-4" />

            <Subheading>Sinais Vitais:</Subheading>

            <Divider className="my-4" />

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
              <FormField
                control={form.control}
                name="bloodPressure"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Pressão Arterial (PA):</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="heartRate"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Frequência Cardíaca (FC):</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="respiratoryRate"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Frequência Respiratória (FR):</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Temperatura (T):</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="oxygenSaturation"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Saturação de O2:</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bloodGlucose"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Glicemia Capilar:</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="painScale"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Escala de Dor (0 a 10):</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="painLocation"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Escala de Dor (0 a 10):</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="generalObservations"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Observações Gerais:</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="mt-2" />
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

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

import { Textarea } from "@/components/ui/textarea";
import { UpdateNursingTriage } from "@/actions/update-nursing-triage";
import { CreateNursingTriage } from "@/actions/create-nursing-triage";
import { UpdateMedicalCare } from "@/actions/update-medical-care";
import { CreateMedicalCare } from "@/actions/create-medical-care";

const formSchema = z.object({
  weight: z.string().optional(),
  height: z.string().optional(),
  bmi: z.string().optional(),
  mainComplaint: z.string().optional(),
  evolutive: z.string().optional(),
  isda: z.string().optional(),
  physicalExam: z.string().optional(),
  geral: z.string().optional(),
  cardiovascular: z.string().optional(),
  pulmonary: z.string().optional(),
  abdomen: z.string().optional(),
  diagnosticHypothesis: z.string().optional(),
  treatmentPlan: z.string().optional(),
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
      weight: data?.weight ?? "",
      height: data?.height ?? "",
      bmi: data?.bmi ?? "",
      mainComplaint: data?.mainComplaint ?? "",
      evolutive: data?.evolutive ?? "",
      isda: data?.isda ?? "",
      physicalExam: data?.physicalExam ?? "",
      geral: data?.geral ?? "",
      cardiovascular: data?.cardiovascular ?? "",
      pulmonary: data?.pulmonary ?? "",
      abdomen: data?.abdomen ?? "",
      diagnosticHypothesis: data?.diagnosticHypothesis ?? "",
      treatmentPlan: data?.treatmentPlan ?? "",
    },
  });

  async function handleCreateMedic(formData: z.infer<typeof formSchema>) {
    if (data) {
      try {
        await UpdateMedicalCare({
          medicalCare: {
            ...formData,
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
      await CreateMedicalCare({
        medicalCare: {
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
                name="weight"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Peso:</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Altura:</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bmi"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>IMC:</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="evolutive"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Evolução:</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isda"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>ISDA:</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="physicalExam"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Exame Físico:</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="geral"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Geral:</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardiovascular"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>AC:</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pulmonary"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>AP:</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="abdomen"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>ABD:</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diagnosticHypothesis"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Hipótese diagnóstica:</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="mt-2" />
                    </FormControl>

                    <FormMessage className="mt-1 !text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="treatmentPlan"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Conduta:</FormLabel>
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

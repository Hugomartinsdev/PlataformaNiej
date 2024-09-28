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
import { CreateSociodemographi } from "@/actions/create-sociodemographic";

const formSchema = z.object({
  houseElectricity: z.string().optional(),
  stableElectricity: z.string().optional(),
  stableElectricityObservations: z.string().optional(),
  bathroomCount: z.string().optional(),
  sewerSystem: z.string().optional(),
  garbageDisposal: z.string().optional(),
  internetConnection: z.string().optional(),
  drinkingWaterSource: z.string().optional(),
  domesticWaterSource: z.string().optional(),
  touristActivity: z.string().optional(),
  entrepreneurshipIncentives: z.string().optional(),
  ownTransportation: z.string().optional(),
  cooperativeKnowledge: z.string().optional(),
  localCollectives: z.string().optional(),
  mainIncomeSource: z.string().optional(),
  additionalIncomeSource: z.string().optional(),
  monthlyFamilyIncome: z.string().optional(),
  entrepreneurshipDesire: z.string().optional(),
  entrepreneurshipTraining: z.string().optional(),
  trainingInterest: z.string().optional(),
  publicSecurity: z.string().optional(),
  literacyStatus: z.string().optional(),
  educationLevel: z.string().optional(),
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
      houseElectricity: data?.houseElectricity ?? "",
      stableElectricity: data?.stableElectricity ?? "",
      stableElectricityObservations: data?.stableElectricityObservations ?? "",
      bathroomCount: data?.bathroomCount ?? "",
      sewerSystem: data?.sewerSystem ?? "",
      garbageDisposal: data?.garbageDisposal ?? "",
      internetConnection: data?.internetConnection ?? "",
      drinkingWaterSource: data?.drinkingWaterSource ?? "",
      domesticWaterSource: data?.domesticWaterSource ?? "",
      touristActivity: data?.touristActivity ?? "",
      entrepreneurshipIncentives: data?.entrepreneurshipIncentives ?? "",
      ownTransportation: data?.ownTransportation ?? "",
      cooperativeKnowledge: data?.cooperativeKnowledge ?? "",
      localCollectives: data?.localCollectives ?? "",
      mainIncomeSource: data?.mainIncomeSource ?? "",
      additionalIncomeSource: data?.additionalIncomeSource ?? "",
      monthlyFamilyIncome: data?.monthlyFamilyIncome ?? "",
      entrepreneurshipDesire: data?.entrepreneurshipDesire ?? "",
      entrepreneurshipTraining: data?.entrepreneurshipTraining ?? "",
      trainingInterest: data?.trainingInterest ?? "",
      publicSecurity: data?.publicSecurity ?? "",
      literacyStatus: data?.literacyStatus ?? "",
      educationLevel: data?.educationLevel ?? "",
    },
  });

  async function handleCreateMedic(formData: z.infer<typeof formSchema>) {
    if (data) {
      try {
        // await UpdateMedicalCare({
        //   medicalCare: {
        //     ...formData,
        //   },
        // });
        //
        throw new Error("Not implemented");

        router.refresh();
        toast.success("Ficha atualizada com sucesso");
      } catch (error) {
        alert("Erro ao atualizar procedimento");
        throw error;
      }

      return;
    }

    try {
      await CreateSociodemographi({
        sociodemographic: {
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
                name="houseElectricity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Sua casa possui energia elétrica? Se sim, qual o tipo de
                      energia?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stableElectricity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      A energia é fornecida de maneira estável?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stableElectricityObservations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Observações sobre a estabilidade da energia:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bathroomCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantos banheiros tem na sua casa?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sewerSystem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Para onde vai o esgoto do banheiro?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="garbageDisposal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>O lixo deste domicílio é…</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="internetConnection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sua casa possui conexão à internet?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="drinkingWaterSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>De onde vem a água que você bebe?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="domesticWaterSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      De onde vem a água que você usa para fins domésticos?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="touristActivity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Onde você mora existe atividade turística?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="entrepreneurshipIncentives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Há incentivos para empreender na sua região?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ownTransportation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Em sua casa, vocês possuem transporte próprio?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cooperativeKnowledge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Você já ouviu falar de cooperativismo e associação? Se
                      sim, você tem interesse em algum dos dois?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="localCollectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Existem cooperativas, associações ou outros tipos de
                      coletivos na sua localidade? Se sim, qual?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mainIncomeSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Qual a sua principal fonte de renda? Se tiver
                      empreendimento próprio, especificar:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalIncomeSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Possui alguma outra fonte de renda? Se sim, especifique:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlyFamilyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual sua renda familiar mensal?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="entrepreneurshipDesire"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Você tem vontade de empreender?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="entrepreneurshipTraining"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Você já participou de algum programa de capacitação ou
                      treinamento em empreendedorismo?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trainingInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Caso fizéssemos ações de capacitações, você teria
                      interesse em participar?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publicSecurity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Existe suporte em relação à segurança pública na sua
                      localidade?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="literacyStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Você sabe ler e escrever?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="educationLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual a sua escolaridade?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
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

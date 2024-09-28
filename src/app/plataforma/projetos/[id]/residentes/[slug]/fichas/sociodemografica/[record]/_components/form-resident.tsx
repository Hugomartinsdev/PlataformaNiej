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
              Sua casa possui energia elétrica? Se sim, qual o tipo de energia?
            </FormLabel>
            <br />
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value=" "></SelectItem>
                <SelectItem value="elétrica comum (pública)">Elétrica comum (pública)</SelectItem>
                <SelectItem value="energia solar">Energia solar</SelectItem>
                <SelectItem value="gerador movido a diesel">Gerador movido a diesel</SelectItem>
              </SelectContent>
            </Select>
            <Input {...field} placeholder="Outro" />
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
            <br />
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="não">Não</SelectItem>
              </SelectContent>
            </Select>
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
            <br />
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
            <br />
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="mais">Mais</SelectItem>
              </SelectContent>
            </Select>
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
            <br />
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value=" "></SelectItem>
                <SelectItem value="rede geral">Rede geral</SelectItem>
                <SelectItem value="fossa séptica">Fossa séptica</SelectItem>
                <SelectItem value="fossa rudimentar">Fossa rudimentar</SelectItem>
                <SelectItem value="vala">Vala</SelectItem>
                <SelectItem value="rio">Rio</SelectItem>
              </SelectContent>
            </Select>
            <Input {...field} placeholder="Outro" />
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
            <br />
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value=" "></SelectItem>
                <SelectItem value="coletado">Coletado pela prefeitura</SelectItem>
                <SelectItem value="queimado">Queimado</SelectItem>
                <SelectItem value="enterrado">Enterrado</SelectItem>
                <SelectItem value="jogado">Jogado em terreno baldio</SelectItem>
              </SelectContent>
            </Select>
            <Input {...field} placeholder="Outro" />
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
            <br />
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="não">Não</SelectItem>
              </SelectContent>
            </Select>
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
            <br />
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value=" "></SelectItem>
                <SelectItem value="poço artesiano">Poço artesiano</SelectItem>
                <SelectItem value="nascente">Nascente</SelectItem>
                <SelectItem value="rede pública">Rede pública</SelectItem>
                <SelectItem value="água da chuva">Água da chuva armazenada</SelectItem>
                <SelectItem value="rio">Rio</SelectItem>
                <SelectItem value="compra de água">Compra de água</SelectItem>
              </SelectContent>
            </Select>
            <Input {...field} placeholder="Outro" />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="domesticWaterSource"
        render={({ field }) => (
          <FormItem>
            <FormLabel>De onde vem a água que você usa para fins domésticos?</FormLabel>
            <br />
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value=" "></SelectItem>
                <SelectItem value="poço artesiano">Poço artesiano</SelectItem>
                <SelectItem value="nascente">Nascente</SelectItem>
                <SelectItem value="rede pública">Rede pública</SelectItem>
                <SelectItem value="água da chuva">Água da chuva armazenada</SelectItem>
                <SelectItem value="rio">Rio</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="touristActivity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Onde você mora existe atividade turística?</FormLabel>
            <br />
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="não">Não</SelectItem>
              </SelectContent>
            </Select>
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
      <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Sim">Sim</SelectItem>
          <SelectItem value="Não">Não</SelectItem>
          <SelectItem value="Não Sei">Não Sei</SelectItem>
        </SelectContent>
      </Select>
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
      <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Sim">Sim</SelectItem>
          <SelectItem value="Não">Não</SelectItem>
        </SelectContent>
      </Select>
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
        Você já ouviu falar de cooperativismo e associação? Se sim, você tem interesse em algum dos dois?
      </FormLabel>
      <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Sim, já ouvi falar de cooperativismo">
            Sim, já ouvi falar de cooperativismo
          </SelectItem>
          <SelectItem value="Sim, já ouvi falar de associação">
            Sim, já ouvi falar de associação
          </SelectItem>
          <SelectItem value="Sim, já ouvi falar de ambos">
            Sim, já ouvi falar de ambos
          </SelectItem>
          <SelectItem value="Não ouvi falar de nenhum dos dois">
            Não ouvi falar de nenhum dos dois
          </SelectItem>
        </SelectContent>
      </Select>
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
        Existem cooperativas, associações ou outros tipos de coletivos na sua localidade? Se sim, qual?
      </FormLabel>
      <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value=" "></SelectItem>
          <SelectItem value="Sim">Sim</SelectItem>
          <SelectItem value="Não">Não</SelectItem>
          <SelectItem value="Não Sei">Não Sei</SelectItem>
        </SelectContent>
      </Select>
      <Input {...field} placeholder="Se sim, Qual?" />
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
        Qual a sua principal fonte de renda? Se tiver empreendimento próprio, especificar:
      </FormLabel>
      <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value=" "></SelectItem>
          <SelectItem value="Emprego Formal (CLT)">
            Emprego Formal (CLT)
          </SelectItem>
          <SelectItem value="Profissional Autônomo">
            Profissional Autônomo
          </SelectItem>
          <SelectItem value="Empreendimento Próprio">
            Empreendimento Próprio
          </SelectItem>
        </SelectContent>
      </Select>
      <Input {...field} placeholder="Outro" />
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
      <br />
      <Input {...field} />
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="monthlyFamilyIncome"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Qual sua renda familiar mensal?
      </FormLabel>
      <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Menos de 1 salário mínimo">
            Menos de 1 salário mínimo
          </SelectItem>
          <SelectItem value="De 1 a 3 salários mínimos">
            De 1 a 3 salários mínimos
          </SelectItem>
          <SelectItem value="De 3 a 5 salários mínimos">
            De 3 a 5 salários mínimos
          </SelectItem>
          <SelectItem value="6 salários mínimos ou mais">
            6 salários mínimos ou mais
          </SelectItem>
          <SelectItem value="Não sabe quanto ganha">
            Não sabe quanto ganha
          </SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="entrepreneurshipDesire"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você tem vontade de empreender?
      </FormLabel>
      <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Sim">Sim</SelectItem>
          <SelectItem value="Não">Não</SelectItem>
          <SelectItem value="Já tenho o meu próprio negócio">
            Já tenho o meu próprio negócio
          </SelectItem>
        </SelectContent>
      </Select>
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
        Você já participou de algum programa de capacitação ou treinamento em empreendedorismo?
      </FormLabel>
      <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Sim">Sim</SelectItem>
          <SelectItem value="Não">Não</SelectItem>
        </SelectContent>
      </Select>
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
        Caso fizéssemos ações de capacitações, você teria interesse em participar?
      </FormLabel>
      <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Sim">Sim</SelectItem>
          <SelectItem value="Não">Não</SelectItem>
        </SelectContent>
      </Select>
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
        Existe suporte em relação à segurança pública na sua localidade?
      </FormLabel>
      <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Sim">Sim</SelectItem>
          <SelectItem value="Não">Não</SelectItem>
        </SelectContent>
      </Select>
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
      <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Sei ler e escrever">Sei ler e escrever</SelectItem>
          <SelectItem value="Sei apenas ler">Sei apenas ler</SelectItem>
          <SelectItem value="Sei apenas escrever">Sei apenas escrever</SelectItem>
          <SelectItem value="Não sei ler e nem sei escrever">
            Não sei ler e nem sei escrever
          </SelectItem>
        </SelectContent>
      </Select>
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
      <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Ensino Fundamental Incompleto">
            Ensino Fundamental Incompleto
          </SelectItem>
          <SelectItem value="Ensino Fundamental Completo">
            Ensino Fundamental Completo
          </SelectItem>
          <SelectItem value="Ensino Médio Incompleto">
            Ensino Médio Incompleto
          </SelectItem>
          <SelectItem value="Ensino Médio Completo">
            Ensino Médio Completo
          </SelectItem>
          <SelectItem value="Ensino Superior Incompleto">
            Ensino Superior Incompleto
          </SelectItem>
          <SelectItem value="Ensino Superior Completo">
            Ensino Superior Completo
          </SelectItem>
          <SelectItem value="Pós Graduação">Pós Graduação</SelectItem>
          <SelectItem value="Mestrado">Mestrado</SelectItem>
          <SelectItem value="Doutorado">Doutorado</SelectItem>
        </SelectContent>
      </Select>
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
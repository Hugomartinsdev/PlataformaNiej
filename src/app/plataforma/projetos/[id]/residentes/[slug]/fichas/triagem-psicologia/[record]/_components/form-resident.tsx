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
import { UpdatePsychologyTriage } from "@/actions/update-psychology-triage";
import { CreatePsychologyTriage } from "@/actions/create-psychology-triage";

const formSchema = z.object({
  leisureOpportunitiesEvaluation: z.string().optional(),
  sleepEvaluation: z.string().optional(),
  dietEvaluation: z.string().optional(),
  physicalActivity: z.string().optional(),
  routineDescription: z.string().optional(),
  personalTimeWellBeing: z.string().optional(),
  currentFeelings: z.string().optional(),
  supportSystem: z.string().optional(),
  currentFeelingDescription: z.string().optional(),
  stressLevel: z.string().optional(),
  stressCoping: z.string().optional(),
  nervousnessFrequency: z.string().optional(),
  sadnessFrequency: z.string().optional(),
  psychologicalCare: z.string().optional(),
  psychiatricCare: z.string().optional(),
  psychiatricMedicationUse: z.string().optional(),
  voluntaryPsychologicalCare: z.string().optional(),
  interactionObservations: z.string().optional(),
  psychologyTeamGuidance: z.string().optional(),
  communitySuggestions: z.string().optional(),
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
      leisureOpportunitiesEvaluation:
        data?.leisureOpportunitiesEvaluation ?? "",
      sleepEvaluation: data?.sleepEvaluation ?? "",
      dietEvaluation: data?.dietEvaluation ?? "",
      physicalActivity: data?.physicalActivity ?? "",
      routineDescription: data?.routineDescription ?? "",
      personalTimeWellBeing: data?.personalTimeWellBeing ?? "",
      currentFeelings: data?.currentFeelings ?? "",
      supportSystem: data?.supportSystem ?? "",
      currentFeelingDescription: data?.currentFeelingDescription ?? "",
      stressLevel: data?.stressLevel ?? "",
      stressCoping: data?.stressCoping ?? "",
      nervousnessFrequency: data?.nervousnessFrequency ?? "",
      sadnessFrequency: data?.sadnessFrequency ?? "",
      psychologicalCare: data?.psychologicalCare ?? "",
      psychiatricCare: data?.psychiatricCare ?? "",
      psychiatricMedicationUse: data?.psychiatricMedicationUse ?? "",
      voluntaryPsychologicalCare: data?.voluntaryPsychologicalCare ?? "",
      interactionObservations: data?.interactionObservations ?? "",
      psychologyTeamGuidance: data?.psychologyTeamGuidance ?? "",
      communitySuggestions: data?.communitySuggestions ?? "",
    },
  });

  async function handleCreateMedic(formData: z.infer<typeof formSchema>) {
    if (data) {
      try {
        await UpdatePsychologyTriage({
          psychologyTriage: {
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
      await CreatePsychologyTriage({
        psychologyTriage: {
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
  <Subheading>Aspectos gerais</Subheading>
  <Divider className="my-4" />

  <Form {...form}>
    <form onSubmit={form.handleSubmit(handleCreateMedic)}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
        
        <FormField
          control={form.control}
          name="leisureOpportunitiesEvaluation"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Como você avalia suas oportunidades de lazer? 
                <br />
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Muito ruins">Muito ruins</SelectItem>
                  <SelectItem value="Ruins">Ruins</SelectItem>
                  <SelectItem value="Nem ruins, nem boas">Nem ruins, nem boas</SelectItem>
                  <SelectItem value="Boas">Boas</SelectItem>
                  <SelectItem value="Muito boas">Muito boas</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="mt-1 !text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sleepEvaluation"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Como você avalia seu sono? Apresenta dificuldades para dormir? (Insônia/ Hipersonia)
                <br />
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Muito ruins">Muito ruins</SelectItem>
                  <SelectItem value="Ruins">Ruins</SelectItem>
                  <SelectItem value="Nem ruins, nem boas">Nem ruins, nem boas</SelectItem>
                  <SelectItem value="Boas">Boas</SelectItem>
                  <SelectItem value="Muito boas">Muito boas</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="mt-1 !text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dietEvaluation"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Como você avalia a sua alimentação?
                <br />
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Muito ruins">Muito ruins</SelectItem>
                  <SelectItem value="Ruins">Ruins</SelectItem>
                  <SelectItem value="Nem ruins, nem boas">Nem ruins, nem boas</SelectItem>
                  <SelectItem value="Boas">Boas</SelectItem>
                  <SelectItem value="Muito boas">Muito boas</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="mt-1 !text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="physicalActivity"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Você realiza alguma atividade física?
                <br />
              </FormLabel>
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
              <Textarea {...field} className="mt-2" placeholder="Se sim, quais?" />
              <FormMessage className="mt-1 !text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="routineDescription"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Como você descreveria a sua rotina?
                <br />
              </FormLabel>
              <FormControl>
                <Textarea {...field} className="mt-2" />
              </FormControl>
              <FormMessage className="mt-1 !text-red-500" />
            </FormItem>
          )}
        />


<Divider className="my-4" />

<Subheading>Autocuidado</Subheading>

<Divider className="my-4" />

<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
  <FormField
    control={form.control}
    name="personalTimeWellBeing"
    render={({ field }) => (
      <FormItem className="col-span-2">
        <FormLabel>
          Você consegue ter algum tempo para si, para fazer alguma coisa que lhe gere bem estar?
          <br />
        </FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Sim">Sim</SelectItem>
            <SelectItem value="Não">Não</SelectItem>
            <SelectItem value="Às vezes">Às vezes</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage className="mt-1 !text-red-500" />
      </FormItem>
    )}
  />

  <FormField
    control={form.control}
    name="currentFeelings"
    render={({ field }) => (
      <FormItem className="col-span-2">
        <FormLabel>
          Atualmente, você tem mais sentimentos bons ou ruins em sua vida?
          <br />
        </FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Bons">Bons</SelectItem>
            <SelectItem value="Ruins">Ruins</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage className="mt-1 !text-red-500" />
      </FormItem>
    )}
  />
</div>

<Divider className="my-4" />

<Subheading>Rede de Apoio</Subheading>

<Divider className="my-4" />

  <FormField
  control={form.control}
  name="personalTimeWellBeing"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>
        Você consegue ter algum tempo para si, para fazer alguma coisa que lhe gere bem estar?
        <br />
      </FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Sim">Sim</SelectItem>
          <SelectItem value="Não">Não</SelectItem>
          <SelectItem value="Às vezes">Às vezes</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage className="mt-1 !text-red-500" />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="currentFeelings"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>
        Atualmente, você tem mais sentimentos bons ou ruins em sua vida?
        <br />
      </FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Bons">Bons</SelectItem>
          <SelectItem value="Ruins">Ruins</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage className="mt-1 !text-red-500" />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="currentFeelingDescription"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>
        Qual sentimento melhor descreve como você está se sentindo hoje?
        <br />
      </FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Alegria">Alegria</SelectItem>
          <SelectItem value="Tristeza">Tristeza</SelectItem>
          <SelectItem value="Medo / Preocupação">Medo / Preocupação</SelectItem>
          <SelectItem value="Desespero">Desespero</SelectItem>
          <SelectItem value="Ansiedade">Ansiedade</SelectItem>
          <SelectItem value="Raiva">Raiva</SelectItem>
          <SelectItem value="Tranquilidade">Tranquilidade</SelectItem>
          <SelectItem value="Outro">Outro</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage className="mt-1 !text-red-500" />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="stressLevel"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>
        Como você avalia seu nível de estresse, de 0 a 10?
        <br />
      </FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {Array.from({ length: 11 }, (_, i) => (
            <SelectItem key={i} value={String(i)}>
              {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage className="mt-1 !text-red-500" />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="stressCoping"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>
        Como você lida com esse estresse?
        <br />
      </FormLabel>
      <FormControl>
        <Textarea {...field} className="mt-2" placeholder="Descreva como você lida com o estresse" />
      </FormControl>
      <FormMessage className="mt-1 !text-red-500" />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="nervousnessFrequency"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>
        De 0 a 10, com que frequência você se sente nervoso?
        <br />
      </FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {Array.from({ length: 11 }, (_, i) => (
            <SelectItem key={i} value={String(i)}>
              {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage className="mt-1 !text-red-500" />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="sadnessFrequency"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>
        De 0 a 10, com que frequência você se sente triste, sem energia, sem esperança e desmotivado?
        <br />
      </FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {Array.from({ length: 11 }, (_, i) => (
            <SelectItem key={i} value={String(i)}>
              {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage className="mt-1 !text-red-500" />
    </FormItem>
  )}
/>


<Divider className="my-4" />

<Subheading>Saúde mental / Condição emocional</Subheading>

<Divider className="my-4" />

  <FormField
    control={form.control}
    name="currentFeelingDescription"
    render={({ field }) => (
      <FormItem className="col-span-2">
        <FormLabel>
          Qual sentimento melhor descreve como você está se sentindo hoje?
          <br />
        </FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Alegria">Alegria</SelectItem>
            <SelectItem value="Tristeza">Tristeza</SelectItem>
            <SelectItem value="Medo / Preocupação">Medo / Preocupação</SelectItem>
            <SelectItem value="Desespero">Desespero</SelectItem>
            <SelectItem value="Ansiedade">Ansiedade</SelectItem>
            <SelectItem value="Raiva">Raiva</SelectItem>
            <SelectItem value="Tranquilidade">Tranquilidade</SelectItem>
            <SelectItem value="Outro">Outro</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage className="mt-1 !text-red-500" />
      </FormItem>
    )}
  />

  <FormField
    control={form.control}
    name="stressLevel"
    render={({ field }) => (
      <FormItem className="col-span-2">
        <FormLabel>
          Como você avalia seu nível de estresse, de 0 a 10?
          <br />
        </FormLabel>
        <FormControl>
          <Textarea {...field} className="mt-2" placeholder="Nível de estresse" />
        </FormControl>
        <FormMessage className="mt-1 !text-red-500" />
      </FormItem>
    )}
  />

  <FormField
    control={form.control}
    name="stressCoping"
    render={({ field }) => (
      <FormItem className="col-span-2">
        <FormLabel>
          Como você lida com esse estresse?
          <br />
        </FormLabel>
        <FormControl>
          <Textarea {...field} className="mt-2" placeholder="Estratégias de enfrentamento" />
        </FormControl>
        <FormMessage className="mt-1 !text-red-500" />
      </FormItem>
    )}
  />

  <FormField
    control={form.control}
    name="nervousnessFrequency"
    render={({ field }) => (
      <FormItem className="col-span-2">
        <FormLabel>
          De 0 a 10, com que frequência você se sente nervoso?
          <br />
        </FormLabel>
        <FormControl>
          <Textarea {...field} className="mt-2" placeholder="Frequência de nervosismo" />
        </FormControl>
        <FormMessage className="mt-1 !text-red-500" />
      </FormItem>
    )}
  />

  <FormField
    control={form.control}
    name="sadnessFrequency"
    render={({ field }) => (
      <FormItem className="col-span-2">
        <FormLabel>
          De 0 a 10, com que frequência você se sente triste, sem energia, sem esperança e desmotivado?
          <br />
        </FormLabel>
        <FormControl>
          <Textarea {...field} className="mt-2" placeholder="Frequência de tristeza" />
        </FormControl>
        <FormMessage className="mt-1 !text-red-500" />
      </FormItem>
    )}
  />

  <FormField
    control={form.control}
    name="psychologicalCare"
    render={({ field }) => (
      <FormItem className="col-span-2">
        <FormLabel>
          Já fez ou faz atendimento psicológico?
          <br />
        </FormLabel>
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
        <Textarea {...field} className="mt-2" placeholder="Se sim, por quanto tempo?" />
        <FormMessage className="mt-1 !text-red-500" />
      </FormItem>
    )}
  />


              <FormField
  control={form.control}
  name="psychiatricCare"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>
        Já fez ou faz atendimento psiquiátrico?
        <br />
      </FormLabel>
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
      <Textarea {...field} className="mt-2" placeholder="Se sim, por que foi necessário?" />
      <FormMessage className="mt-1 !text-red-500" />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="psychiatricMedicationUse"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>
        Atualmente, faz uso de alguma medicação psiquiátrica?
        <br />
      </FormLabel>
      <FormControl>
        <Textarea {...field} className="mt-2" placeholder="Exemplo: Rivotril, Escitalopram, Sertralina" />
      </FormControl>
      <FormMessage className="mt-1 !text-red-500" />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="voluntaryPsychologicalCare"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>
        Você buscaria, voluntariamente, atendimento psicológico, caso fosse de forma gratuita?
        <br />
      </FormLabel>
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
      <FormMessage className="mt-1 !text-red-500" />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="interactionObservations"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>
        Observações importantes percebidas na nossa interação com você (postura, comportamento, apresentação, etc.)
        <br />
      </FormLabel>
      <FormControl>
        <Textarea {...field} className="mt-2" placeholder="Escreva suas observações" />
      </FormControl>
      <FormMessage className="mt-1 !text-red-500" />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="psychologyTeamGuidance"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>
        Há alguma orientação específica que você gostaria de receber da equipe de Psicologia?
        <br />
      </FormLabel>
      <FormControl>
        <Textarea {...field} className="mt-2" placeholder="Ex: depressão, ansiedade, autocuidados" />
      </FormControl>
      <FormMessage className="mt-1 !text-red-500" />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="communitySuggestions"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>
        Na sua opinião, há algo que nós, do projeto, poderíamos ofertar para a comunidade?
        <br />
      </FormLabel>
      <FormControl>
        <Textarea {...field} className="mt-2" placeholder="Escreva suas sugestões" />
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

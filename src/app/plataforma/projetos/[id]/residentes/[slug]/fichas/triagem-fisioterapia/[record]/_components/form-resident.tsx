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
import { CreateMedicalCare } from "@/actions/create-medical-care";
import { UpdateMedicalCare } from "@/actions/update-medical-care";
import { UpdatemedicalEvaluation } from "@/actions/update-fisio";
import { CreateFisio } from "@/actions/create-fisio";

const formSchema = z.object({
  occupation: z.string().optional(),
  responsible: z.string().optional(),
  kinship: z.string().optional(),
  clinicalDiagnosis: z.string().optional(),
  mainComplaint: z.string().optional(),
  functionalComplaint: z.string().optional(),
  currentDiseaseHistory: z.string().optional(),
  medications: z.string().optional(),
  personalHistory: z.string().optional(),
  lifestyleHabits: z.string().optional(),
  painAssessment: z.string().optional(),
  painIntensity: z.string().optional(),
  painLocation: z.string().optional(),
  painFrequency: z.string().optional(),
  painCharacteristics: z.string().optional(),
  painInterference: z.string().optional(),
  patientPresentation: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  bmi: z.string().optional(),
  bloodPressure: z.string().optional(),
  heartRate: z.string().optional(),
  respiratoryRate: z.string().optional(),
  oxygenSaturation: z.string().optional(),
  pulmonaryAuscultation: z.string().optional(),
  posturalAssessment: z.string().optional(),
  specificInspection: z.string().optional(),
  neurologicalExam: z.string().optional(),
  ashworthScale: z.string().optional(),
  rombergTest: z.string().optional(),
  unilateralBalanceTest: z.string().optional(),
  getUpAndGoTest: z.string().optional(),
  katzIndex: z.string().optional(),
  fallHistory: z.string().optional(),
  fearOfFalling: z.string().optional(),
  timeUpAndGo: z.string().optional(),
  fallRisk: z.string().optional(),
  tandemGait: z.string().optional(),
  obstetricHistory: z.string().optional(),
  gynecologicalHistory: z.string().optional(),
  urinarySymptoms: z.string().optional(),
  sexualFunction: z.string().optional(),
  anorectalEvaluation: z.string().optional(),
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
      occupation: data?.occupation ?? "",
      responsible: data?.responsible ?? "",
      kinship: data?.kinship ?? "",
      clinicalDiagnosis: data?.clinicalDiagnosis ?? "",
      mainComplaint: data?.mainComplaint ?? "",
      functionalComplaint: data?.functionalComplaint ?? "",
      currentDiseaseHistory: data?.currentDiseaseHistory ?? "",
      medications: data?.medications ?? "",
      personalHistory: data?.personalHistory ?? "",
      lifestyleHabits: data?.lifestyleHabits ?? "",
      painAssessment: data?.painAssessment ?? "",
      painIntensity: data?.painIntensity ?? "",
      painLocation: data?.painLocation ?? "",
      painFrequency: data?.painFrequency ?? "",
      painCharacteristics: data?.painCharacteristics ?? "",
      painInterference: data?.painInterference ?? "",
      patientPresentation: data?.patientPresentation ?? "",
      weight: data?.weight ?? "",
      height: data?.height ?? "",
      bmi: data?.bmi ?? "",
      bloodPressure: data?.bloodPressure ?? "",
      heartRate: data?.heartRate ?? "",
      respiratoryRate: data?.respiratoryRate ?? "",
      oxygenSaturation: data?.oxygenSaturation ?? "",
      pulmonaryAuscultation: data?.pulmonaryAuscultation ?? "",
      posturalAssessment: data?.posturalAssessment ?? "",
      specificInspection: data?.specificInspection ?? "",
      neurologicalExam: data?.neurologicalExam ?? "",
      ashworthScale: data?.ashworthScale ?? "",
      rombergTest: data?.rombergTest ?? "",
      unilateralBalanceTest: data?.unilateralBalanceTest ?? "",
      getUpAndGoTest: data?.getUpAndGoTest ?? "",
      katzIndex: data?.katzIndex ?? "",
      fallHistory: data?.fallHistory ?? "",
      fearOfFalling: data?.fearOfFalling ?? "",
      timeUpAndGo: data?.timeUpAndGo ?? "",
      fallRisk: data?.fallRisk ?? "",
      tandemGait: data?.tandemGait ?? "",
      obstetricHistory: data?.obstetricHistory ?? "",
      gynecologicalHistory: data?.gynecologicalHistory ?? "",
      urinarySymptoms: data?.urinarySymptoms ?? "",
      sexualFunction: data?.sexualFunction ?? "",
      anorectalEvaluation: data?.anorectalEvaluation ?? "",
    },
  });

  async function handleCreateMedic(formData: z.infer<typeof formSchema>) {
    if (data) {
      try {
        throw new Error("Not implemented");
        // await UpdateMedicalCare({
        //   medicalCare: {
        //     ...formData,
        //   },
        // });

        router.refresh();
        toast.success("Ficha atualizada com sucesso");
      } catch (error) {
        alert("Erro ao atualizar procedimento");
        throw error;
      }

      return;
    }

    try {
      await CreateFisio({
        fisio: {
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
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ocupação:</FormLabel><br />
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsible"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsável:</FormLabel><br />
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kinship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parentesco:</FormLabel><br />
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clinicalDiagnosis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>DIAGNÓSTICO CLÍNICO:</FormLabel><br />
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mainComplaint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Queixa Principal:</FormLabel><br />
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="functionalComplaint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Queixa Funcional:</FormLabel><br />
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentDiseaseHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HDA:</FormLabel><br />
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="medications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MEDICAMENTOS EM USO:</FormLabel><br />
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personalHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ANTECEDENTES PESSOAIS:</FormLabel><br />
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lifestyleHabits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HÁBITOS E CONDIÇÕES DE VIDA:</FormLabel><br />
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="painAssessment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AVALIAÇÃO DA DOR:</FormLabel><br />
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nenhuma">nenhuma</SelectItem>
                    <SelectItem value="Dor em repouso">Dor em repouso</SelectItem>
                    <SelectItem value="Dor ao movimento">Dor ao movimento</SelectItem>
                    <SelectItem value="Dor à palpação">Dor à palpação</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

              <FormField
  control={form.control}
  name="painIntensity"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Intensidade da Dor (0-10):</FormLabel><br />
      <FormControl>
        <Input {...field} type="number" min="0" max="10" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="painLocation"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Localização da Dor:</FormLabel><br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Cabeça">Cabeça</SelectItem>
            <SelectItem value="Peito">Peito</SelectItem>
            <SelectItem value="Abdômen">Abdômen</SelectItem>
            <SelectItem value="Costas">Costas</SelectItem>
            <SelectItem value="Membros">Membros</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="painFrequency"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Frequência da Dor:</FormLabel><br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Contínua">Contínua</SelectItem>
            <SelectItem value="Intermitente">Intermitente</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="painCharacteristics"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Características da Dor:</FormLabel><br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pulsátil">Pulsátil</SelectItem>
            <SelectItem value="Afiada">Afiada</SelectItem>
            <SelectItem value="Queimante">Queimante</SelectItem>
            <SelectItem value="Surda">Surda</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="painInterference"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Interferência da Dor:</FormLabel><br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Baixa">Baixa</SelectItem>
            <SelectItem value="Moderada">Moderada</SelectItem>
            <SelectItem value="Alta">Alta</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="patientPresentation"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Apresentação do paciente:</FormLabel><br />
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="weight"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Peso:</FormLabel><br />
      <FormControl>
        <Input {...field} type="number" step="0.1" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="height"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Altura:</FormLabel><br />
      <FormControl>
        <Input {...field} type="number" step="0.01" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="bmi"
  render={({ field }) => (
    <FormItem>
      <FormLabel>IMC:</FormLabel><br />
      <FormControl>
        <Input {...field} type="number" step="0.1" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="bloodPressure"
  render={({ field }) => (
    <FormItem>
      <FormLabel>PA:</FormLabel><br />
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="heartRate"
  render={({ field }) => (
    <FormItem>
      <FormLabel>FC:</FormLabel><br />
      <FormControl>
        <Input {...field} type="number" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="respiratoryRate"
  render={({ field }) => (
    <FormItem>
      <FormLabel>FR:</FormLabel><br />
      <FormControl>
        <Input {...field} type="number" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="oxygenSaturation"
  render={({ field }) => (
    <FormItem>
      <FormLabel>SpO2:</FormLabel><br />
      <FormControl>
        <Input {...field} type="number" step="0.1" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="pulmonaryAuscultation"
  render={({ field }) => (
    <FormItem>
      <FormLabel>AP:</FormLabel><br />
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="posturalAssessment"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Avaliação postural:</FormLabel><br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Normal">Normal</SelectItem>
            <SelectItem value="Anormal">Anormal</SelectItem>
            <SelectItem value="Observações">Observações</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="specificInspection"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Inspeção específica:</FormLabel><br />
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="neurologicalExam"
  render={({ field }) => (
    <FormItem>
      <FormLabel>QUADROS NEUROLÓGICOS:</FormLabel><br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" "></SelectItem>
            <SelectItem value="Normal">Normal</SelectItem>
            <SelectItem value="Alterado">Alterado</SelectItem>
            <SelectItem value="Observações">Observações</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <Input {...field} placeholder="Observações" />
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="ashworthScale"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Escala de ASHWORTH modificada:</FormLabel><br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">0</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="rombergTest"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Teste de Romberg:</FormLabel><br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Positivo">Positivo</SelectItem>
            <SelectItem value="Negativo">Negativo</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="unilateralBalanceTest"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Teste de equilíbrio unipodal:</FormLabel><br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Normal">Normal</SelectItem>
            <SelectItem value="Alterado">Alterado</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="getUpAndGoTest"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Teste Modificado "Levante e vá" (get up and go):</FormLabel><br />
      <FormControl>
        <Input {...field} type="number" step="0.1" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="katzIndex"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Avaliação funcional – Índice de Katz:</FormLabel><br />
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="fallHistory"
  render={({ field }) => (
    <FormItem>
      <FormLabel>História de quedas:</FormLabel><br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sim">Sim</SelectItem>
            <SelectItem value="Não">Não</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="fearOfFalling"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Tem medo de cair?</FormLabel><br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sim">Sim</SelectItem>
            <SelectItem value="Não">Não</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="timeUpAndGo"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Time Up and Go:</FormLabel><br />
      <FormControl>
        <Input {...field} type="number" step="0.1" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="fallRisk"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Risco de quedas (TUG):</FormLabel><br />
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


              

<FormField
  control={form.control}
  name="tandemGait"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Marcha Tandem – Deambulação em linha reta avaliado em tempo ou passos:
      </FormLabel><br />
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="obstetricHistory"
  render={({ field }) => (
    <FormItem>
      <FormLabel>História Obstétrica:</FormLabel><br />
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="gynecologicalHistory"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Antecedentes ginecológicos:</FormLabel><br />
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="urinarySymptoms"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Sintomas Urinários:</FormLabel><br />
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="sexualFunction"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Avaliação da Função Sexual:</FormLabel><br />
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="anorectalEvaluation"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Avaliação anorretal:</FormLabel><br />
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
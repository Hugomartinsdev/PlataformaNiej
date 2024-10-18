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
import { CreateLaw } from "@/actions/create-law";



const formSchema = z.object({
  birthRegistration: z.string().optional(),
	assistencialBenefits: z.string().optional(),
	benefitsDetails: z.string().optional(),
	retirement: z.string().optional(),
	Pension: z.string().optional(),
	pensionDetails: z.string().optional(),
	alimenticPension: z.string().optional(),
	alimenticPensionDetails: z.string().optional(),
	imovelOrTerrainRegulantion: z.string().optional(),
	imovelOrTerrainRegulantionDetails: z.string().optional(),
	juducialAlvara: z.string().optional(),
	extraJudicialAgreement: z.string().optional(),
	executivTitle: z.string().optional(),
	paternityRecognition: z.string().optional(),
	paternityContestation: z.string().optional(),
	childCustody: z.string().optional(),
	divorce: z.string().optional(),
	stableUnion: z.string().optional(),
	guardianshipOrCuratorship: z.string().optional(),
	undueCharge: z.string().optional(),
	undueChargeDetails: z.string().optional(),
	documentsEmission: z.string().optional(),
	others: z.string().optional(),
	childrenInvolved: z.string().optional(),
	elderlyInvolved: z.string().optional(),
	pcdInvolved: z.string().optional(),
	urgency: z.string().optional(),
	documentsOrEvidences: z.string().optional(),
	previousLegalGuidance: z.string().optional(),
	publicDefense: z.string().optional(),
	policeStation: z.string().optional(),
	govermentSecretary: z.string().optional(),
  crasAccess: z.string().optional(),
	caduniTelNumber: z.string().optional(),
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
      birthRegistration: data?.birthRegistration ?? "",
      assistencialBenefits: data?.assistencialBenefits ?? "",
      benefitsDetails: data?.benefitsDetails ?? "",
      retirement: data?.retirement ?? "",
      Pension: data?.Pension ?? "",
      pensionDetails: data?.pensionDetails ?? "",
      alimenticPension: data?.alimenticPension ?? "",
      alimenticPensionDetails: data?.alimenticPensionDetails ?? "",
      imovelOrTerrainRegulantion: data?.imovelOrTerrainRegulantion ?? "",
      imovelOrTerrainRegulantionDetails: data?.imovelOrTerrainRegulantionDetails ?? "",
      juducialAlvara: data?.juducialAlvara ?? "",
      extraJudicialAgreement: data?.extraJudicialAgreement ?? "",
      executivTitle: data?.executivTitle ?? "",
      paternityRecognition: data?.paternityRecognition ?? "",
      paternityContestation: data?.paternityContestation ?? "",
      childCustody: data?.childCustody ?? "",
      divorce: data?.divorce ?? "",
      stableUnion: data?.stableUnion ?? "",
      guardianshipOrCuratorship: data?.guardianshipOrCuratorship ?? "",
      undueCharge: data?.undueCharge ?? "",
      undueChargeDetails: data?.undueChargeDetails ?? "",
      documentsEmission: data?.documentsEmission ?? "",
      others: data?.others ?? "",
      childrenInvolved: data?.childrenInvolved ?? "",
      elderlyInvolved: data?.elderlyInvolved ?? "",
      pcdInvolved: data?.pcdInvolved ?? "",
      urgency: data?.urgency ?? "",
      documentsOrEvidences: data?.documentsOrEvidences ?? "",
      previousLegalGuidance: data?.previousLegalGuidance ?? "",
      publicDefense: data?.publicDefense ?? "",
      policeStation: data?.policeStation ?? "",
      govermentSecretary: data?.govermentSecretary ?? "",
      crasAccess: data?.crasAccess ?? "",
      caduniTelNumber: data?.caduniTelNumber ?? "",
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
      await CreateLaw({
        law: {
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateMedic)}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
          <FormField control={form.control} name="birthRegistration" render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Registro de Nascimento:<br /></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
              <SelectTrigger>
              <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              </FormControl>
                <SelectContent>
                  <SelectItem value="cartorio">Do Cartório</SelectItem>
                  <SelectItem value="indigena">Registro Administrativo de Nascimento Indígena</SelectItem>
                  <SelectItem value="naoTem">Não tem</SelectItem>
                  <SelectItem value="naoSabe">Não sabe</SelectItem>
                </SelectContent>
              </Select>
            <FormMessage className="mt-1 !text-red-500" />
          </FormItem>
)} />

<FormField control={form.control} name="assistencialBenefits" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Benefício Assistencial (BPC/LOAS)<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField
  control={form.control}
  name="benefitsDetails"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Qual tipo?</FormLabel> <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="bolsaFamilia">Bolsa Família</SelectItem>
        <SelectItem value="auxilioMaternidade">Auxílio Maternidade</SelectItem>
        <SelectItem value="auxilioGas">Auxílio Gás</SelectItem>
        <SelectItem value="auxilioDefesa">Auxílio Defesa</SelectItem>
      </SelectContent>
    </Select>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField control={form.control} name="retirement" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Aponsentadoria?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="Pension" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Pensão pós morte?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField
  control={form.control}
  name="pensionDetails"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Qual tipo?</FormLabel> <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="partilhaSeparacao">Partilha de bens após separação</SelectItem>
        <SelectItem value="partilhaPosMorte">Partilha de bens pós morte</SelectItem>
        <SelectItem value="heranca">Herança</SelectItem>
        <SelectItem value="testamento">Testamento</SelectItem>
      </SelectContent>
    </Select>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField control={form.control} name="alimenticPension" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Pensão alimentícia?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField
  control={form.control}
  name="alimenticPensionDetails"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Qual tipo?</FormLabel> <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="exoneraçãoDePensaoAlimenticia">Exoneração de pensão alimentícia</SelectItem>
        <SelectItem value="revisãoDePensaoAlimenticia">revisão de pensão alimentícia</SelectItem>
      </SelectContent>
    </Select>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField control={form.control} name="imovelOrTerrainRegulantion" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Regulação de imovél ou terreno?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField
  control={form.control}
  name="imovelOrTerrainRegulantionDetails"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Qual tipo?</FormLabel> <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="usucapiao">Usucapião</SelectItem>
        <SelectItem value="certidaoDeMatriculaDeImovel">Certidão de matricula de imóvel</SelectItem>
      </SelectContent>
    </Select>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField control={form.control} name="juducialAlvara" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Alvará Judicial?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="extraJudicialAgreement" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Reconhecimento de acordo extrajudicial?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="executivTitle" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Execução de titulo executivo?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="paternityRecognition" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Reconhecimento de paternidade?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="paternityContestation" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Contestação de paternidade?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="childCustody" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Guarda dos filhos?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="divorce" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Divorcio?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="stableUnion" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Reconhecimento de união estável?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="guardianshipOrCuratorship" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Curatela ou Tutela?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="undueCharge" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Cobrança indevida?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField
  control={form.control}
  name="undueChargeDetails"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Se sim?</FormLabel> <br />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="inscricaoEmOrgaosDeProteçaoAoCredito">Inscrição em orgãos de proteção ao credito</SelectItem>
      </SelectContent>
    </Select>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField control={form.control} name="documentsEmission" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Emissão de documentos?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="others" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Outros(demandas criminais)?<br /></FormLabel>
    <Textarea {...field} className="mt-2"placeholder="digite aqui" />
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="childrenInvolved" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>A demanda envolve crianças?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="elderlyInvolved" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>A demanda envolve idosos?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="pcdInvolved" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>A demanda envolve PCDs e/ou Transtorno psicomotor?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="urgency" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Existe urgência no caso?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <Textarea {...field} className="mt-2"placeholder="digite a descrição do motivo da urgencia" />
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="documentsOrEvidences" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Possui documentos ou provas relacionadas ao caso?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <Textarea {...field} className="mt-2"placeholder="digite os nomes documentos aqui" />
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="previousLegalGuidance" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Já buscou orientação jurídica antes?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <Textarea {...field} className="mt-2"placeholder="onde" />
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="publicDefense" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Possui conhecimento do atendimento de defensorias públicas?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="policeStation" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Possui conhecimento do atendimento em delegacia de polícia?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="govermentSecretary" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Possui conhecimento do atendimento em Secretaria do Estado?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="crasAccess" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Você tem acesso a algum CRAS(Centro de Referência da Assistência Social)?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />

<FormField control={form.control} name="caduniTelNumber" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Você tem número de CADUNI?<br /></FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="sim">Sim</SelectItem>
        <SelectItem value="nao">Não</SelectItem>
      </SelectContent>
    </Select>
    <Textarea {...field} className="mt-2"placeholder="Qual?" />
    <FormMessage className="mt-1 !text-red-500" />
  </FormItem>
)} />
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
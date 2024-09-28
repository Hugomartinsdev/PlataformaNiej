"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ButtonAnimated } from "@/components/ui/ButtonAnimated";
import { Divider } from "@/components/ui/divider";
import { Subheading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

// import { Case, columns } from "./table/columns";
// import { BulletinDataTable } from "./table/data-table";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-shadcn";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CreateOdonto } from "@/actions/create-odonto";
import { UpdateOdonto } from "@/actions/update-odonto";
import Odontogram from "@/components/odontograma/Odontogram";

const formSchema = z.object({
  generalComplaint: z.string().optional(),
  toothPain: z.string().optional(),
  gumPain: z.string().optional(),
  bleedingGums: z.string().optional(),
  usesDentalFloss: z.string().optional(),
  usesToothpaste: z.string().optional(),
  brushingFrequency: z.string().optional(),
  toothbrushType: z.string().optional(),
  toothbrushReplacement: z.string().optional(),
  usesPacifier: z.string().optional(),
  hasAllergy: z.string().optional(),
  allergyDetails: z.string().optional(),
  dentalTreatmentStatus: z.string().optional(),
  dentalTreatmentNotes: z.string().optional(),
  takesMedication: z.string().optional(),
  medicationDetails: z.string().optional(),
  hasOtherIllness: z.string().optional(),
  illnessDetails: z.string().optional(),
  gumStatus: z.string().optional(),
  gumNotes: z.string().optional(),
  buccalMucosaStatus: z.string().optional(),
  buccalMucosaNotes: z.string().optional(),
  palateStatus: z.string().optional(),
  palateNotes: z.string().optional(),
  floorOfMouthStatus: z.string().optional(),
  floorOfMouthNotes: z.string().optional(),
  tongueStatus: z.string().optional(),
  tongueNotes: z.string().optional(),
  fluorosisStatus: z.string().optional(),
  fluorosisNotes: z.string().optional(),
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
      generalComplaint: data?.generalComplaint ?? "",
      toothPain: data?.toothPain ?? "",
      gumPain: data?.gumPain ?? "",
      bleedingGums: data?.bleedingGums ?? "",
      usesDentalFloss: data?.usesDentalFloss ?? "",
      usesToothpaste: data?.usesToothpaste ?? "",
      brushingFrequency: data?.brushingFrequency ?? "",
      toothbrushType: data?.toothbrushType ?? "",
      toothbrushReplacement: data?.toothbrushReplacement ?? "",
      usesPacifier: data?.usesPacifier ?? "",
      hasAllergy: data?.hasAllergy ?? "",
      allergyDetails: data?.allergyDetails ?? "",
      dentalTreatmentStatus: data?.dentalTreatmentStatus ?? "",
      dentalTreatmentNotes: data?.dentalTreatmentNotes ?? "",
      takesMedication: data?.takesMedication ?? "",
      medicationDetails: data?.medicationDetails ?? "",
      hasOtherIllness: data?.hasOtherIllness ?? "",
      illnessDetails: data?.illnessDetails ?? "",
      gumStatus: data?.gumStatus ?? "",
      gumNotes: data?.gumNotes ?? "",
      buccalMucosaStatus: data?.buccalMucosaStatus ?? "",
      buccalMucosaNotes: data?.buccalMucosaNotes ?? "",
      palateStatus: data?.palateStatus ?? "",
      palateNotes: data?.palateNotes ?? "",
      floorOfMouthStatus: data?.floorOfMouthStatus ?? "",
      floorOfMouthNotes: data?.floorOfMouthNotes ?? "",
      tongueStatus: data?.tongueStatus ?? "",
      tongueNotes: data?.tongueNotes ?? "",
      fluorosisStatus: data?.fluorosisStatus ?? "",
      fluorosisNotes: data?.fluorosisNotes ?? "",
    },
  });

  const [odontogram, setOdontograma] = useState([]);

  async function handleCreateMedic(formData: z.infer<typeof formSchema>) {
    if (data) {
      try {
        await UpdateOdonto({
          odonto: {
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
      await CreateOdonto({
        odonto: {
          ...formData,
          residentId: residentId,
          projectId,
          odontogram: odontogram,
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
          name="generalComplaint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Queixa geral:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="toothPain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dor nos dentes?</FormLabel> <br />
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gumPain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dor na gengiva?</FormLabel> <br />
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bleedingGums"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gengiva sangra ao escovar?</FormLabel> <br />
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="usesDentalFloss"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usa fio dental?</FormLabel> <br />
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
  control={form.control}
  name="usesToothpaste"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Usa creme dental?</FormLabel> <br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="brushingFrequency"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Escovação quantas vezes por dia?</FormLabel> <br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 vez</SelectItem>
            <SelectItem value="2">2 vezes</SelectItem>
            <SelectItem value="3">3 vezes</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="toothbrushType"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Tipo de escova:</FormLabel> <br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="coletiva">Coletiva</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="toothbrushReplacement"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Troca de escova:</FormLabel> <br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo mes">Todo mês</SelectItem>
            <SelectItem value="2 em 2 meses">2 em 2 meses</SelectItem>
            <SelectItem value="3 em 3 meses">3 em 3 meses</SelectItem>
            <SelectItem value="nao sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="usesPacifier"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Usa chupeta?</FormLabel> <br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="hasAllergy"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Alergia:</FormLabel> <br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
            <SelectItem value="nao sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="allergyDetails"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Qual alergia?</FormLabel> <br />
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="dentalTreatmentStatus"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Tratamento odontológico:</FormLabel> <br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="concluido">Concluído</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="em andamento">Em andamento</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="dentalTreatmentNotes"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Observações do tratamento odontológico:</FormLabel> <br />
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="takesMedication"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Toma algum tipo de medicamento?</FormLabel> <br />
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="medicationDetails"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Qual medicamento? <br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="hasOtherIllness"
  render={({ field }) => (
    <FormItem>
      <FormLabel>É portador de alguma outra enfermidade? <br /></FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="illnessDetails"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Qual enfermidade? <br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="gumStatus"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Gengiva: <br /></FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="alterada">Alterada</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="gumNotes"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Observações sobre a gengiva: <br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="buccalMucosaStatus"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Mucosa jugal: <br /></FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="alterada">Alterada</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="buccalMucosaNotes"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Observações sobre a mucosa jugal: <br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="palateStatus"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Palato: <br /></FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="alterada">Alterada</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="palateNotes"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Observações sobre o palato: <br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="floorOfMouthStatus"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Assoalho: <br /></FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="alterada">Alterada</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="floorOfMouthNotes"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Observações sobre o assoalho: <br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="tongueStatus"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Língua: <br /></FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="alterada">Alterada</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="tongueNotes"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Observações sobre a língua: <br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="fluorosisStatus"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Fluorose: <br /></FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="alterada">Alterada</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="fluorosisNotes"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Observações sobre fluorose: <br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


              <Subheading>2- ODONTOGRAMA</Subheading>
              <Odontogram
                tooth={(labelT: any, zoneT: any, idT: any) => {
                  // @ts-expect-error - odontograa não tipado corretamente
                  setOdontograma((oldArray) => [
                    ...oldArray,
                    {
                      label: labelT,
                      zone: zoneT,
                      id: idT,
                    },
                  ]);
                }}
                rtooth={(id: any) => {
                  setOdontograma((current) =>
                    current.filter((obj) => {
                      // @ts-expect-error - odontograa não tipado corretamente
                      return obj.id !== id;
                    }),
                  );
                }}
              />
              {odontogram.map((obj) => {
                const dataWihoutThis = odontogram.filter((item) => {
                  // @ts-expect-error - odontograa não tipado corretamente
                  return item.id !== obj.id;
                });

                return (
                  // @ts-expect-error - odontograa não tipado corretamente
                  <div key={obj.id} className="flex flex-col">
                    {/* @ts-expect-error - odontograa não tipado corretamente */}
                    <Text size="lg">{`${obj.label} - ${obj.zone}`}</Text>

                    <Select
                      onValueChange={(value) => {
                        // @ts-expect-error - odontograa não tipado corretamente
                        setOdontograma(() => [
                          ...dataWihoutThis,
                          {
                            // @ts-expect-error - odontograa não tipado corretamente
                            id: obj.id,
                            // @ts-expect-error - odontograa não tipado corretamente
                            label: obj.label,
                            // @ts-expect-error - odontograa não tipado corretamente
                            zone: obj.zone,

                            observation: value,
                          },
                        ]);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipos</SelectLabel>
                          <SelectItem value="CARIADO">CARIADO</SelectItem>
                          <SelectItem value="HÍGIDO">HÍGIDO</SelectItem>
                          <SelectItem value="AUSENTE">AUSENTE</SelectItem>
                          <SelectItem value="RESTAURADO">RESTAURADO</SelectItem>
                          <SelectItem value="MANCHA BRANCA">
                            MANCHA BRANCA
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                );
              })}
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
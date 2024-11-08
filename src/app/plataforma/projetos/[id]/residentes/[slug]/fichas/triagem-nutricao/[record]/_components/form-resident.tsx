"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect } from 'react';

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
import { UpdateNutritionScreeening } from "@/actions/update-nutrition-screening";
import { CreateNutritionScreening } from "@/actions/create-nutrition-screening";

const formSchema = z.object({
  currentWeight: z.string().optional(),
  height: z.string().optional(),
  bmi: z.string().optional(),
  bmiClassification: z.string().optional(),
  waistCircumference: z.string().optional(),
  hipCircumference: z.string().optional(),
  calfCircumference: z.string().optional(),
  armCircumference: z.string().optional(),
  nutritionistVisit: z.string().optional(),
  previousSurgery: z.string().optional(),
  surgeryDetails: z.string().optional(),
  smoking: z.string().optional(),
  alcoholism: z.string().optional(),
  obesity: z.string().optional(),
  obesityInFamily: z.string().optional(),
  obesityFamilyMembers: z.string().optional(),
  diabetesInFamily: z.string().optional(),
  diabetesFamilyMembers: z.string().optional(),
  diabetic: z.string().optional(),
  insulinUse: z.string().optional(),
  cholesterol: z.string().optional(),
  alteredTriglycerides: z.string().optional(),
  convulsions: z.string().optional(),
  gastricProblems: z.string().optional(),
  anxiety: z.string().optional(),
  heartProblems: z.string().optional(),
  otherPathologies: z.string().optional(),
  foodInsecurityConcern: z.string().optional(),
  foodShortage: z.string().optional(),
  healthyFoodLack: z.string().optional(),
  limitedFoodVariety: z.string().optional(),
  mealSkipping: z.string().optional(),
  reducedFoodIntake: z.string().optional(),
  hungerDueToLackOfMoney: z.string().optional(),
  fullDayWithoutFood: z.string().optional(),
  wakeUpTime: z.string().optional(),
  bedTime: z.string().optional(),
  breathingDifficulty: z.string().optional(),
  sleepingDifficulty: z.string().optional(),
  sleepMedication: z.string().optional(),
  sleepMedicationDetails: z.string().optional(),
  physicalActivity: z.string().optional(),
  physicalActivityDetails: z.string().optional(),
  weeklyPhysicalActivityHours: z.string().optional(),
  physicalActivityIntensity: z.string().optional(),
  mood: z.string().optional(),
  smokingHabit: z.string().optional(),
  alcoholConsumption: z.string().optional(),
  diabetesDiagnosis: z.string().optional(),
  familyDiabetesDiagnosis: z.string().optional(),
  dailyWaterIntake: z.string().optional(),
  waterSource: z.string().optional(),
  urineColor: z.string().optional(),
  abdominalPain: z.string().optional(),
  stoolAppearance: z.string().optional(),
  stoolColor: z.string().optional(),
  stoolFloating: z.string().optional(),
  stoolConsistencyVariation: z.string().optional(),
  bowelMovementFrequency: z.string().optional(),
  defecationDifficulty: z.string().optional(),
  anorectalDifficulties: z.string().optional(),
  laxativeUse: z.string().optional(),
  vitaminSupplementation: z.string().optional(),
  healthConditionsAffectingDiet: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  dailyMeals: z.string().optional(),
  breakfastFoods: z.string().optional(),
  lunchFoods: z.string().optional(),
  dinnerFoods: z.string().optional(),
  snackingHabits: z.string().optional(),
  fruitConsumption: z.string().optional(),
  vegetableConsumption: z.string().optional(),
  handWashingHabits: z.string().optional(),
  breakfastRecall: z.string().optional(),
  morningSnackRecall: z.string().optional(),
  lunchRecall: z.string().optional(),
  afternoonSnackRecall: z.string().optional(),
  dinnerRecall: z.string().optional(),
  eveningSnackRecall: z.string().optional(),
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
      currentWeight: data?.currentWeight || "",
      height: data?.height || "",
      bmi: data?.bmi || "",
      bmiClassification: data?.bmiClassification || "",
      waistCircumference: data?.waistCircumference || "",
      hipCircumference: data?.hipCircumference || "",
      calfCircumference: data?.calfCircumference || "",
      armCircumference: data?.armCircumference || "",
      nutritionistVisit: data?.nutritionistVisit || "",
      previousSurgery: data?.previousSurgery || "",
      surgeryDetails: data?.surgeryDetails || "",
      smoking: data?.smoking || "",
      alcoholism: data?.alcoholism || "",
      obesity: data?.obesity || "",
      obesityInFamily: data?.obesityInFamily || "",
      obesityFamilyMembers: data?.obesityFamilyMembers || "",
      diabetesInFamily: data?.diabetesInFamily || "",
      diabetesFamilyMembers: data?.diabetesFamilyMembers || "",
      diabetic: data?.diabetic || "",
      insulinUse: data?.insulinUse || "",
      cholesterol: data?.cholesterol || "",
      alteredTriglycerides: data?.alteredTriglycerides || "",
      convulsions: data?.convulsions || "",
      gastricProblems: data?.gastricProblems || "",
      anxiety: data?.anxiety || "",
      heartProblems: data?.heartProblems || "",
      otherPathologies: data?.otherPathologies || "",
      foodInsecurityConcern: data?.foodInsecurityConcern || "",
      foodShortage: data?.foodShortage || "",
      healthyFoodLack: data?.healthyFoodLack || "",
      limitedFoodVariety: data?.limitedFoodVariety || "",
      mealSkipping: data?.mealSkipping || "",
      reducedFoodIntake: data?.reducedFoodIntake || "",
      hungerDueToLackOfMoney: data?.hungerDueToLackOfMoney || "",
      fullDayWithoutFood: data?.fullDayWithoutFood || "",
      wakeUpTime: data?.wakeUpTime || "",
      bedTime: data?.bedTime || "",
      breathingDifficulty: data?.breathingDifficulty || "",
      sleepingDifficulty: data?.sleepingDifficulty || "",
      sleepMedication: data?.sleepMedication || "",
      sleepMedicationDetails: data?.sleepMedicationDetails || "",
      physicalActivity: data?.physicalActivity || "",
      physicalActivityDetails: data?.physicalActivityDetails || "",
      weeklyPhysicalActivityHours: data?.weeklyPhysicalActivityHours || "",
      physicalActivityIntensity: data?.physicalActivityIntensity || "",
      mood: data?.mood || "",
      smokingHabit: data?.smokingHabit || "",
      alcoholConsumption: data?.alcoholConsumption || "",
      diabetesDiagnosis: data?.diabetesDiagnosis || "",
      familyDiabetesDiagnosis: data?.familyDiabetesDiagnosis || "",
      dailyWaterIntake: data?.dailyWaterIntake || "",
      waterSource: data?.waterSource || "",
      urineColor: data?.urineColor || "",
      abdominalPain: data?.abdominalPain || "",
      stoolAppearance: data?.stoolAppearance || "",
      stoolColor: data?.stoolColor || "",
      stoolFloating: data?.stoolFloating || "",
      stoolConsistencyVariation: data?.stoolConsistencyVariation || "",
      bowelMovementFrequency: data?.bowelMovementFrequency || "",
      defecationDifficulty: data?.defecationDifficulty || "",
      anorectalDifficulties: data?.anorectalDifficulties || "",
      laxativeUse: data?.laxativeUse || "",
      vitaminSupplementation: data?.vitaminSupplementation || "",
      healthConditionsAffectingDiet: data?.healthConditionsAffectingDiet || "",
      dietaryRestrictions: data?.dietaryRestrictions || "",
      dailyMeals: data?.dailyMeals || "",
      breakfastFoods: data?.breakfastFoods || "",
      lunchFoods: data?.lunchFoods || "",
      dinnerFoods: data?.dinnerFoods || "",
      snackingHabits: data?.snackingHabits || "",
      fruitConsumption: data?.fruitConsumption || "",
      vegetableConsumption: data?.vegetableConsumption || "",
      handWashingHabits: data?.handWashingHabits || "",
      breakfastRecall: data?.breakfastRecall || "",
      morningSnackRecall: data?.morningSnackRecall || "",
      lunchRecall: data?.lunchRecall || "",
      afternoonSnackRecall: data?.afternoonSnackRecall || "",
      dinnerRecall: data?.dinnerRecall || "",
      eveningSnackRecall: data?.eveningSnackRecall || "",
    },
  });
  //const a; a='height';

  async function handleCreateMedic(formData: z.infer<typeof formSchema>) {
    if (data) {
      try {
        await UpdateNutritionScreeening({
          nutritionScreening: {
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
      await CreateNutritionScreening({
        nutritionScreening: {
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
  name="currentWeight"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Peso atual:<br /></FormLabel>
      <FormControl>
        <Input {...field}
            onChange={(e) => {
              field.onChange(e);
              // Garantir que o valor seja um número válido antes de calcular
              const weight = parseFloat(e.target.value);
              const height = parseFloat(form.getValues("height") || "0"); // Defina um valor default caso seja undefined
              if (!isNaN(weight) && !isNaN(height) && height !== 0) {
                const bmi = (weight / (height * height)).toFixed(2);
                form.setValue("bmi", bmi);// Atualizar o campo BMI
                if(bmi < "18.5"){
                  form.setValue("bmiClassification","Abaixo do peso")
                }else if(bmi > "18.4" && bmi < "25.0"){
                  form.setValue("bmiClassification","Peso normal")
                }
                else if(bmi > "24.9" && bmi < "30.0"){
                  form.setValue("bmiClassification","Sobrepeso")
                }else if(bmi > "29.9" && bmi < "35.0"){
                  form.setValue("bmiClassification","Obesidade grau 1")
                }else if(bmi > "34.9" && bmi < "40.0"){
                  form.setValue("bmiClassification","Obesidade grau 2")
                }else{
                  form.setValue("bmiClassification","Obesidade grau 3")
                }
              } else {
                form.setValue("bmi", ""); // Limpar o campo BMI se a altura ou peso não forem válidos
              }
              
            }} />
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
      <FormLabel>Altura (em metros, colocar ponto no lugar da virgula):<br /></FormLabel>
      <FormControl>
        <Input {...field}
          onChange={(e) => {
            field.onChange(e);
            // Garantir que o valor seja um número válido antes de calcular
            const height = parseFloat(e.target.value);
            const weight = parseFloat(form.getValues("currentWeight") || "0"); // Defina um valor default caso seja undefined
            if (!isNaN(weight) && !isNaN(height) && height !== 0) {
              const bmi = (weight / (height * height)).toFixed(2);
              form.setValue("bmi", bmi);// Atualizar o campo BMI
              if(bmi < "18.5"){
                form.setValue("bmiClassification","Abaixo do peso")
              }else if(bmi > "18.4" && bmi < "25.0"){
                form.setValue("bmiClassification","Peso normal")
              }
              else if(bmi > "24.9" && bmi < "30.0"){
                form.setValue("bmiClassification","Sobrepeso")
              }else if(bmi > "29.9" && bmi < "35.0"){
                form.setValue("bmiClassification","Obesidade grau 1")
              }else if(bmi > "34.9" && bmi < "40.0"){
                form.setValue("bmiClassification","Obesidade grau 2")
              }else{
                form.setValue("bmiClassification","Obesidade grau 3")
              }
            } else {
              form.setValue("bmi", ""); // Limpar o campo BMI se a altura ou peso não forem válidos
            }
          }} />
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
      <FormLabel>IMC:<br /></FormLabel>
      <FormControl>
        <Input {...field} readOnly/>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="bmiClassification"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Classificação:<br /></FormLabel>
      <FormControl>
        <Input {...field} readOnly />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField //EM FASES DE TESTE, TALVEZ POSSA SER DESATIVADO POR MEDO DE PERDA DE DADOS DO BANCO DE DADOS
  control={form.control}
  name="waistCircumference"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Circunferência da cintura:<br /></FormLabel>
      <FormControl>
        <Input {...field} 
        /*onChange={(e) => {
          field.onChange(e);
          // Garantir que o valor seja um número válido antes de calcular
          const waist = parseFloat(e.target.value);
          const hip = parseFloat(form.getValues("hipCircumference") || "0"); // Defina um valor default caso seja undefined
          if (!isNaN(waist) && !isNaN(hip) && hip !== 0) {
            const calfCircumference = (waist / hip).toFixed(2);
            form.setValue("calfCircumference", calfCircumference); // Atualizar o campo BMI
          } else {
            form.setValue("calfCircumference", ""); // Limpar o campo BMI se a altura ou peso não forem válidos
          }
        }}*/ />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField //EM FASES DE TESTE, TALVEZ POSSA SER DESATIVADO POR MEDO DE PERDA DE DADOS DO BANCO DE DADOS
  control={form.control}
  name="hipCircumference"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Circunferência do quadril:<br /></FormLabel>
      <FormControl>
        <Input {...field} 
         /*onChange={(e) => {
          field.onChange(e);
          // Garantir que o valor seja um número válido antes de calcular
          const waist = parseFloat(form.getValues("waistCircumference") || "0");
          const hip = parseFloat(e.target.value); // Defina um valor default caso seja undefined
          if (!isNaN(waist) && !isNaN(hip) && hip !== 0) {
            const calfCircumference = (waist / hip).toFixed(2);
            form.setValue("calfCircumference", calfCircumference); // Atualizar o campo BMI
          } else {
            form.setValue("calfCircumference", ""); // Limpar o campo BMI se a altura ou peso não forem válidos
          } QUANDO FOR ATIVAR CRIAR UM FORM FIELD E UMA TUPLA NO BANCO DE DADOS, so copiar a do IMC DETAILS
        }}*//>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="calfCircumference"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Circunferência da panturrilha:<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="armCircumference"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Circunferência do braço:<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="nutritionistVisit"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Já foi em um nutricionista?<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="previousSurgery"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Já fez alguma cirurgia?<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="surgeryDetails"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Qual cirurgia:<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="smoking"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Tabagismo?<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


<FormField
  control={form.control}
  name="alcoholism"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Alcoolismo?<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="obesity"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Obesidade?<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="obesityInFamily"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Há obesos na família?<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="obesityFamilyMembers"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Quem na família é obeso?<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="diabetesInFamily"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Há diabético na família?<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="diabetesFamilyMembers"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Quem na família é diabético?<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="diabetic"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Você é diabético(a)?<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="insulinUse"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Faz uso de insulina?<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="cholesterol"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Colesterol:<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


<FormField
  control={form.control}
  name="alteredTriglycerides"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Triglicérides alterado<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="convulsions"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Convulsões<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="gastricProblems"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Problemas gástricos<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="anxiety"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Ansiedade<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="heartProblems"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Problemas cardíacos<br /></FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="otherPathologies"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Outros:<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="foodInsecurityConcern"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses, você teve a preocupação de que a comida da sua casa acabasse antes que tivesse dinheiro para comprar mais comida?<br />
      </FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="foodShortage"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses, os alimentos acabaram antes que você tivesse dinheiro para comprar mais comida?<br />
      </FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="healthyFoodLack"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses, você ficou sem dinheiro para ter uma alimentação saudável e variada?<br />
      </FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="limitedFoodVariety"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses, você comeu apenas alguns poucos tipos de alimentos que ainda tinham, porque o dinheiro acabou?<br />
      </FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="mealSkipping"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses, você deixou de fazer alguma refeição porque não havia dinheiro para comprar comida?<br />
      </FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="reducedFoodIntake"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses, você comeu menos do que achou que devia, porque não havia dinheiro para comprar comida?<br />
      </FormLabel>
      <FormControl>
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
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="hungerDueToLackOfMoney"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses, você sentiu fome mas não comeu porque não tinha dinheiro para comprar comida?<br />
      </FormLabel>
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
  name="fullDayWithoutFood"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses, você ficou um dia inteiro sem comer ou teve apenas uma refeição ao dia porque não tinha dinheiro para comprar a comida?<br />
      </FormLabel>
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
  name="wakeUpTime"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        De manhã, que horas você costuma acordar?<br />
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
  name="bedTime"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        De noite, que horas você costuma dormir?<br />
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
  name="breathingDifficulty"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Você tem dificuldade para respirar?<br /></FormLabel>
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
  name="sleepingDifficulty"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você tem alguma dificuldade ou desconforto para dormir? Se sim, qual ou quais?<br />
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
  name="sleepMedication"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Toma alguma medicação que interfira no sono?<br />
      </FormLabel>
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
  name="sleepMedicationDetails"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Qual medicação para o sono?<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="physicalActivity"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Você pratica alguma atividade física?<br /></FormLabel>
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
  name="physicalActivityDetails"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Se sim, qual ou quais atividades físicas?<br />
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
  name="weeklyPhysicalActivityHours"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Quantas horas você gasta fazendo atividades físicas durante a semana?<br />
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
  name="physicalActivityIntensity"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Qual a intensidade das suas atividades ao terminá-las?<br />
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
  name="mood"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Qual seu sentimento/humor na maior parte do tempo?<br />
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
  name="smokingHabit"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Você fuma?<br /></FormLabel>
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
  name="alcoholConsumption"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você bebe? Quantas vezes durante a semana?<br />
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
  name="diabetesDiagnosis"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Você é diagnosticado com diabetes?<br /></FormLabel>
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
  name="familyDiabetesDiagnosis"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Alguém na família é diagnosticado com diabetes?<br />
      </FormLabel>
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
  name="dailyWaterIntake"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Quantos copos (200ml) com água você bebe no dia?<br />
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
  name="waterSource"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        A água que você bebe é potável, filtrada, fervida ou tratada com algum produto?<br />
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
  name="urineColor"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Qual a cor da sua urina? (Ex: transparente, branca ou turva, amarelo palha (muito claro), amarelo transparente, amarelo escuro, âmbaroumel, laranja, rosa ou avermelhada, acastanhada, azulado ou esverdeado, não sabe)
<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="abdominalPain"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você sente dor abdominal ocorrendo pelo menos 1x na semana nos últimos 3 meses?<br />
      </FormLabel>
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
  name="stoolAppearance"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Qual é o aspecto predominante das suas fezes?<br />
      </FormLabel>
      <FormControl>
       <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tipo 1">partes duras separadas(difíceis de evacuar)</SelectItem>
            <SelectItem value="tipo 2">grumoso, duro, em forma de salsicha</SelectItem>
            <SelectItem value="tipo 3">mesmo formato do 2°com fendas na superfície</SelectItem>
            <SelectItem value="tipo 4">mesmo formato do 2° ou cobra; liso e macio</SelectItem>
            <SelectItem value="tipo 5">manchas macias com bordas bem definidas (fáceis de passar)</SelectItem>
            <SelectItem value="tipo 6">pedaços fofos com bordas irregulares; moles</SelectItem>
            <SelectItem value="tipo 7">totalmente líquido, aquoso, sem partes sólidas</SelectItem>
            <SelectItem value="nao sabe">nao sabe</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="stoolColor"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Qual a cor normalmente das suas fezes?<br />
      </FormLabel>
      <FormControl>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="marrom com pontos brancos">marrom com pontos brancos</SelectItem>
            <SelectItem value=" marrom"> marrom</SelectItem>
            <SelectItem value="amarelo claro">amarelo claro</SelectItem>
            <SelectItem value="avermelhadas">avermelhadas</SelectItem>
            <SelectItem value=" esverdeadas"> esverdeadas</SelectItem>
            <SelectItem value="escuras ou negras">escuras ou negras</SelectItem>
            <SelectItem value="não sabe"> não sabe</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="stoolFloating"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        As suas fezes normalmente boiam ou afundam?<br />
      </FormLabel>
      <FormControl>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="boiam">boiam</SelectItem>
            <SelectItem value="afundam">afundam</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


<FormField
  control={form.control}
  name="stoolConsistencyVariation"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos 3 meses qual foi a frequência que suas fezes variam entre tipo 1 e 2?<br />
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
  name="bowelMovementFrequency"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos 3 meses, qual foi a frequência das suas evacuações?<br />
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
  name="defecationDifficulty"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos 3 meses, qual foi a frequência no seu intestino ou no seu ânus que lhe impediu de evacuar?<br />
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
  name="anorectalDifficulties"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos 3 meses, você teve dificuldades (ANORRETAL) como esforço, desconforto ou dor para conseguir evacuar?<br />
      </FormLabel>
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
  name="laxativeUse"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos 3 meses, você teve o hábito de usar laxantes, enemas ou as mãos para conseguir evacuar?<br />
      </FormLabel>
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
  name="vitaminSupplementation"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você toma algum suplemento vitamínico ou mineral? Qual?<br />
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
  name="healthConditionsAffectingDiet"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você possui alguma condição de saúde que possa afetar sua alimentação? Qual?<br />
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
  name="dietaryRestrictions"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você possui alguma restrição alimentar ou alergia? Qual?<br />
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
  name="dailyMeals"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Quantas refeições você faz ao longo do dia sem contar os lanches?<br />
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
  name="breakfastFoods"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Quais os alimentos que você costuma comer no café da manhã?<br />
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
  name="lunchFoods"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Quais os alimentos que você costuma comer no almoço?<br />
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
  name="dinnerFoods"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Quais alimentos você costuma comer no jantar?<br />
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
  name="snackingHabits"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você lancha entre as refeições principais? Se sim, o que você costuma comer?<br />
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
  name="fruitConsumption"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você tem o costume de comer frutas? Se sim, qual ou quais?<br />
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
  name="vegetableConsumption"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você tem o costume de comer legumes? Se sim, qual ou quais?<br />
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
  name="handWashingHabits"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você tem o costume de lavar suas mãos antes das refeições e antes de manusear/preparar os alimentos?<br />
      </FormLabel>
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


<h2>Recordatório 24 horas:</h2>

<FormField
  control={form.control}
  name="breakfastRecall"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Café da manhã:<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="morningSnackRecall"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Lanche da manhã:<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="lunchRecall"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Almoço:<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="afternoonSnackRecall"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Lanche da tarde:<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="dinnerRecall"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Janta:<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="eveningSnackRecall"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Ceia:<br /></FormLabel>
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

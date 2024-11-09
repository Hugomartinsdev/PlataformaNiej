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
  rcq: z.string().optional(),
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
  triglycerides: z.string().optional(),
  convulsions: z.string().optional(),
  gastricProblems: z.string().optional(),
  otherPathologies: z.string().optional(),
  weightLoss: z.string().optional(),
  seriusOrDiscomfort: z.string().optional(),
  observation: z.string().optional(),
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
  medication: z.string().optional(),
  medicationDetails: z.string().optional(),
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
  narcoticConsumption: z.string().optional(),
  hypertension: z.string().optional(),
  hipertensionFamilyMembers: z.string().optional(),
  hipertensionInFamily: z.string().optional(),
  bloodGlucose: z.string().optional(),
  observationHealth: z.string().optional(),
  haveKids:z.string().optional(),
  kidsHealthyFoodLack: z.string().optional(),
  kidsReducedFoodIntake:z.string().optional(),
  kidsLessFood:z.string().optional(),
  kidsMealSkipping: z.string().optional(),
  kidsHungerDueToLackOfMoney: z.string().optional(),
  kidsFullDayWithoutFood: z.string().optional(),
  stoolFrequencyVariation: z.string().optional(),
  incompleteEvacuation: z.string().optional(),
  observationIntestinal: z.string().optional(),
  snack: z.string().optional(),
  alimentalPain: z.string().optional(),
  Observations_road_habits: z.string().optional(), // coisas novas
  obsevation_clinical_history: z.string().optional(),
  observation_family_history: z.string().optional(),
  bloodPressure: z.string().optional(),
  SAT_O2: z.string().optional(),
  observation_health_markers: z.string().optional(),
  observation_anthropometric_measurements: z.string().optional(),
  Observation_water_intake: z.string().optional(),
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
      rcq: data?.hipCircumference || "",
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
      triglycerides: data?.triglycerides || "",
      convulsions: data?.convulsions || "",
      gastricProblems: data?.gastricProblems || "",
      otherPathologies: data?.otherPathologies || "",
      weightLoss: data?.otherPathologies || "",
      seriusOrDiscomfort:  data?.otherPathologies || "",
      observation: data?.otherPathologies || "",
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
      medication: data?.medication || "",
      medicationDetails: data?.medicationDetails || "",
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
      narcoticConsumption:data?.eveningSnackRecall || "",
      hypertension: data?.eveningSnackRecall || "",
      hipertensionFamilyMembers: data?.eveningSnackRecall || "",
      hipertensionInFamily: data?.eveningSnackRecall || "",
      bloodGlucose: data?.eveningSnackRecall || "",
      observationHealth: data?.eveningSnackRecall || "",
      haveKids:data?.eveningSnackRecall || "",
      kidsHealthyFoodLack:data?.eveningSnackRecall || "",
      kidsReducedFoodIntake: data?.eveningSnackRecall || "",
      kidsLessFood: data?.eveningSnackRecall || "",
      kidsMealSkipping: data?.eveningSnackRecall || "",
      kidsHungerDueToLackOfMoney:data?.eveningSnackRecall || "",
      kidsFullDayWithoutFood:data?.eveningSnackRecall || "",
      stoolFrequencyVariation:data?.eveningSnackRecall || "",
      incompleteEvacuation: data?.eveningSnackRecall || "",
      observationIntestinal:data?.eveningSnackRecall || "",
      snack:data?.eveningSnackRecall || "",
      alimentalPain: data?.eveningSnackRecall || "",
      Observations_road_habits:data?.Observations_road_habits || "", // coisas novas
      obsevation_clinical_history:data?.obsevation_clinical_history || "",
      observation_family_history:data?.observation_family_history || "",
      bloodPressure:data?.bloodPressure || "",
      SAT_O2:data?.SAT_O2 || "",
      observation_health_markers:data?.observation_health_markers || "",
      observation_anthropometric_measurements:data?.observation_anthropometric_measurements || "",
      Observation_water_intake:data?.Observation_water_intake || "",

    },
  });

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
        <Subheading>Hábitos de vida</Subheading>
        <Divider className="my-4" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateMedic)}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">

<FormField
  control={form.control}
  name="wakeUpTime"
  render={({ field }) => (
    <FormItem>
      <FormLabel>De manhã, que horas você costuma acordar?<br /></FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="00:00">00:00</SelectItem>
              <SelectItem value="00:30">00:30</SelectItem>
              <SelectItem value="01:00">01:00</SelectItem>
              <SelectItem value="01:30">01:30</SelectItem>
              <SelectItem value="02:00">02:00</SelectItem>
              <SelectItem value="02:30">02:30</SelectItem>
              <SelectItem value="03:00">03:00</SelectItem>
              <SelectItem value="03:30">03:30</SelectItem>
              <SelectItem value="04:00">04:00</SelectItem>
              <SelectItem value="04:30">04:30</SelectItem>
              <SelectItem value="05:00">05:00</SelectItem>
              <SelectItem value="05:30">05:30</SelectItem>
              <SelectItem value="06:00">06:00</SelectItem>
              <SelectItem value="06:30">06:30</SelectItem>
              <SelectItem value="07:00">07:00</SelectItem>
              <SelectItem value="07:30">07:30</SelectItem>
              <SelectItem value="08:00">08:00</SelectItem>
              <SelectItem value="08:30">08:30</SelectItem>
              <SelectItem value="09:00">09:00</SelectItem>
              <SelectItem value="09:30">09:30</SelectItem>
              <SelectItem value="10:00">10:00</SelectItem>
              <SelectItem value="10:30">10:30</SelectItem>
              <SelectItem value="11:00">11:00</SelectItem>
              <SelectItem value="11:30">11:30</SelectItem>
              <SelectItem value="12:00">12:00</SelectItem>
              <SelectItem value="12:30">12:30</SelectItem>
              <SelectItem value="13:00">13:00</SelectItem>
              <SelectItem value="13:30">13:30</SelectItem>
              <SelectItem value="14:00">14:00</SelectItem>
              <SelectItem value="14:30">14:30</SelectItem>
              <SelectItem value="15:00">15:00</SelectItem>
              <SelectItem value="15:30">15:30</SelectItem>
              <SelectItem value="16:00">16:00</SelectItem>
              <SelectItem value="16:30">16:30</SelectItem>
              <SelectItem value="17:00">17:00</SelectItem>
              <SelectItem value="17:30">17:30</SelectItem>
              <SelectItem value="18:00">18:00</SelectItem>
              <SelectItem value="18:30">18:30</SelectItem>
              <SelectItem value="19:00">19:00</SelectItem>
              <SelectItem value="19:30">19:30</SelectItem>
              <SelectItem value="20:00">20:00</SelectItem>
              <SelectItem value="20:30">20:30</SelectItem>
              <SelectItem value="21:00">21:00</SelectItem>
              <SelectItem value="21:30">21:30</SelectItem>
              <SelectItem value="22:00">22:00</SelectItem>
              <SelectItem value="22:30">22:30</SelectItem>
              <SelectItem value="23:00">23:00</SelectItem>
              <SelectItem value="23:30">23:30</SelectItem>
          </SelectContent>
        </Select>
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
      <FormLabel>De noite, que horas você costuma dormir?<br /></FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="00:00">00:00</SelectItem>
              <SelectItem value="00:30">00:30</SelectItem>
              <SelectItem value="01:00">01:00</SelectItem>
              <SelectItem value="01:30">01:30</SelectItem>
              <SelectItem value="02:00">02:00</SelectItem>
              <SelectItem value="02:30">02:30</SelectItem>
              <SelectItem value="03:00">03:00</SelectItem>
              <SelectItem value="03:30">03:30</SelectItem>
              <SelectItem value="04:00">04:00</SelectItem>
              <SelectItem value="04:30">04:30</SelectItem>
              <SelectItem value="05:00">05:00</SelectItem>
              <SelectItem value="05:30">05:30</SelectItem>
              <SelectItem value="06:00">06:00</SelectItem>
              <SelectItem value="06:30">06:30</SelectItem>
              <SelectItem value="07:00">07:00</SelectItem>
              <SelectItem value="07:30">07:30</SelectItem>
              <SelectItem value="08:00">08:00</SelectItem>
              <SelectItem value="08:30">08:30</SelectItem>
              <SelectItem value="09:00">09:00</SelectItem>
              <SelectItem value="09:30">09:30</SelectItem>
              <SelectItem value="10:00">10:00</SelectItem>
              <SelectItem value="10:30">10:30</SelectItem>
              <SelectItem value="11:00">11:00</SelectItem>
              <SelectItem value="11:30">11:30</SelectItem>
              <SelectItem value="12:00">12:00</SelectItem>
              <SelectItem value="12:30">12:30</SelectItem>
              <SelectItem value="13:00">13:00</SelectItem>
              <SelectItem value="13:30">13:30</SelectItem>
              <SelectItem value="14:00">14:00</SelectItem>
              <SelectItem value="14:30">14:30</SelectItem>
              <SelectItem value="15:00">15:00</SelectItem>
              <SelectItem value="15:30">15:30</SelectItem>
              <SelectItem value="16:00">16:00</SelectItem>
              <SelectItem value="16:30">16:30</SelectItem>
              <SelectItem value="17:00">17:00</SelectItem>
              <SelectItem value="17:30">17:30</SelectItem>
              <SelectItem value="18:00">18:00</SelectItem>
              <SelectItem value="18:30">18:30</SelectItem>
              <SelectItem value="19:00">19:00</SelectItem>
              <SelectItem value="19:30">19:30</SelectItem>
              <SelectItem value="20:00">20:00</SelectItem>
              <SelectItem value="20:30">20:30</SelectItem>
              <SelectItem value="21:00">21:00</SelectItem>
              <SelectItem value="21:30">21:30</SelectItem>
              <SelectItem value="22:00">22:00</SelectItem>
              <SelectItem value="22:30">22:30</SelectItem>
              <SelectItem value="23:00">23:00</SelectItem>
              <SelectItem value="23:30">23:30</SelectItem>
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
          Você tem alguma dificuldade ou desconforto para dormir? Qual?<br />
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
    name="physicalActivity"
    render={({ field }) => (
      <FormItem>
        <FormLabel>
        Você pratica alguma atividade física?<br />
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
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="menos de 1">menos de 1 hora</SelectItem>
            <SelectItem value="entre 1 a 2.5">entre 1 a 2,5 horas</SelectItem>
            <SelectItem value="entre 2.5 a 5">entre 2.5 a 5 horas</SelectItem>
            <SelectItem value="entre 5 a 7">entre 5 a 7 horas</SelectItem>
            <SelectItem value="entre 7 a 10">entre 7 a 10 horas</SelectItem>
            <SelectItem value="mais de 10">mais de 10 horas</SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
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
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="leve">1-Leve</SelectItem>
            <SelectItem value="moderada">2-Moderada</SelectItem>
            <SelectItem value="vigorosa">3-Vigorosa</SelectItem>
            <SelectItem value="Não sabe">4-Não sabe</SelectItem>
          </SelectContent>
        </Select>
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
      <FormLabel>
      Você tem dificuldade para respirar?<br />
      </FormLabel>
      <FormControl>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nunca(0%)">Nunca(0%)</SelectItem>
            <SelectItem value="Raramente(10%)">Raramente(10%)</SelectItem>
            <SelectItem value="Ocasionalmente(23%)">Ocasionalmente(23%)</SelectItem>
            <SelectItem value="Às vezes(45%)">Às vezes(45%)</SelectItem>
            <SelectItem value="Frequentemente(67%)">Frequentemente(67%)</SelectItem>
            <SelectItem value="Geralmente(80%)">Geralmente(80%)</SelectItem>
            <SelectItem value="Habitualmente(90%)">Habitualmente(90%)</SelectItem>
            <SelectItem value="Sempre(100%)">Sempre(100%)x  </SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
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
      <FormLabel>É fumante? Quantos cigarros por dia<br /></FormLabel>
      <FormControl>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="7">7</SelectItem>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="9">9</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="11">11</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="13">13</SelectItem>
            <SelectItem value="14">14</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="17">17</SelectItem>
            <SelectItem value="18">18</SelectItem>
            <SelectItem value="19">19</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="+ de 20 cigarros">+20</SelectItem>
            <SelectItem value="não fuma">não fuma</SelectItem>
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
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="não">Não</SelectItem>
            <SelectItem value="1 a 2x">1 a 2x na semana</SelectItem>
            <SelectItem value="2 a 4x">2 a 4x na semana</SelectItem>
            <SelectItem value="4 a 5">4 a 5x na semana</SelectItem>
            <SelectItem value="5 a 6">5 a 6x na semana</SelectItem>
            <SelectItem value="todo dia">Todo dia</SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="narcoticConsumption"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você faz uso de entorpecentes? Quantas vezes durante a semana?<br />
      </FormLabel>
      <FormControl>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="não">Não</SelectItem>
            <SelectItem value="1 a 2x">1 a 2x na semana</SelectItem>
            <SelectItem value="2 a 4x">2 a 4x na semana</SelectItem>
            <SelectItem value="4 a 5">4 a 5x na semana</SelectItem>
            <SelectItem value="5 a 6">5 a 6x na semana</SelectItem>
            <SelectItem value="todo dia">Todo dia</SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="Observations_road_habits"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
      Observações:<br />
      </FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

        <Subheading>Histórico Clínico</Subheading>
        <Divider className="my-4" />

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
            <SelectItem value="Não sabe">Não sabe</SelectItem>
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
      <FormLabel>Você tem ou já teve problemas gástricos?<br /></FormLabel>
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
            <SelectItem value="Não sabe">Não sabe</SelectItem>
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
      <FormLabel>Você tem ou já teve convulsões?<br /></FormLabel>
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
            <SelectItem value="Não sabe ">Não sabe</SelectItem>
          </SelectContent>
        </Select>
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
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="hypertension"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Você é diagnosticado com hipertensão?<br /></FormLabel>
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
            <SelectItem value="Não sabe">Não sabe</SelectItem>
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
      <FormLabel>Possui outras doenças além das citadas? Qual?<br /></FormLabel>
      <FormControl>
        <Input {...field} />
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
      <FormLabel>Já realizou alguma cirurgia? Qual?<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="medication"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Faz uso de medicamentos? Quais?<br /></FormLabel>
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
  name="obsevation_clinical_history"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Observações:<br />
      </FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<Subheading>Histórico Familiar</Subheading>
        <Divider className="my-4" />


<FormField
  control={form.control}
  name="diabetesInFamily"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Possui algum familiar com diabétes? Quem?<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="diabetesFamilyMembers"//é hipertensão
  render={({ field }) => (
    <FormItem>
      <FormLabel>Possui algum familiar com hipertensão?<br /></FormLabel>
      <FormControl>
        <Input {...field} />
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
      <FormLabel>Possui algum familiar com obesidade? Quem?<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="observation_family_history"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Observações:<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<Subheading>Marcadores de Saúde</Subheading>
        <Divider className="my-4" />


<FormField
  control={form.control}
  name="bloodGlucose" //criar
  render={({ field }) => (
    <FormItem>
      <FormLabel>Glicemia (mg/dl):<br /></FormLabel>
      <FormControl>
        <Input {...field} />
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
      <FormLabel>Colesterol (mg/dl):<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="triglycerides"//trigliceridio criar
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Trigliceridios (mg/dl):<br />
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
  name="bloodPressure"//trigliceridio criar
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Pressão Arterial (mg/dl):<br />
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
  name="SAT_O2"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        SAT O2 (%):<br />
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
  name="observation_health_markers"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Observações:<br />
      </FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<Subheading>Medidas Antropométricas</Subheading>
        <Divider className="my-4" />


            <FormField
  control={form.control}
  name="currentWeight"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Peso (Kg):<br /></FormLabel>
      <FormControl>
        <Input {...field}
            onChange={(e) => {
              field.onChange(e);
              // Garantir que o valor seja um número válido antes de calcular
              const weight = parseFloat(e.target.value);
              const height = parseFloat(form.getValues("height") || "0"); // Defina um valor default caso seja undefined
              const heightcm= height /100;
              if (!isNaN(weight) && !isNaN(height) && height !== 0) {
                const bmi = (weight / (heightcm * heightcm)).toFixed(2);
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
      <FormLabel>Altura(cm):<br /></FormLabel>
      <FormControl>
        <Input {...field}
           onChange={(e) => {
            field.onChange(e);
            // Garantir que o valor seja um número válido antes de calcular
            const height = parseFloat(e.target.value);
            const weight = parseFloat(form.getValues("currentWeight") || "0"); // Defina um valor default caso seja undefined
            const heightcm = height/100;
            if (!isNaN(weight) && !isNaN(height) && height !== 0) {
              const bmi = (weight / (heightcm * heightcm)).toFixed(2);
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
              form.setValue("bmi", "");
            }
          }}/>
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

<FormField
  control={form.control}
  name="waistCircumference"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Circunferência da cintura (cm):<br /></FormLabel>
      <FormControl>
        <Input {...field} 
        onChange={(e) => {
          field.onChange(e);
          const waist = parseFloat(e.target.value);
          const hip = parseFloat(form.getValues("hipCircumference") || "0");
          if (!isNaN(waist) && !isNaN(hip) && hip !== 0) {
            const rcq = (waist / hip).toFixed(2);
            form.setValue("rcq", rcq);
          } else {
            form.setValue("rcq", "");
          }
        }} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="hipCircumference"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Circunferência do quadril (cm):<br /></FormLabel>
      <FormControl>
        <Input {...field} 
         onChange={(e) => {
          field.onChange(e);
          const waist = parseFloat(form.getValues("waistCircumference") || "0");
          const hip = parseFloat(e.target.value);
          if (!isNaN(waist) && !isNaN(hip) && hip !== 0) {
            const rcq = (waist / hip).toFixed(2);
            form.setValue("rcq", rcq); 
          } else {
            form.setValue("rcq", "");
          }
        }} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="rcq"//rcq
  render={({ field }) => (
    <FormItem>
      <FormLabel>RCQ:<br /></FormLabel>
      <FormControl>
        <Input {...field} readOnly/>
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
      <FormLabel>Circunferência da panturrilha (cm):<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="observation_anthropometric_measurements"//rcq
  render={({ field }) => (
    <FormItem>
      <FormLabel>Observações:<br /></FormLabel>
      <FormControl>
        <Input {...field} readOnly/>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<Subheading>Ingestão Hídrica</Subheading>
        <Divider className="my-4" />


<FormField
  control={form.control}
  name="dailyWaterIntake"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Quantos copos (200ml) com água você bebe no dia?<br />
      </FormLabel>
      <FormControl>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0 COPO - 0 L">0 COPO - 0 L</SelectItem>
            <SelectItem value="1 COPO - 0,2 L">1 COPO - 0,2 L</SelectItem>
            <SelectItem value="2 COPOS - 0,4 L">2 COPOS - 0,4 L</SelectItem>
            <SelectItem value="3 COPOS - 0,6 L">3 COPOS - 0,6 L</SelectItem>
            <SelectItem value="4 COPOS - 0,8 L">4 COPOS - 0,8 L</SelectItem>
            <SelectItem value="5 COPOS - 1 L">5 COPOS - 1 L</SelectItem>
            <SelectItem value="6 COPOS - 1,2 L">6 COPOS - 1,2 L</SelectItem>
            <SelectItem value="7 COPOS - 1,4 L">7 COPOS - 1,4 L</SelectItem>
            <SelectItem value="8 COPOS - 1,6 L">8 COPOS - 1,6 L</SelectItem>
            <SelectItem value="9 COPOS - 1,8 L">9 COPOS - 1,8 L</SelectItem>
            <SelectItem value="10 COPOS - 2 L">10 COPOS - 2 L</SelectItem>
            <SelectItem value="11 COPOS - 2,2 L">11 COPOS - 2,2 L</SelectItem>
            <SelectItem value="12 COPOS - 2,4 L">12 COPOS - 2,4 L</SelectItem>
            <SelectItem value="13 COPOS - 2,6 L">13 COPOS - 2,6 L</SelectItem>
            <SelectItem value="14 COPOS - 2,8 L">14 COPOS - 2,8 L</SelectItem>
            <SelectItem value="15 COPOS - 3 L">15 COPOS - 3 L</SelectItem>
            <SelectItem value="16 COPOS - 3,2 L">16 COPOS - 3,2 L</SelectItem>
            <SelectItem value="17 COPOS - 3,4 L">17 COPOS - 3,4 L</SelectItem>
            <SelectItem value="18 COPOS - 3,6 L">18 COPOS - 3,6 L</SelectItem>
            <SelectItem value="19 COPOS - 3,8 L">19 COPOS - 3,8 L</SelectItem>
            <SelectItem value="19 COPOS - 3,8 L">19 COPOS - 3,8 L</SelectItem>
            <SelectItem value="20 COPOS - 4 L">20 COPOS - 4 L</SelectItem>
            <SelectItem value="+ DE 20 COPOS - > 4 L">+ DE 20 COPOS - + 4 L</SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
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
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Potável">Potável</SelectItem>
            <SelectItem value="Filtrada">Filtrada</SelectItem>
            <SelectItem value="Fervida">Fervida</SelectItem>
            <SelectItem value="Tratada com algum produto">Tratada com algum produto</SelectItem>
            <SelectItem value="Nenhuma da opções">Nenhuma da opções</SelectItem>
          </SelectContent>
        </Select>
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
      <FormLabel>
      Qual a cor da sua urina?<br />
      </FormLabel>
      <FormControl>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Transparente">Transparente</SelectItem>
            <SelectItem value="Branca ou turva">Branca ou turva</SelectItem>
            <SelectItem value="Amarelo palha (muito claro)">Amarelo palha (muito claro)</SelectItem>
            <SelectItem value="Amarelo transparente">Amarelo transparente</SelectItem>
            <SelectItem value="Amarelo escura">Amarelo escuro</SelectItem>
            <SelectItem value="Âmbar ou mel">Âmbar ou mel</SelectItem>
            <SelectItem value="Laraja">Laraja</SelectItem>
            <SelectItem value="Rosa ou avermelhada">Rosa ou avermelhada</SelectItem>
            <SelectItem value="Acastanhada">Acastanhada</SelectItem>
            <SelectItem value="Azulado ou esverdeado">Azulado ou esverdeado</SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="Observation_water_intake"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Observações:<br /></FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<Subheading>Função Intestinal</Subheading>
        <Divider className="my-4" />

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
            <SelectItem value="Não sabe">Não sabe</SelectItem>
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
          <SelectItem value="TIPO NÓDULOS DUROS SEPARADOS (DIFÍCEIS DE EVACUAR)">TIPO NÓDULOS DUROS SEPARADOS (DIFÍCEIS DE EVACUAR)</SelectItem>
            <SelectItem value="TIPO GRUMOSO, DURO, EM FORMA DE SALSICHA">TIPO GRUMOSO, DURO, EM FORMA DE SALSICHA</SelectItem>
            <SelectItem value="TIPO EM FORMA DE SALSICHA COM RACHADURAS NA SUPERFÍCIE">TIPO EM FORMA DE SALSICHA COM RACHADURAS NA SUPERFÍCIE</SelectItem>
            <SelectItem value="TIPO EM FORMA DE SALSICHA OU COBRA; LISO E MACIO">TIPO EM FORMA DE SALSICHA OU COBRA; LISO E MACIO</SelectItem>
            <SelectItem value="TIPO MANCHAS MACIAS COM BORDAS BEM DEFINIDAS (FÁCEIS DE PASSAR)">TIPO MANCHAS MACIAS COM BORDAS BEM DEFINIDAS (FÁCEIS DE PASSAR)</SelectItem>
            <SelectItem value="TIPO PEDAÇOS FOFOS COM BORDAS IRREGULARES; MOLES">TIPO PEDAÇOS FOFOS COM BORDAS IRREGULARES; MOLES</SelectItem>
            <SelectItem value="TIPO TOTALMENTE LÍQUIDO, AQUOSO, SEM PARTES SÓLIDAS">TIPO TOTALMENTE LÍQUIDO, AQUOSO, SEM PARTES SÓLIDAS</SelectItem>
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
          <SelectContent>MAIS CLARAS OU ESBRANQUIÇADAS
          <SelectItem value="mais claras ou esbranquiçadas">mais claras ou esbranquiçadas</SelectItem>
            <SelectItem value="marrom com pontos brancos">marrom com pontos brancos</SelectItem>
            <SelectItem value="marrom">marrom</SelectItem>
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
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="stoolFrequencyVariation"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos 3 meses qual foi a frequência que suas fezes variam entre tipo 1 e 2?<br />
      </FormLabel>
      <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pelo menos 7x na semana">pelo menos 7x na semana</SelectItem>
            <SelectItem value="6x na semana">6x na semana</SelectItem>
            <SelectItem value="5x na semana">5x na semana</SelectItem>
            <SelectItem value="4x na semana">4x na semana</SelectItem>
            <SelectItem value="3x na semana">3x na semana</SelectItem>
            <SelectItem value="2x na semana">2x na semana</SelectItem>
            <SelectItem value="1x na semana">1x na semana</SelectItem>
            <SelectItem value="pelo menos 4x no mes">pelo menos 4x no mes</SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
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
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nunca(0%)">nunca(0%)</SelectItem>
            <SelectItem value="raramente(10%)">raramente(10%)</SelectItem>
            <SelectItem value="ocasionalmente(20-30%)">ocasionalmente(20-30%)</SelectItem>
            <SelectItem value="ás vezes(40-50%)">ás vezes(40-50%)</SelectItem>
            <SelectItem value="frequentemente(60-70%)">frequentemente(60-70)</SelectItem>
            <SelectItem value="geralmente(80%)">geralmente(80%)</SelectItem>
            <SelectItem value="habitualmente(90%)">habitualmente(90%)</SelectItem>
            <SelectItem value="sempre(100%)">sempre(100%)</SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
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
        Nos últimos 3 meses,você sentiu algum tipo de bloqueio ou obstrução no seu intestino ou no seu ãnus que lhe impediu de evacuar?<br />
      </FormLabel>
      <FormControl>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nunca(0%)">nunca(0%)</SelectItem>
            <SelectItem value="raramente(10%)">raramente(10%)</SelectItem>
            <SelectItem value="ocasionalmente(20-30%)">ocasionalmente(20-30%)</SelectItem>
            <SelectItem value="ás vezes(40-50%)">ás vezes(40-50%)</SelectItem>
            <SelectItem value="frequentemente(60-70%)">frequentemente(60-70)</SelectItem>
            <SelectItem value="geralmente(80%)">geralmente(80%)</SelectItem>
            <SelectItem value="habitualmente(90%)">habitualmente(90%)</SelectItem>
            <SelectItem value="sempre(100%)">sempre(100%)</SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
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
            <SelectItem value="nunca(0%)">nunca(0%)</SelectItem>
            <SelectItem value="raramente(10%)">raramente(10%)</SelectItem>
            <SelectItem value="ocasionalmente(20-30%)">ocasionalmente(20-30%)</SelectItem>
            <SelectItem value="ás vezes(40-50%)">ás vezes(40-50%)</SelectItem>
            <SelectItem value="frequentemente(60-70%)">frequentemente(60-70)</SelectItem>
            <SelectItem value="geralmente(80%)">geralmente(80%)</SelectItem>
            <SelectItem value="habitualmente(90%)">habitualmente(90%)</SelectItem>
            <SelectItem value="sempre(100%)">sempre(100%)</SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="incompleteEvacuation"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        nos últimos 3 meses, você teve a sensação de evacuação incompleta mesmo após conseguir evacuar?<br />
      </FormLabel>
      <FormControl>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nunca(0%)">nunca(0%)</SelectItem>
            <SelectItem value="raramente(10%)">raramente(10%)</SelectItem>
            <SelectItem value="ocasionalmente(20-30%)">ocasionalmente(20-30%)</SelectItem>
            <SelectItem value="ás vezes(40-50%)">ás vezes(40-50%)</SelectItem>
            <SelectItem value="frequentemente(60-70%)">frequentemente(60-70)</SelectItem>
            <SelectItem value="geralmente(80%)">geralmente(80%)</SelectItem>
            <SelectItem value="habitualmente(90%)">habitualmente(90%)</SelectItem>
            <SelectItem value="sempre(100%)">sempre(100%)</SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
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
            <SelectItem value="nunca(0%)">nunca(0%)</SelectItem>
            <SelectItem value="raramente(10%)">raramente(10%)</SelectItem>
            <SelectItem value="ocasionalmente(20-30%)">ocasionalmente(20-30%)</SelectItem>
            <SelectItem value="ás vezes(40-50%)">ás vezes(40-50%)</SelectItem>
            <SelectItem value="frequentemente(60-70%)">frequentemente(60-70)</SelectItem>
            <SelectItem value="geralmente(80%)">geralmente(80%)</SelectItem>
            <SelectItem value="habitualmente(90%)">habitualmente(90%)</SelectItem>
            <SelectItem value="sempre(100%)">sempre(100%)</SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="observationIntestinal"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Observações<br />
      </FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<Subheading>Hábitos Alimentares</Subheading>
<FormField
  control={form.control}
  name="vitaminSupplementation"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você faz uso de suplementos alimentares? Quais?<br />
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
        Possio alergias ou intolerância alimentar? Quais?<br />
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
      <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="mais de 6">mais de 6</SelectItem>
            <SelectItem value="não sabe">não sabe</SelectItem>
          </SelectContent>
        </Select>
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
  name="vegetableConsumption"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você tem o costume de comer legumes? Se sim, quais?<br />
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
  name="alimentalPain"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Você sente dores ou desconforto ao comer algum alimento especifico ou  em momentos/hora especifica, se sim.Quais?<br />
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
            <SelectItem value="sim e sim">sim e sim</SelectItem>
            <SelectItem value="sim e não">sim e não</SelectItem>
            <SelectItem value="sim e não sabe">sim e não sabe</SelectItem>
            <SelectItem value="não e não">não e não</SelectItem>
            <SelectItem value="não e sim">não e sim</SelectItem>
            <SelectItem value="não e não sabe">não e não sabe</SelectItem>
            <SelectItem value="não sabe e não sabe">não sabe e não sabe</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="observation"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Observações:<br /></FormLabel>
      <FormControl>
        <Input {...field} />
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
<Subheading>insegurança Alimentar</Subheading>

<FormField
  control={form.control}
  name="haveKids"//aqui comeca os das crianças
  render={({ field }) => (
    <FormItem>
      <FormLabel>
      Possui filhos maiores de 18 anos que mora com você ou que são seu dependentes financeiramente?				
      ?<br />
      </FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Não">Não</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="7">7</SelectItem>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="9">9</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="+10">+10</SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
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
        Nos últimos três meses, os morradores deste domicílio tiveram a preocupação de que a comida acabasse antes que tivessem dinheiro para comprar mais comida?<br />
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
        Nos últimos três meses, os alimentos acabaram antes que os moradores desse domicílio tivessem dinheiro para comprar mais comida?<br />
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
      74. NOS ÚLTIMOS TRÊS MESES, OS MORADORES DESSE DOMICÍLIO FICARAM SEM DINHEIRO PARA TER UMA ALIMENTAÇÃO SAUDÁVEL E VARIADA?

        Nos últimos três meses, os moradores desse domicílio ficaram sem dinheiro para ter uma alimentação saudável e variada?<br />
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
      Nos últimos três meses, os moradores deste domicílio comeram apenas alguns poucos tipos de alimentos que ainda tinham, porque o dinheiro acabou?<br />
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
      76. NOS ÚLTIMOS TRÊS MESES, ALGUM MORADOR DE 18 ANOS OU MAIS DE IDADE, DEIXOU DE FAZER ALGUMA REFEIÇÃO, PORQUE NÃO HAVIA DINHEIRO PARA COMPRAR A COMIDA?

        Nos últimos três meses, algum morador de 18 anos ou mais de idade, deixou de fazer alguma refeição porque não havia dinheiro para comprar comida?<br />
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
        Nos últimos três meses, algum morador de  de 18 anos ou mais de idade, comeu menos do que achou que devia, porque não havia dinheiro para comprar comida?<br />
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
        Nos últimos três meses, algum morador de 18 anos ou mais sentiu fome, mas não comeu, porque não tinha dinheiro para comprar comida?<br />
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
        Nos últimos três meses, algum morador de 18 anos de idade ou mais, ficou um dia inteiro sem comer ou teve apenas uma refeição ao dia porque não tinha dinheiro para comprar a comida?<br />
      </FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sim">Sim</SelectItem>
            <SelectItem value="Não">Não</SelectItem>
            <SelectItem value="Não sabe">Não sabe</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="kidsHealthyFoodLack"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses, os moradores com menos de 18 anos de idade, não puderam ter uma alimentação saudável e variada ,porque não havia dinheiro para comprar a comida?<br />
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
  name="kidsReducedFoodIntake"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses, algum morador com menos  de 18 anos de idade, comeu menos do que você achou que devia porque não havia dinheiro para comprar a comida?<br />
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
  name="kidsLessFood"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses, foi diminuída a quantidade de alimentos das refeições de algum morador com menos de 18 anos de idade, porque não havia dinheiro suficiente para comprar comida ?<br />
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
  name="kidsMealSkipping"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses, algum morador com menos de 18 anos de idade deixou de fazer alguma refeição porque não havia dinheiro para comprar a comida?<br />
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
  name="kidsHungerDueToLackOfMoney"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses, algum morador com menos de 18 anos de idade, sentiu fome,mas não comeu porque não havia dinheiro para comprar mais comida?<br />
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
  name="kidsFullDayWithoutFood"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Nos últimos três meses,algum morador com menos de 18 anos de idade, ficou um dia inteiro sem comer ou, teve apenas uma refeição ao dia, porque não havia dinheiro para comprar comida?<br />
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

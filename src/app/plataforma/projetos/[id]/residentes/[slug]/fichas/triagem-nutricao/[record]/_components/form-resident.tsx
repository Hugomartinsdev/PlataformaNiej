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
                    <FormLabel>Peso atual:</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Altura:</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>IMC:</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Classificação:</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Circunferência da cintura:</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Circunferência do quadril:</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Circunferência da panturrilha:</FormLabel>
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
                    <FormLabel>Circunferência do braço:</FormLabel>
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
                    <FormLabel>Já foi em um nutricionista?</FormLabel>
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
                    <FormLabel>Já fez alguma cirurgia?</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Qual cirurgia?</FormLabel>
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
                    <FormLabel>Tabagismo?</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Alcoolismo?</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Obesidade?</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Há obesos na família?</FormLabel>
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
                    <FormLabel>Quem na família é obeso?</FormLabel>
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
                    <FormLabel>Há diabético na família?</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Quem na família é diabético?</FormLabel>
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
                    <FormLabel>Você é diabético(a)?</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Faz uso de insulina?</FormLabel>
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
                    <FormLabel>Colesterol</FormLabel>
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
                    <FormLabel>Triglicérides alterado</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Convulsões</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Problemas gástricos</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Ansiedade</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Problemas cardíacos</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Outros:</FormLabel>
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
                      Nos últimos três meses, você teve a preocupação de que a
                      comida da sua casa acabasse antes que tivesse dinheiro
                      para comprar mais comida?
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
                name="foodShortage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nos últimos três meses, os alimentos acabaram antes que
                      você tivesse dinheiro para comprar mais comida?
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
                name="healthyFoodLack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nos últimos três meses, você ficou sem dinheiro para ter
                      uma alimentação saudável e variada?
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
                name="limitedFoodVariety"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nos últimos três meses, você comeu apenas alguns poucos
                      tipos de alimentos que ainda tinham, porque o dinheiro
                      acabou?
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
                name="mealSkipping"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nos últimos três meses, você deixou de fazer alguma
                      refeição porque não havia dinheiro para comprar comida?
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
                name="reducedFoodIntake"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nos últimos três meses, você comeu menos do que achou que
                      devia, porque não havia dinheiro para comprar comida?
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
                name="hungerDueToLackOfMoney"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nos últimos três meses, você sentiu fome mas não comeu
                      porque não tinha dinheiro para comprar comida?
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
                name="fullDayWithoutFood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nos últimos três meses, você ficou um dia inteiro sem
                      comer ou teve apenas uma refeição ao dia porque não tinha
                      dinheiro para comprar a comida?
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
                name="wakeUpTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      De manhã, que horas você costuma acordar?
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
                      De noite, que horas você costuma dormir?
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
                    <FormLabel>Você tem dificuldade para respirar?</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      Você tem alguma dificuldade ou desconforto para dormir? Se
                      sim, qual ou quais?
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
                      Toma alguma medicação que interfira no sono?
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
                name="sleepMedicationDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual medicação para o sono?</FormLabel>
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
                    <FormLabel>Você pratica alguma atividade física?</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      Se sim, qual ou quais atividades físicas?
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
                      Quantas horas você gasta fazendo atividades físicas
                      durante a semana?
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
                      Qual a intensidade das suas atividades ao terminá-las?
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
                      Qual seu sentimento/humor na maior parte do tempo?
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
                    <FormLabel>Você fuma?</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      Você bebe? Quantas vezes durante a semana?
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
                    <FormLabel>Você é diagnosticado com diabetes?</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      Alguém na família é diagnosticado com diabetes?
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
                name="dailyWaterIntake"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quantos copos (200ml) com água você bebe no dia?
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
                      A água que você bebe é potável, filtrada, fervida ou
                      tratada com algum produto?
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
                    <FormLabel>Qual a cor da sua urina?</FormLabel>
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
                      Você sente dor abdominal ocorrendo pelo menos 1x na semana
                      nos últimos 3 meses?
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
                name="stoolAppearance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Qual é o aspecto predominante das suas fezes?
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
                name="stoolColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Qual a cor normalmente das suas fezes?
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
                name="stoolFloating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      As suas fezes normalmente boiam ou afundam?
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
                name="stoolConsistencyVariation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nos últimos 3 meses qual foi a frequência que suas fezes
                      variam entre tipo 1 e 2?
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
                      Nos últimos 3 meses, qual foi a frequência das suas
                      evacuações?
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
                      Nos últimos 3 meses, qual foi a frequência no seu
                      intestino ou no seu ânus que lhe impediu de evacuar?
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
                      Nos últimos 3 meses, você teve dificuldades (ANORRETAL)
                      como esforço, desconforto ou dor para conseguir evacuar?
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
                name="laxativeUse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nos últimos 3 meses, você teve o hábito de usar laxantes,
                      enemas ou as mãos para conseguir evacuar?
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
                name="vitaminSupplementation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Você toma algum suplemento vitamínico ou mineral? Qual?
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
                      Você possui alguma condição de saúde que possa afetar sua
                      alimentação? Qual?
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
                      Você possui alguma restrição alimentar ou alergia? Qual?
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
                      Quantas refeições você faz ao longo do dia sem contar os
                      lanches?
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
                      Quais os alimentos que você costuma comer no café da
                      manhã?
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
                      Quais os alimentos que você costuma comer no almoço?
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
                      Quais alimentos você costuma comer no jantar?
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
                      Você lancha entre as refeições principais? Se sim, o que
                      você costuma comer?
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
                      Você tem o costume de comer frutas? Se sim, qual ou quais?
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
                      Você tem o costume de comer legumes? Se sim, qual ou
                      quais?
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
                      Você tem o costume de lavar suas mãos antes das refeições
                      e antes de manusear/preparar os alimentos?
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
                      Você tem o costume de lavar suas mãos antes das refeições
                      e antes de manusear/preparar os alimentos?
                    </FormLabel>
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
                    <FormLabel>Café da manhã:</FormLabel>
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
                    <FormLabel>Lanche da manhã:</FormLabel>
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
                    <FormLabel>Almoço:</FormLabel>
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
                    <FormLabel>Lanche da tarde:</FormLabel>
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
                    <FormLabel>Janta:</FormLabel>
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
                    <FormLabel>Ceia:</FormLabel>
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

import { z } from "zod";

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

export type sociodemographicQuestionnaireType = z.infer<typeof formSchema> & {
  id?: string;
  residentId?: string;
  projectId?: string;
};

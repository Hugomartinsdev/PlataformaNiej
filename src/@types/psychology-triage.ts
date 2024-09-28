import { z } from "zod";

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

export type PsychologyTriageType = z.infer<typeof formSchema> & {
  id?: string;
  residentId?: string;
  projectId?: string;
};

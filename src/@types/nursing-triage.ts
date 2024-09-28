import { z } from "zod";

const formSchema = z.object({
  main_complaint: z.string().optional(),
  associated_systemic_diseases: z.string().optional(),
  current_medications: z.string().optional(),
  family_history: z.string().optional(),
  allergies: z.string().optional(),
  alcohol_use: z.string().optional(),
  smoking_status: z.string().optional(),
  diet: z.string().optional(),
  water_intake: z.string().optional(),
  blood_pressure: z.string().optional(),
  heart_rate: z.string().optional(),
  respiratory_rate: z.string().optional(),
  temperature: z.string().optional(),
  oxygen_saturation: z.string().optional(),
  blood_glucose: z.string().optional(),
  pain_scale: z.string().optional(),
  pain_location: z.string().optional(),
  general_observations: z.string().optional(),
});

export type NursingTriageType = z.infer<typeof formSchema> & {
  id?: string;
  residentId?: string;
  projectId?: string;
};

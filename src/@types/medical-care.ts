import { z } from "zod";

const formSchema = z.object({
  weight: z.string().optional(),
  height: z.string().optional(),
  bmi: z.string().optional(),
  mainComplaint: z.string().optional(),
  evolutive: z.string().optional(),
  isda: z.string().optional(),
  physicalExam: z.string().optional(),
  geral: z.string().optional(),
  cardiovascular: z.string().optional(),
  pulmonary: z.string().optional(),
  abdomen: z.string().optional(),
  diagnosticHypothesis: z.string().optional(),
  treatmentPlan: z.string().optional(),
});

export type MedicalCareType = z.infer<typeof formSchema> & {
  id?: string;
  residentId?: string;
  projectId?: string;
};

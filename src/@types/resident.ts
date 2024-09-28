import { z } from "zod";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(3, "Nome deve ter no mínimo 3 caracteres"),
  socialName: z.string().optional(),
  motherName: z.string().optional(),
  birthDate: z.string().optional(),
  residenceInfo: z.string().optional(),
  genderIdentity: z.string().optional(),
  ethnicRacialIdentification: z.string().optional(),
  quilombola: z.string().optional(),
  susCardNumber: z.string().optional(),
  contactPhone: z.string().optional(),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  maritalStatus: z.string().optional(),
  dependents: z.string().optional(),
});

export type ResidentType = z.infer<typeof formSchema> & {
  id?: string;
  projectId: string;
};

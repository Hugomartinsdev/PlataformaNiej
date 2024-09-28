"use server";

import { NursingTriageType } from "@/@types/nursing-triage";
import {
  InternalServerError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/lib/errors";
import { db } from "@/server/db";
import {
  dentalEvaluation,
  lawSchema,
  medicalCareSchema,
  medicalEvaluation,
  nursingTriageSchema,
  nutritionScreeningSchema,
  psychologyTriageSchema,
  sociodemographicQuestionnaireSchema,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function GetRecords(id: string) {
  if (!id) {
    throw new UnauthorizedError();
  }

  const nursingTriageQuery = await db
    .select()
    .from(nursingTriageSchema)
    .where(eq(nursingTriageSchema.residentId, id));

  const nursingTriage = nursingTriageQuery.map((nursingTriage) => {
    return {
      ...nursingTriage,
      name: "Triagem Enfermagem",
    };
  });

  const medicalCareQuery = await db
    .select()
    .from(medicalCareSchema)
    .where(eq(medicalCareSchema.residentId, id));

  const medicalCare = medicalCareQuery.map((medicalCare) => {
    return {
      ...medicalCare,
      name: "Atendimento Medico",
    };
  });

  const psychologyTriageQuery = await db
    .select()
    .from(psychologyTriageSchema)
    .where(eq(psychologyTriageSchema.residentId, id));

  const psychologyTriage = psychologyTriageQuery.map((psychologyTriage) => {
    return {
      ...psychologyTriage,
      name: "Triagem psicologia",
    };
  });

  const nutritionScreeningQuery = await db
    .select()
    .from(nutritionScreeningSchema)
    .where(eq(nutritionScreeningSchema.residentId, id));

  const nutritionScreening = nutritionScreeningQuery.map(
    (nutritionScreening) => {
      return {
        ...nutritionScreening,
        name: "Triagem Nutrição",
      };
    },
  );

  const sociodemographicQuery = await db
    .select()
    .from(sociodemographicQuestionnaireSchema)
    .where(eq(sociodemographicQuestionnaireSchema.residentId, id));

  const sociodemographic = sociodemographicQuery.map((nutritionScreening) => {
    return {
      ...nutritionScreening,
      name: "Sociodemografica",
    };
  });

  const fisioQuery = await db
    .select()
    .from(medicalEvaluation)
    .where(eq(medicalEvaluation.residentId, id));

  const fisio = fisioQuery.map((fisio) => {
    return {
      ...fisio,
      name: "Triagem Fisioterapia",
    };
  });

  const lawQuery = await db
    .select()
    .from(lawSchema)
    .where(eq(lawSchema.residentId, id));

  const law = lawQuery.map((fisio) => {
    return {
      ...fisio,
      name: "Direito",
    };
  });

  const odontoQuery = await db
    .select()
    .from(dentalEvaluation)
    .where(eq(dentalEvaluation.residentId, id));

  const odonto = odontoQuery.map((odonto) => {
    return {
      ...odonto,
      name: "Odontologia",
    };
  });

  return [
    ...nursingTriage,
    ...medicalCare,
    ...psychologyTriage,
    ...nutritionScreening,
    ...sociodemographic,
    ...fisio,
    ...law,
    ...odonto,
  ];
}

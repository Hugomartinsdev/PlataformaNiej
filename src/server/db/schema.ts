// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import {
  text,
  index,
  pgEnum,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projectsSchema.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `plataforma-niej_${name}`);

export const roleEnum = pgEnum("role", ["admin", "user"]);

export const roleProjectEnum = pgEnum("role_project", [
  "member",
  "coordinator",
  "area_coordinator",
  "guest",
]);

export const userSchema = createTable("users", {
  id: varchar("id", { length: 256 })
    .$defaultFn(() => createId())
    .primaryKey(),
  avatar: varchar("avatar", { length: 256 }),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  enroll: varchar("enroll", { length: 256 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const userRelations = relations(userSchema, ({ many }) => ({
  projectsSchema: many(projectMembers),
}));

export const projectsSchema = createTable("projects", {
  id: varchar("id", { length: 256 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  logo: varchar("logo", { length: 256 }),
  banner: varchar("banner", { length: 256 }),
  description: varchar("description", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const projectsRelations = relations(projectsSchema, ({ many }) => ({
  members: many(projectMembers),
}));

export const projectMembers = createTable("project_members", {
  id: serial("id").primaryKey(),
  projectId: varchar("project_id", { length: 256 }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  role: roleProjectEnum("role").default("member").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const projectMembersRelations = relations(projectMembers, ({ one }) => ({
  project: one(projectsSchema, {
    fields: [projectMembers.projectId],
    references: [projectsSchema.id],
  }),
  user: one(userSchema, {
    fields: [projectMembers.userId],
    references: [userSchema.id],
  }),
}));

export const residentSchema = createTable("residents", {
  id: varchar("id", { length: 256 })
    .$defaultFn(() => createId())
    .primaryKey(),
  projectId: varchar("project_id", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  socialName: varchar("social_name", { length: 256 }),
  motherName: varchar("mother_name", { length: 256 }),
  birthDate: varchar("birth_date", { length: 256 }),
  residenceInfo: varchar("residence_info", { length: 256 }),
  genderIdentity: varchar("gender_identity", { length: 256 }),
  ethnicRacialIdentification: varchar("ethnic_racial_identification", {
    length: 256,
  }),
  quilombola: varchar("quilombola", { length: 256 }),
  susCardNumber: varchar("sus_card_number", { length: 256 }),
  contactPhone: varchar("contact_phone", { length: 256 }),
  cpf: varchar("cpf", { length: 256 }),
  rg: varchar("rg", { length: 256 }),
  maritalStatus: varchar("marital_status", { length: 256 }),
  dependents: varchar("dependents", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const residentRelations = relations(residentSchema, ({ one }) => ({
  project: one(projectsSchema, {
    fields: [residentSchema.projectId],
    references: [projectsSchema.id],
  }),
}));

export const nursingTriageSchema = createTable("nursing_triage", {
  id: varchar("id", { length: 256 })
    .$defaultFn(() => createId())
    .primaryKey(),
  residentId: varchar("resident_id", { length: 256 }).notNull(),
  projectId: varchar("project_id", { length: 256 }).notNull(),
  mainComplaint: varchar("main_complaint", { length: 500 }),
  associatedSystemicDiseases: varchar("associated_systemic_diseases", {
    length: 256,
  }),
  currentMedications: varchar("current_medications", { length: 256 }),
  familyHistory: varchar("family_history", { length: 256 }),
  allergies: varchar("allergies", { length: 256 }),
  alcoholUse: varchar("alcohol_use", { length: 256 }),
  smokingStatus: varchar("smoking_status", { length: 256 }),
  diet: varchar("diet", { length: 256 }),
  waterIntake: varchar("water_intake", { length: 256 }),
  bloodPressure: varchar("blood_pressure", { length: 256 }),
  heartRate: varchar("heart_rate", { length: 256 }),
  respiratoryRate: varchar("respiratory_rate", { length: 256 }),
  temperature: varchar("temperature", { length: 256 }),
  oxygenSaturation: varchar("oxygen_saturation", { length: 256 }),
  bloodGlucose: varchar("blood_glucose", { length: 256 }),
  painScale: varchar("pain_scale", { length: 256 }),
  painLocation: varchar("pain_location", { length: 256 }),
  generalObservations: varchar("general_observations", { length: 500 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const nursingTriageRelations = relations(
  nursingTriageSchema,
  ({ one }) => ({
    resident: one(residentSchema, {
      fields: [nursingTriageSchema.residentId],
      references: [residentSchema.id],
    }),
    project: one(projectsSchema, {
      fields: [nursingTriageSchema.projectId],
      references: [projectsSchema.id],
    }),
  }),
);

export const medicalCareSchema = createTable("medical_care", {
  id: varchar("id", { length: 256 })
    .$defaultFn(() => createId())
    .primaryKey(),
  residentId: varchar("resident_id", { length: 256 }).notNull(),
  projectId: varchar("project_id", { length: 256 }).notNull(),
  weight: varchar("weight", { length: 256 }),
  height: varchar("height", { length: 256 }),
  bmi: varchar("bmi", { length: 256 }),
  mainComplaint: varchar("main_complaint", { length: 500 }),
  evolution: varchar("evolution", { length: 256 }),
  isda: varchar("isda", { length: 256 }),
  physicalExam: varchar("physical_exam", { length: 256 }),
  geral: varchar("geral", { length: 256 }),
  cardiovascular: varchar("cardiovascular", { length: 256 }),
  pulmonary: varchar("pulmonary", { length: 256 }),
  abdomen: varchar("abdomen", { length: 256 }),
  diagnosticHypothesis: varchar("diagnostic_hypothesis", { length: 500 }),
  treatmentPlan: varchar("treatment_plan", { length: 500 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const medicalCareRelations = relations(medicalCareSchema, ({ one }) => ({
  resident: one(residentSchema, {
    fields: [medicalCareSchema.residentId],
    references: [residentSchema.id],
  }),
  project: one(projectsSchema, {
    fields: [medicalCareSchema.projectId],
    references: [projectsSchema.id],
  }),
}));

export const psychologyTriageSchema = createTable("psychology_triage", {
  id: varchar("id", { length: 256 })
    .$defaultFn(() => createId())
    .primaryKey(),
  residentId: varchar("resident_id", { length: 256 }).notNull(),
  projectId: varchar("project_id", { length: 256 }).notNull(),
  leisureOpportunitiesEvaluation: varchar("leisure_opportunities_evaluation", {
    length: 256,
  }),
  sleepEvaluation: varchar("sleep_evaluation", { length: 256 }),
  dietEvaluation: varchar("diet_evaluation", { length: 256 }),
  physicalActivity: varchar("physical_activity", { length: 256 }),
  routineDescription: varchar("routine_description", { length: 256 }),
  personalTimeWellBeing: varchar("personal_time_well_being", { length: 256 }),
  currentFeelings: varchar("current_feelings", { length: 256 }),
  supportSystem: varchar("support_system", { length: 256 }),
  currentFeelingDescription: varchar("current_feeling_description", {
    length: 256,
  }),
  stressLevel: varchar("stress_level", { length: 256 }),
  stressCoping: varchar("stress_coping", { length: 256 }),
  nervousnessFrequency: varchar("nervousness_frequency", { length: 256 }),
  sadnessFrequency: varchar("sadness_frequency", { length: 256 }),
  psychologicalCare: varchar("psychological_care", { length: 256 }),
  psychiatricCare: varchar("psychiatric_care", { length: 256 }),
  psychiatricMedicationUse: varchar("psychiatric_medication_use", {
    length: 256,
  }),
  voluntaryPsychologicalCare: varchar("voluntary_psychological_care", {
    length: 256,
  }),
  interactionObservations: varchar("interaction_observations", { length: 256 }),
  psychologyTeamGuidance: varchar("psychology_team_guidance", { length: 256 }),
  communitySuggestions: varchar("community_suggestions", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const psychologyTriageRelations = relations(
  psychologyTriageSchema,
  ({ one }) => ({
    resident: one(residentSchema, {
      fields: [psychologyTriageSchema.residentId],
      references: [residentSchema.id],
    }),
    project: one(projectsSchema, {
      fields: [psychologyTriageSchema.projectId],
      references: [projectsSchema.id],
    }),
  }),
);

export const nutritionScreeningSchema = createTable("nutrition_screening", {
  id: varchar("id", { length: 256 })
    .$defaultFn(() => createId())
    .primaryKey(),
  residentId: varchar("resident_id", { length: 256 }).notNull(),
  projectId: varchar("project_id", { length: 256 }).notNull(),
  currentWeight: text("current_weight"),
  height: text("height"),
  bmi: text("bmi"),
  bmiClassification: text("bmi_classification"),
  waistCircumference: text("waist_circumference"),
  hipCircumference: text("hip_circumference"),
  rcq: text("rcq"),
  calfCircumference: text("calf_circumference"),
  armCircumference: text("arm_circumference"),
  nutritionistVisit: text("nutritionist_visit"),
  previousSurgery: text("previous_surgery"),
  surgeryDetails: text("surgery_details"),
  smoking: text("smoking"),
  alcoholism: text("alcoholism"),
  obesity: text("obesity"),
  obesityInFamily: text("obesity_in_family"),
  obesityFamilyMembers: text("obesity_family_members"),
  diabetesInFamily: text("diabetes_in_family"),
  diabetesFamilyMembers: text("diabetes_family_members"),
  diabetic: text("diabetic"),
  insulinUse: text("insulin_use"),
  cholesterol: text("cholesterol"),
  alteredTriglycerides: text("altered_triglycerides"),
  convulsions: text("convulsions"),
  gastricProblems: text("gastric_problems"),
  anxiety: text("anxiety"),
  heartProblems: text("heart_problems"),
  otherPathologies: text("other_pathologies"),
  weightLoss: text("weight_loss"),
  seriusOrDiscomfort: text("serius_or_discomfort"),
  foodInsecurityConcern: text("food_insecurity_concern"),
  foodShortage: text("food_shortage"),
  healthyFoodLack: text("healthy_food_lack"),
  limitedFoodVariety: text("limited_food_variety"),
  mealSkipping: text("meal_skipping"),
  reducedFoodIntake: text("reduced_food_intake"),
  hungerDueToLackOfMoney: text("hunger_due_to_lack_of_money"),
  fullDayWithoutFood: text("full_day_without_food"),
  wakeUpTime: text("wake_up_time"),
  bedTime: text("bed_time"),
  breathingDifficulty: text("breathing_difficulty"),
  sleepingDifficulty: text("sleeping_difficulty"),
  sleepMedication: text("sleep_medication"),
  sleepMedicationDetails: text("sleep_medication_details"),
  physicalActivity: text("physical_activity"),
  physicalActivityDetails: text("physical_activity_details"),
  weeklyPhysicalActivityHours: text("weekly_physical_activity_hours"),
  physicalActivityIntensity: text("physical_activity_intensity"),
  mood: text("mood"),
  smokingHabit: text("smoking_habit"),
  alcoholConsumption: text("alcohol_consumption"),
  diabetesDiagnosis: text("diabetes_diagnosis"),
  familyDiabetesDiagnosis: text("family_diabetes_diagnosis"),
  dailyWaterIntake: text("daily_water_intake"),
  waterSource: text("water_source"),
  urineColor: text("urine_color"),
  abdominalPain: text("abdominal_pain"),
  stoolAppearance: text("stool_appearance"),
  stoolColor: text("stool_color"),
  stoolFloating: text("stool_floating"),
  stoolConsistencyVariation: text("stool_consistency_variation"),
  bowelMovementFrequency: text("bowel_movement_frequency"),
  defecationDifficulty: text("defecation_difficulty"),
  anorectalDifficulties: text("anorectal_difficulties"),
  laxativeUse: text("laxative_use"),
  vitaminSupplementation: text("vitamin_supplementation"),
  healthConditionsAffectingDiet: text("health_conditions_affecting_diet"),
  dietaryRestrictions: text("dietary_restrictions"),
  dailyMeals: text("daily_meals"),
  breakfastFoods: text("breakfast_foods"),
  lunchFoods: text("lunch_foods"),
  dinnerFoods: text("dinner_foods"),
  snackingHabits: text("snacking_habits"),
  fruitConsumption: text("fruit_consumption"),
  vegetableConsumption: text("vegetable_consumption"),
  handWashingHabits: text("hand_washing_habits"),
  breakfastRecall: text("breakfast_recall"),
  morningSnackRecall: text("morning_snack_recall"),
  lunchRecall: text("lunch_recall"),
  afternoonSnackRecall: text("afternoon_snack_recall"),
  dinnerRecall: text("dinner_recall"),
  eveningSnackRecall: text("evening_snack_recall"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const nutritionScreeningRelations = relations(
  nutritionScreeningSchema,
  ({ one }) => ({
    resident: one(residentSchema, {
      fields: [nutritionScreeningSchema.residentId],
      references: [residentSchema.id],
    }),
    project: one(projectsSchema, {
      fields: [nutritionScreeningSchema.projectId],
      references: [projectsSchema.id],
    }),
  }),
);

export const sociodemographicQuestionnaireSchema = createTable(
  "sociodemographic_questionnaire",
  {
    id: varchar("id", { length: 256 })
      .$defaultFn(() => createId())
      .primaryKey(),
    residentId: varchar("resident_id", { length: 256 }).notNull(),
    projectId: varchar("project_id", { length: 256 }).notNull(),
    houseElectricity: text("house_electricity"),
    stableElectricity: text("stable_electricity"),
    stableElectricityObservations: text("stable_electricity_observations"),
    bathroomCount: text("bathroom_count"),
    sewerSystem: text("sewer_system"),
    garbageDisposal: text("garbage_disposal"),
    internetConnection: text("internet_connection"),
    drinkingWaterSource: text("drinking_water_source"),
    domesticWaterSource: text("domestic_water_source"),
    touristActivity: text("tourist_activity"),
    entrepreneurshipIncentives: text("entrepreneurship_incentives"),
    ownTransportation: text("own_transportation"),
    cooperativeKnowledge: text("cooperative_knowledge"),
    localCollectives: text("local_collectives"),
    mainIncomeSource: text("main_income_source"),
    additionalIncomeSource: text("additional_income_source"),
    monthlyFamilyIncome: text("monthly_family_income"),
    entrepreneurshipDesire: text("entrepreneurship_desire"),
    entrepreneurshipTraining: text("entrepreneurship_training"),
    trainingInterest: text("training_interest"),
    publicSecurity: text("public_security"),
    literacyStatus: text("literacy_status"),
    educationLevel: text("education_level"),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at"),
  },
);

export const sociodemographicQuestionnaireRelations = relations(
  sociodemographicQuestionnaireSchema,
  ({ one }) => ({
    resident: one(residentSchema, {
      fields: [sociodemographicQuestionnaireSchema.residentId],
      references: [residentSchema.id],
    }),
    project: one(projectsSchema, {
      fields: [sociodemographicQuestionnaireSchema.projectId],
      references: [projectsSchema.id],
    }),
  }),
);

export const medicalEvaluation = createTable("medical_evaluation", {
  id: varchar("id", { length: 256 })
    .$defaultFn(() => createId())
    .primaryKey(),
  residentId: varchar("resident_id", { length: 256 }).notNull(),
  projectId: varchar("project_id", { length: 256 }).notNull(),
  occupation: text("occupation"),
  responsible: text("responsible"),
  kinship: text("kinship"),
  clinicalDiagnosis: text("clinical_diagnosis"),
  mainComplaint: text("main_complaint"),
  functionalComplaint: text("functional_complaint"),
  currentDiseaseHistory: text("current_disease_history"),
  medications: text("medications"),
  personalHistory: text("personal_history"),
  lifestyleHabits: text("lifestyle_habits"),
  painAssessment: text("pain_assessment"),
  painIntensity: text("pain_intensity"),
  painLocation: text("pain_location"),
  painFrequency: text("pain_frequency"),
  painCharacteristics: text("pain_characteristics"),
  painInterference: text("pain_interference"),
  patientPresentation: text("patient_presentation"),
  weight: text("weight"),
  height: text("height"),
  bmi: text("bmi"),
  bloodPressure: text("blood_pressure"),
  heartRate: text("heart_rate"),
  respiratoryRate: text("respiratory_rate"),
  oxygenSaturation: text("oxygen_saturation"),
  pulmonaryAuscultation: text("pulmonary_auscultation"),
  posturalAssessment: text("postural_assessment"),
  specificInspection: text("specific_inspection"),
  neurologicalExam: text("neurological_exam"),
  ashworthScale: text("ashworth_scale"),
  rombergTest: text("romberg_test"),
  unilateralBalanceTest: text("unilateral_balance_test"),
  getUpAndGoTest: text("get_up_and_go_test"),
  katzIndex: text("katz_index"),
  fallHistory: text("fall_history"),
  fearOfFalling: text("fear_of_falling"),
  timeUpAndGo: text("time_up_and_go"),
  fallRisk: text("fall_risk"),
  tandemGait: text("tandem_gait"),
  obstetricHistory: text("obstetric_history"),
  gynecologicalHistory: text("gynecological_history"),
  urinarySymptoms: text("urinary_symptoms"),
  sexualFunction: text("sexual_function"),
  anorectalEvaluation: text("anorectal_evaluation"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const medicalEvaluationRelations = relations(
  medicalEvaluation,
  ({ one }) => ({
    resident: one(residentSchema, {
      fields: [medicalEvaluation.residentId],
      references: [residentSchema.id],
    }),
    project: one(projectsSchema, {
      fields: [medicalEvaluation.projectId],
      references: [projectsSchema.id],
    }),
  }),
);

export const lawSchema = createTable("law", {
  id: varchar("id", { length: 256 })
    .$defaultFn(() => createId())
    .primaryKey(),
  residentId: varchar("resident_id", { length: 256 }).notNull(),
  projectId: varchar("project_id", { length: 256 }).notNull(),
  birthRegistration: varchar("birth_registration",{length: 256}),
	assistencialBenefits: varchar("assistencial_benefits",{length: 256}),
	benefitsDetails: varchar("benefits_details",{length: 256}),
	retirement: varchar("retirement",{length: 256}),
	Pension: varchar("Pension",{length: 256}),
	pensionDetails: varchar("pension_details",{length: 256}),
	alimenticPension: varchar("alimentic_pension",{length: 256}),
	alimenticPensionDetails: varchar("alimentic_pension_details",{length: 256}),
	imovelOrTerrainRegulantion: varchar("imovel_or_terrain_regulantion",{length: 256}),
	imovelOrTerrainRegulantionDetails: varchar("imovel_or_terrain_regulantion_details",{length: 256}),
	juducialAlvara: varchar("juducial_alvara",{length: 256}),
	extraJudicialAgreement: varchar("extra_judicial_agreement",{length: 256}),
	executivTitle: varchar("executiv_title",{length: 256}),
	paternityRecognition: varchar("paternity_recognition",{length: 256}),
	paternityContestation: varchar("paternity_contestation",{length: 256}),
	childCustody: varchar("child_custody",{length: 256}),
	divorce: varchar("divorce",{length: 256}),
	stableUnion: varchar("stable_union",{length: 256}),
	guardianshipOrCuratorship: varchar("guardianship_or_curatorship",{length: 256}),
	undueCharge: varchar("undue_charge",{length: 256}),
	undueChargeDetails: varchar("undue_charge_details",{length: 256}),
	documentsEmission: varchar("documents_emission",{length: 256}),
	others: text("others"),
	childrenInvolved: varchar("children_involved",{length: 256}),
	elderlyInvolved: varchar("elderly_involved",{length: 256}),
	pcdInvolved: varchar("pcd_involved",{length: 256}),
	urgency: text("urgency"),
	documentsOrEvidences: text("documents_or_evidences"),
	previousLegalGuidance: varchar("previous_legal_guidance",{length: 256}),
	publicDefense: varchar("public_defense",{length: 256}),
	policeStation: varchar("police_station",{length: 256}),
	govermentSecretary: varchar("goverment_secretary",{length: 256}),
  crasAccess: varchar("cras_access",{length: 256}),
	caduniTelNumber:varchar("caduni_tel_number",{length: 256}),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const lawRelations = relations(lawSchema, ({ one }) => ({
  resident: one(residentSchema, {
    fields: [lawSchema.residentId],
    references: [residentSchema.id],
  }),
  project: one(projectsSchema, {
    fields: [lawSchema.projectId],
    references: [projectsSchema.id],
  }),
}));

export const dentalEvaluation = createTable("dental_evaluation", {
  id: varchar("id", { length: 256 })
    .$defaultFn(() => createId())
    .primaryKey(),
  residentId: varchar("resident_id", { length: 256 }).notNull(),
  projectId: varchar("project_id", { length: 256 }).notNull(),
  generalComplaint: text("general_complaint"),
  toothPain: text("tooth_pain"),
  gumPain: text("gum_pain"),
  bleedingGums: text("bleeding_gums"),
  usesDentalFloss: text("uses_dental_floss"),
  usesToothpaste: text("uses_toothpaste"),
  brushingFrequency: text("brushing_frequency"),
  toothbrushType: text("toothbrush_type"),
  toothbrushReplacement: text("toothbrush_replacement"),
  usesPacifier: text("uses_pacifier"),
  hasAllergy: text("has_allergy"),
  allergyDetails: text("allergy_details"),
  dentalTreatmentStatus: text("dental_treatment_status"),
  dentalTreatmentNotes: text("dental_treatment_notes"),
  takesMedication: text("takes_medication"),
  medicationDetails: text("medication_details"),
  hasOtherIllness: text("has_other_illness"),
  illnessDetails: text("illness_details"),
  gumStatus: text("gum_status"),
  gumNotes: text("gum_notes"),
  buccalMucosaStatus: text("buccal_mucosa_status"),
  buccalMucosaNotes: text("buccal_mucosa_notes"),
  palateStatus: text("palate_status"),
  palateNotes: text("palate_notes"),
  floorOfMouthStatus: text("floor_of_mouth_status"),
  floorOfMouthNotes: text("floor_of_mouth_notes"),
  tongueStatus: text("tongue_status"),
  tongueNotes: text("tongue_notes"),
  fluorosisStatus: text("fluorosis_status"),
  fluorosisNotes: text("fluorosis_notes"),
  odontogram: jsonb("odontogram"),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  updatedAt: timestamp("updated_at"),
});

export const dentalEvaluationRelations = relations(
  dentalEvaluation,
  ({ one }) => ({
    resident: one(residentSchema, {
      fields: [dentalEvaluation.residentId],
      references: [residentSchema.id],
    }),
    project: one(projectsSchema, {
      fields: [dentalEvaluation.projectId],
      references: [projectsSchema.id],
    }),
  }),
);

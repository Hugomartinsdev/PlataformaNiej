CREATE TABLE IF NOT EXISTS "plataforma-niej_medical_evaluation" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"resident_id" varchar(256) NOT NULL,
	"project_id" varchar(256) NOT NULL,
	"occupation" text,
	"responsible" text,
	"kinship" text,
	"clinical_diagnosis" text,
	"main_complaint" text,
	"functional_complaint" text,
	"current_disease_history" text,
	"medications" text,
	"personal_history" text,
	"lifestyle_habits" text,
	"pain_assessment" text,
	"pain_intensity" text,
	"pain_location" text,
	"pain_frequency" text,
	"pain_characteristics" text,
	"pain_interference" text,
	"patient_presentation" text,
	"weight" text,
	"height" text,
	"bmi" text,
	"blood_pressure" text,
	"heart_rate" text,
	"respiratory_rate" text,
	"oxygen_saturation" text,
	"pulmonary_auscultation" text,
	"postural_assessment" text,
	"specific_inspection" text,
	"neurological_exam" text,
	"ashworth_scale" text,
	"romberg_test" text,
	"unilateral_balance_test" text,
	"get_up_and_go_test" text,
	"katz_index" text,
	"fall_history" text,
	"fear_of_falling" text,
	"time_up_and_go" text,
	"fall_risk" text,
	"tandem_gait" text,
	"obstetric_history" text,
	"gynecological_history" text,
	"urinary_symptoms" text,
	"sexual_function" text,
	"anorectal_evaluation" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plataforma-niej_sociodemographic_questionnaire" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"resident_id" varchar(256) NOT NULL,
	"project_id" varchar(256) NOT NULL,
	"house_electricity" text,
	"stable_electricity" text,
	"stable_electricity_observations" text,
	"bathroom_count" text,
	"sewer_system" text,
	"garbage_disposal" text,
	"internet_connection" text,
	"drinking_water_source" text,
	"domestic_water_source" text,
	"tourist_activity" text,
	"entrepreneurship_incentives" text,
	"own_transportation" text,
	"cooperative_knowledge" text,
	"local_collectives" text,
	"main_income_source" text,
	"additional_income_source" text,
	"monthly_family_income" text,
	"entrepreneurship_desire" text,
	"entrepreneurship_training" text,
	"training_interest" text,
	"public_security" text,
	"literacy_status" text,
	"education_level" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);
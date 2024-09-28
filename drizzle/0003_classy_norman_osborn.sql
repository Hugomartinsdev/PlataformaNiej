CREATE TABLE IF NOT EXISTS "plataforma-niej_medical_care" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"resident_id" varchar(256) NOT NULL,
	"project_id" varchar(256) NOT NULL,
	"weight" varchar(256),
	"height" varchar(256),
	"bmi" varchar(256),
	"main_complaint" varchar(500),
	"evolution" varchar(256),
	"isda" varchar(256),
	"physical_exam" varchar(256),
	"geral" varchar(256),
	"cardiovascular" varchar(256),
	"pulmonary" varchar(256),
	"abdomen" varchar(256),
	"diagnostic_hypothesis" varchar(500),
	"treatment_plan" varchar(500),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "plataforma-niej_nursing_triage" ALTER COLUMN "main_complaint" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "plataforma-niej_nursing_triage" ALTER COLUMN "general_observations" SET DATA TYPE varchar(500);
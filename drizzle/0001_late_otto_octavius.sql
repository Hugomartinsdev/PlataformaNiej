CREATE TABLE IF NOT EXISTS "plataforma-niej_residents" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"project_id" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"social_name" varchar(256),
	"mother_name" varchar(256),
	"birth_date" varchar(256),
	"residence_info" varchar(256),
	"gender_identity" varchar(256),
	"ethnic_racial_identification" varchar(256),
	"quilombola" varchar(256),
	"sus_card_number" varchar(256),
	"contact_phone" varchar(256),
	"cpf" varchar(256),
	"rg" varchar(256),
	"marital_status" varchar(256),
	"dependents" varchar(256),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "plataforma-niej_project_members" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "plataforma-niej_projects" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "plataforma-niej_users" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "plataforma-niej_users" ADD CONSTRAINT "plataforma-niej_users_email_unique" UNIQUE("email");
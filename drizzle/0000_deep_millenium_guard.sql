DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role_project" AS ENUM('member', 'coordinator', 'area_coordinator', 'guest');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plataforma-niej_project_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"role" "role_project" DEFAULT 'member' NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plataforma-niej_projects" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"logo" varchar(256),
	"banner" varchar(256),
	"description" varchar(256),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plataforma-niej_users" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"avatar" varchar(256),
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"enroll" varchar(256),
	"role" "role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);

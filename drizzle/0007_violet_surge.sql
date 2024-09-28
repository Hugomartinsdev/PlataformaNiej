CREATE TABLE IF NOT EXISTS "plataforma-niej_law" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"resident_id" varchar(256) NOT NULL,
	"project_id" varchar(256) NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);

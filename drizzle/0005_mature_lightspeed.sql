CREATE TABLE IF NOT EXISTS "plataforma-niej_nutrition_screening" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"resident_id" varchar(256) NOT NULL,
	"project_id" varchar(256) NOT NULL,
	"current_weight" text,
	"narcotic_consumption" text,
	"height" text,
	"bmi" text,
	"bmi_classification" text,
	"waist_circumference" text,
	"hip_circumference" text,
	"rcq" text,
	"calf_circumference" text,
	"arm_circumference" text,
	"nutritionist_visit" text,
	"previous_surgery" text,
	"surgery_details" text,
	"smoking" text,
	"alcoholism" text,
	"obesity" text,
	"obesity_in_family" text,
	"obesity_family_members" text,
	"diabetes_in_family" text,
	"diabetes_family_members" text,
	"diabetic" text,
	"insulin_use" text,
	"cholesterol" text,
	"triglycerides" text,
	"convulsions" text,
	"gastric_problems" text,
	"other_pathologies" text,
	"weight_loss" text,
	"serius_or_discomfort" text,
	"observations" text,
	"food_insecurity_concern" text,
	"food_shortage" text,
	"healthy_food_lack" text,
	"limited_food_variety" text,
	"meal_skipping" text,
	"reduced_food_intake" text,
	"hunger_due_to_lack_of_money" text,
	"full_day_without_food" text,
	"wake_up_time" text,
	"bed_time" text,
	"breathing_difficulty" text,
	"sleeping_difficulty" text,
	"medication" text,
	"medication_details" text,
	"hypertension" text,
	"hipertension_family_members" text,
	"hipertension_in_family" text,
	"physical_activity" text,
	"physical_activity_details" text,
	"weekly_physical_activity_hours" text,
	"physical_activity_intensity" text,
	"mood" text,
	"smoking_habit" text,
	"alcohol_consumption" text,
	"diabetes_diagnosis" text,
	"family_diabetes_diagnosis" text,
	"daily_water_intake" text,
	"water_source" text,
	"urine_color" text,
	"abdominal_pain" text,
	"stool_appearance" text,
	"stool_color" text,
	"stool_floating" text,
	"stool_consistency_variation" text,
	"bowel_movement_frequency" text,
	"defecation_difficulty" text,
	"anorectal_difficulties" text,
	"laxative_use" text,
	"vitamin_supplementation" text,
	"health_conditions_affecting_diet" text,
	"dietary_restrictions" text,
	"daily_meals" text,
	"breakfast_foods" text,
	"lunch_foods" text,
	"dinner_foods" text,
	"snacking_habits" text,
	"fruit_consumption" text,
	"vegetable_consumption" text,
	"hand_washing_habits" text,
	"breakfast_recall" text,
	"morning_snack_recall" text,
	"lunch_recall" text,
	"afternoon_snack_recall" text,
	"dinner_recall" text,
	"evening_snack_recall" text,
	"blood_glucose" text,
	"observation_health" text,
	"have_kids" text,
	"kids_healthy_food_lack" text,
	"kids_reduced_food_intake" text,
	"kids_less_food" text,
	"kids_meal_skipping" text,
	"kids_hunger_due_to_lack_of_money" text,
	"kids_full_day_without_food" text,
	"incomplete_evacuation" text,
	"observation_intestinal" text,
	"snack" text,
	"alimental_pain" text,
	"Observations_road_habits" text,
  	"obsevation_clinical_history" text,
  	"observation_family_history" text,
  	"bloodPressure" text,
  	"SAT_O2" text,
  	"observation_health_markers" text,
  	"observation_anthropometric_measurements" text,
  	"Observation_water_intake" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);

import { ProjectType } from "./project";

export type UserType = {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  projects: ProjectType[];
  id: string;
  avatar: string | null;
  enroll: string | null;
  createdAt: Date;
  updatedAt: Date | null;
};

import { z } from "zod";
import { NewPatientSchema } from "./utils";

export enum Genders {
  Male = "male",
  Female = "female",
  Other = "other",
}
export type NewPatient = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatient {
  id: string;
}
export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

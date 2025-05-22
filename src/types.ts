import { z } from "zod";
import { NewEntrySchema, NewPatientSchema } from "./utils";

export enum Genders {
  Male = "male",
  Female = "female",
  Other = "other",
}
export type NewPatient = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

// Entry

export type NewEntry = z.infer<typeof NewEntrySchema>;
export type Entry = NewEntry & { id: string };

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

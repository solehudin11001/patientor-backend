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
  entries: Entry[];
}
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

// Entry

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

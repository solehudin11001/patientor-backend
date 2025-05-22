import { z } from "zod";
import { Genders } from "./types";

// Custom schema
const nonEmptyString = (fieldName: string) =>
  z.string().min(1, { message: `${fieldName} is required` });

const dateString = z.preprocess(
  (val) => (val === "" ? undefined : val),
  z.string().date().optional()
);

// Zod patient schema
export const NewPatientSchema = z.object({
  name: nonEmptyString("Name"),
  dateOfBirth: z.string().date(),
  ssn: nonEmptyString("SSN"),
  gender: z.nativeEnum(Genders),
  occupation: nonEmptyString("Occupation"),
  entries: z.array(z.unknown()).optional().default([]).nullable(),
});

// Entry base schema
const EntryBaseSchema = {
  description: nonEmptyString("Description"),
  date: z.string().date(),
  specialist: nonEmptyString("Specialist"),
  diagnosisCodes: z.array(z.string()).optional(),
};

// Health check entry schema
export const HealthCheckEntrySchema = z.object({
  ...EntryBaseSchema,
  type: z.literal("HealthCheck"),
  healthCheckRating: z.coerce.number().min(0).max(3),
});

// Hospital entry schema
export const HospitalEntrySchema = z.object({
  ...EntryBaseSchema,
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: nonEmptyString("Criteria"),
  }),
});

// Occupational Healthcare entry schema
export const OccupationalHealthcareEntrySchema = z.object({
  ...EntryBaseSchema,
  type: z.literal("OccupationalHealthcare"),
  employerName: nonEmptyString("Employer name"),
  sickLeave: z
    .object({
      startDate: dateString,
      endDate: dateString,
    })
    .optional(),
});

// Union of all entry schemas
export const NewEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

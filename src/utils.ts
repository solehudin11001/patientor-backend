import { z } from "zod";
import { Genders } from "./types";

// Zod patient schema
export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Genders),
  occupation: z.string(),
});

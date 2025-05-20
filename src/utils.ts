import { z } from "zod";
import { Diagnoses, Genders } from "./types";

// Zod patient schema
export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Genders),
  occupation: z.string(),
});

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnoses["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnoses["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnoses["code"]>;
};

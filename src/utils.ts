import { Genders, Patient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorret or missing data: ${text}`);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGenderValid = (gender: string): gender is Genders => {
  return Object.values(Genders)
    .map((g) => g.toString())
    .includes(gender);
};

const parsegender = (gender: unknown): Genders => {
  if (!isString(gender) || !isGenderValid(gender)) {
    throw new Error(`Incorret or missing data: ${gender}`);
  }
  return gender;
};

const validateNewPatient = (newPatient: unknown): Omit<Patient, "id"> => {
  if (!newPatient || typeof newPatient !== "object") {
    throw new Error("Incorret or missing data.");
  }

  if (
    "name" in newPatient &&
    "dateOfBirth" in newPatient &&
    "ssn" in newPatient &&
    "gender" in newPatient &&
    "occupation" in newPatient
  ) {
    const validatedPatient = {
      name: parseString(newPatient.name),
      dateOfBirth: parseDate(newPatient.dateOfBirth),
      ssn: parseString(newPatient.ssn),
      gender: parsegender(newPatient.gender),
      occupation: parseString(newPatient.occupation),
    };

    return validatedPatient;
  }

  throw new Error("Incorret data: some fields are missing.");
};

export default {
  validateNewPatient,
};

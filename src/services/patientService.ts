import { v1 as uuid } from "uuid";
import { Entry, NonSensitivePatient, Patient, UnionOmit } from "../types";
import dataPatients from "../../data/patients";
import { parseDiagnosisCodes } from "../utils";

// Get all patients
const getPatients = (): Omit<NonSensitivePatient, "ssn">[] => {
  return dataPatients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

// Get patient by id
const getPatientById = (id: string): Patient | undefined => {
  return dataPatients.find((patient) => patient.id === id);
};

// Add patient
const addPatient = (newPatient: Omit<Patient, "id">): Patient => {
  const patient = {
    id: uuid(),
    ...newPatient,
  };
  dataPatients.push(patient);
  return patient;
};

// Add patient entry
const addPatientEntry = (
  id: string,
  newPatientEntry: UnionOmit<Entry, "id">
) => {
  const patient = getPatientById(id);
  if (!patient) {
    throw new Error("Patient not found");
  }
  const diagnosisCodes = parseDiagnosisCodes(newPatientEntry);
  const entry = {
    id: uuid(),
    diagnosisCodes,
    ...newPatientEntry,
  };
  patient.entries.push(entry);
  dataPatients.map((p) => (p.id === id ? patient : p));
  return patient;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addPatientEntry,
};

import { v1 as uuid } from "uuid";
import { Entry, NonSensitivePatient, Patient, UnionOmit } from "../types";
import dataPatients from "../../data/patients";

// Get all patients
const getPatients = (): NonSensitivePatient[] => {
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

  const entry = {
    id: uuid(),
    ...newPatientEntry,
  };

  patient.entries.push(entry);
  dataPatients.map((p) => (p.id === id ? patient : p));
  return entry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addPatientEntry,
};

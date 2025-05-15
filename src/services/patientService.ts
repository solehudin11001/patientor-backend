import { v1 as uuid } from "uuid";
import { Patient } from "../types";
import dataPatients from "../../data/patients";

const getPatients = (): Omit<Patient, "ssn">[] => {
  return dataPatients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addPatient = (newPatient: Omit<Patient, "id">): Patient => {
  const patient = {
    id: uuid(),
    ...newPatient,
  };
  dataPatients.push(patient);
  return patient;
};

export default {
  getPatients,
  addPatient,
};

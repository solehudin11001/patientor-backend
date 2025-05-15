import { Diagnoses } from "../types";
import dataDiagnoses from "../../data/diagnoses";

const getDiagnoses = (): Diagnoses[] => {
  return dataDiagnoses;
};

export default {
  getDiagnoses,
};

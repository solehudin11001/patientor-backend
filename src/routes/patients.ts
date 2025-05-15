import express, { Response } from "express";
import { Patient } from "../types";
import patientService from "../services/patientService";
import utils from "../utils";
const router = express.Router();

router.get("/", (_req, res: Response<Omit<Patient, "ssn">[]>) => {
  res.json(patientService.getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = utils.validateNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

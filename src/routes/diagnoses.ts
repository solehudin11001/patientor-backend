import express, { Response } from "express";
import { Diagnoses } from "../types";
import patientService from "../services/diagnosisService";
const router = express.Router();

router.get("/", (_req, res: Response<Diagnoses[]>) => {
  res.json(patientService.getDiagnoses());
});

export default router;

import express, { NextFunction, Request, Response } from "express";
import { Entry, NonSensitivePatient, Patient, UnionOmit } from "../types";
import patientService from "../services/patientService";
import { NewEntrySchema, NewPatientSchema } from "../utils";
import { z } from "zod";
const router = express.Router();

// Get all patients
router.get("/", (_req, res: Response<Omit<NonSensitivePatient, "ssn">[]>) => {
  res.json(patientService.getPatients());
});

// Get patient by id
router.get("/:id", (req, res) => {
  try {
    const patient = patientService.getPatientById(req.params.id);
    if (!patient) {
      throw new Error("Patient not found");
    }
    res.json(patient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).send({ error: error.message });
    } else {
      res.status(500).send({ error: "Something went wrong" });
    }
  }
});

// Post patient middleware
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

// Post patient
router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, Omit<Patient, "id">>,
    res: Response<Patient>
  ) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

// Post patient entry middleware
const newPatientEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

// Add patient entry
router.post(
  "/:id/entries",
  newPatientEntryParser,
  (
    req: Request<Pick<Patient, "id">, unknown, UnionOmit<Entry, "id">>,
    res: Response<Entry>
  ) => {
    const patient = patientService.addPatientEntry(req.params.id, req.body);
    res.json(patient);
  }
);

// Post patient error middleware
const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send(error.issues);
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;

import express, { NextFunction, Request, Response } from "express";
import { NewPatient, Patient } from "../types";
import patientService from "../services/patientService";
import { NewPatientSchema } from "../utils";
import { z } from "zod";
const router = express.Router();

router.get("/", (_req, res: Response<Omit<Patient, "ssn">[]>) => {
  res.json(patientService.getPatients());
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

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.use(errorMiddleware);

export default router;

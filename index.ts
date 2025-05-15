import express from "express";
import cors from "cors";
import diagnosisRouter from "./src/routes/diagnoses";
import patientRouter from "./src/routes/patients";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

app.listen(3001, () => {
  console.log("server running on port:", 3001);
});

import express from "express";
import patientsService from "../services/patientsService";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
	const patients = patientsService.getEntries();
	res.json(patients);
});

patientsRouter.post("/", (_req, res) => {
  const;
});

export default patientsRouter;
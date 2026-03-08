import express from "express";
import patientsService from "../services/patientsService";
import toNewPatient from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  const patients = patientsService.getEntries();
  res.json(patients);
});

patientsRouter.post("/", (req, res) => {
	try { 
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientsService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (error: unknown) {
		let errorMessage = "Something went wrong.";
		if (error instanceof Error) {
			errorMessage += " Error: " + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default patientsRouter;

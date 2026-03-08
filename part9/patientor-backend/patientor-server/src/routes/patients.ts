import express, { Request, Response, NextFunction } from "express";
import patientsService from "../services/patientsService";
import { NewPatientSchema } from "../utils";

import { z } from "zod";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitiveEntries());
});

// Function to validate and parse the incoming request body for adding a new patient
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		req.body = NewPatientSchema.parse(req.body);
		next();
	} catch (error: unknown) {
		next(error);
	}
};

// Middleware to handle errors, specifically Zod validation errors
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
	if (error instanceof z.ZodError) {
		res.status(400).send({ error: error.issues });
	} else {
		next(error);
	}
};

patientsRouter.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
	console.log("req.body після валідації:", req.body);
	const addedPatient = patientsService.addPatient(req.body);
	res.json(addedPatient);
});
	
patientsRouter.use(errorMiddleware);

export default patientsRouter;

import express from "express";
import diagnosesService from "../services/diagnosesService";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
	const diagnoses = diagnosesService.getEntries();
	res.json(diagnoses);
});

/*diagnosesRouter.post("/api/diagnoses", (_req, res) => {
  res.send("Saving a diagnos!");
});*/

export default diagnosesRouter;

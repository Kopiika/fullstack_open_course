import { NewPatient, Gender } from "./types";
import { z } from "zod";

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

const toNewPatient = (object: unknown): NewPatient => {
	return newPatientSchema.parse(object);
};

export default toNewPatient;
import { Gender } from "./types";
import { z } from "zod";

export const NewPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD"),
  ssn: z.string().min(1, "SSN is required"),
  gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
  occupation: z.string().min(1, "Occupation is required"),
});

export const toNewPatient = (object: unknown): z.infer<typeof NewPatientSchema> => {
  return NewPatientSchema.parse(object);
};
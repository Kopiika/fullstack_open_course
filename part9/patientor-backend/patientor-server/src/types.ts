import { z } from "zod";
import {NewPatientSchema} from "./utils";

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type NewPatient = z.infer<typeof NewPatientSchema>;

// Omit - remove the ssn field from the Patient type, and create a new type called NonSensitivePatient
export type NonSensitivePatient = Omit<Patient, "ssn">;


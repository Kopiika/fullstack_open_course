import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error("Incorrect or missing name");
	}
	return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error("Incorrect or missing dateOfBirth");
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
	 if (
     "name" in object &&
     "dateOfBirth" in object &&
     "ssn" in object &&
     "gender" in object &&
     "occupation" in object
   ) {
     const newPatient: NewPatient = {
       name: parseName(object.name),
       dateOfBirth: parseDateOfBirth(object.dateOfBirth),
       ssn: parseSsn(object.ssn),
       gender: parseGender(object.gender),
       occupation: parseOccupation(object.occupation),
     };
     return newPatient;
	};
	throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatient;
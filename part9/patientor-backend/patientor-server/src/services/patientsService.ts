import { NonSensitivePatient, NewPatient, Patient } from "../types";
import { v1 as uuid } from "uuid";
import patients from "../data/patients";

const getEntries = (): Patient[] => {
  return patients;
};
const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};
    
export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};
import patientsData from "../data/patients";
import { NonSensitivePatient, NewPatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): NonSensitivePatient[] => {
  return patientsData.map(({ ssn: _ssn, ...rest }) => rest);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patientsData.push(newPatient);
  return newPatient;
};
    
 

export default {
  getEntries,
  addPatient,
};
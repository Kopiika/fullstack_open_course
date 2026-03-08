import patientsData from "../data/patients";
import { NonSensitivePatient } from "../types";
import { v1 as uuid } from "uuid";
const id = uuid();

const getEntries = (): NonSensitivePatient[] => {
  return patientsData.map(({ ssn: _ssn, ...rest }) => rest);
};

export default {
  getEntries,
};
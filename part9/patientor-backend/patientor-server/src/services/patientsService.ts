import patientsData from "../data/patients";

import { NonSensitivePatient } from "../types";

const getEntries = (): NonSensitivePatient[] => {
  return patientsData.map(({ ssn: _ssn, ...rest }) => rest);
};

export default {
  getEntries,
};
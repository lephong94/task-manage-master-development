import { set, get, query, limitToLast } from "firebase/database";
import { generateDbRef } from "./configFirebase";

const MASTER_SERVICE_FIREBASE = {
  getLastDataRef: (tablePath) => {
    return get(query(generateDbRef(tablePath), limitToLast(1)));
  },
  addAdminInfo: async (adminId, newAdminData) => {
    return set(generateDbRef(`/admin/${adminId}`), newAdminData);
  },
};

export default MASTER_SERVICE_FIREBASE;

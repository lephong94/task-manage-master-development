import {
  child,
  get,
  remove,
  onValue,
  set,
  update,
  push,
  query,
  limitToLast,
} from "firebase/database";
import { generateDbRef } from "./configFirebase";

import { AXIOS_MESSAGE_INSTANCE } from "./configURL";

const USER_SERVICE_FIREBASE = {
  getAdminInfo: () => {
    return get(child(generateDbRef(), "admin"));
  },
  getUserInfo: () => {
    return get(child(generateDbRef(), "users"));
  },
  getMasterInfo: () => {
    return get(child(generateDbRef(), "master"));
  },
  getSingleUserInfo: (userId) => {
    return get(child(generateDbRef(), `/users/${userId}`));
  },

  getUserInfoObserver: (setFunc) => {
    onValue(generateDbRef(`/users`), (snapshot) => {
      setFunc(snapshot);
    });
  },

  deleteUser: (userId) => {
    return remove(generateDbRef(`/users/${userId}`));
  },

  updateUser: (userId, newUserData) => {
    return update(generateDbRef(`/users/${userId}`), newUserData);
  },

  addUser: (newUserId, newUserData) => {
    return set(generateDbRef(`/users/${newUserId}`), newUserData);
  },

  getLastDataRef: (tablePath) => {
    return get(query(generateDbRef(tablePath), limitToLast(1)));
  },
};

export default USER_SERVICE_FIREBASE;

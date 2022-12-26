// import { ref, child, get, onValue } from "firebase/database";

// const fetchObserve = (db, table) => {
//   const tableRef = ref(db, table);
//   onValue(
//     tableRef,
//     (snapshot) => {
//       console.log("snapshot");
//       console.log(snapshot);
//       const data = snapshot.val();
//       console.log(data);
//     },
//     (error) => {
//       console.log("error for fetching");
//       console.log(error);
//     }
//   );
// };

// const fetchData = (dbRef, table) => {
//   return get(child(dbRef, table));
// };

// const AppStatus = () => {
//   const dbRef = ref(database);
//   fetchObserve(database, "customers");
//   //   fetchData(dbRef, "customers")
//   //     .then((snapshot) => {
//   //       if (snapshot.exists()) {
//   //         console.log(snapshot.val());
//   //       } else {
//   //         console.log("No data available");
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error(error);
//   //     });
// };

// export default AppStatus;

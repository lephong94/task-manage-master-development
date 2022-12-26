import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Login/LoginPage";
import PrivateRoutes from "./core/routes/PrivateRoutes/PrivateRoutes";
import CustomLayout from "./core/Layout/CustomLayout";
import CustomerManagementPage from "./Pages/CustomerManagement/CustomerManagementPage";
import CustomerDetail from "./Pages/CustomerManagement/Detail/CustomerDetail";
import EditCustomerPage from "./Pages/CustomerManagement/Edit/EditCustomerPage";
import AddCustomerPage from "./Pages/CustomerManagement/Add/AddCustomerPage";
import AddUserPage from "./Pages/CustomerManagement/Add/AddUserPage";
import CustomerListPage from "./Pages/CustomerManagement/CustomerListPage";
import UserManagePage from "./Pages/UserManagement/UserManagePage";
import EditUserPage from "./Pages/UserManagement/Edit/EditUserPage";
import UserDetail from "./Pages/UserManagement/Detail/UserDetail";
import UserTaskPage from "./Pages/UserTaskAssignment/UserTaskPage";
import UserTaskAssign from "./Pages/UserTaskAssignment/Admin/TaskAssignment/UserTaskAssign";
import UserTaskTrackingPage from "./Pages/UserTaskAssignment/UserTaskTrackingPage";
import UserTaskDetail from "./Pages/UserTaskAssignment/TaskDetail/UserTaskDetail";
import OrderDetail from "./Pages/CustomerManagement/Detail/OrderDetail";
import AddAdminPage from "./Pages/AdminManagement/AddAdminPage";
import { app } from "./core/services/configFirebase";
import { getMessaging, getToken } from "firebase/messaging";
const requestPermission = (app) => {
  const messaging = getMessaging(app);
  console.log("Requesting permission...");
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        getToken(messaging, {
          vapidKey:
            "BPyFclQo4Y36c-A60fWoeE7e_srSqtk7oy9MNasW2XHTKc3RKu2SjusqNPLtSUKVKknZpFStd1imsEzYc6hISHs",
        }).then((currentToken) => {
          if (currentToken) {
            console.log("current token: ");
            console.log(currentToken);
          } else {
            console.log("can not get token");
          }
        });
      } else {
        console.log("do not have permission");
      }
    })
    .catch((error) => {
      console.log("An error occurred while retrieving token. ", error);
    });
};

function App() {
  requestPermission(app);
  return (
    <>
      <Routes>
        <Route path="/" element={<CustomLayout />}>
          <Route path="login" element={<LoginPage />} />
          {/* Private routes */}
          <Route element={<PrivateRoutes />}>
            <Route index element={<CustomerListPage />} />
            <Route path="manager" element={<CustomerManagementPage />} />
            <Route path="admin/user-management" element={<UserManagePage />} />
            <Route path="admin/add-user" element={<AddUserPage />} />
            <Route path="admin/user/view/:id" element={<UserDetail />} />
            <Route path="admin/user/edit/:id" element={<EditUserPage />} />
            <Route
              path="admin/user/task-management"
              element={<UserTaskPage />}
            />
            <Route
              path="admin/user/task-assign/:id"
              element={<UserTaskAssign />}
            />
            <Route
              path="user/task-tracking"
              element={<UserTaskTrackingPage />}
            />
            <Route
              path="user/task-tracking/detail/:id"
              element={<UserTaskDetail />}
            />
            <Route path="customer/view/:id" element={<CustomerDetail />} />
            <Route path="customer/edit/:id" element={<EditCustomerPage />} />
            <Route path="customer/addcustomer" element={<AddCustomerPage />} />

            <Route
              path="customer/view/:customer_id/order-history/:id"
              element={<OrderDetail order={1} />}
            />
            <Route path="master/admin/add-admin" element={<AddAdminPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

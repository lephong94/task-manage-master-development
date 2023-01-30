import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import USER_SERVICE_FIREBASE from "../../core/services/userServ.firebase";
import UserTaskTrackingActionButtons from "./UserTaskTrackingActionButtons";

const UserTaskTrackingTable = () => {
  let currentUserInfo = LOCAL_SERVICE.user.get();

  const [taskList, setTaskList] = useState([]);
  // fetch api
  useEffect(() => {
    USER_SERVICE_FIREBASE.getSingleUserInfo(currentUserInfo.id)
      .then((snapshot) => {
        console.log("snapshot data");
        console.log(snapshot.val());
        if (snapshot.exists() && snapshot.val().length) {
          let returnedData = snapshot
            .val()
            .tasks.filter((task) => task.completed == false);
          setTaskList(returnedData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "fullname",
      className: "order-number text-[#292d32] text-base",
    },
    {
      title: "Customer Phone",
      dataIndex: "sdt",
      className: "order-number text-[#292d32] text-base",
    },
    {
      title: "Action",
      dataIndex: "",
      className: "action-btn-group",
      key: "x",
      width: "15%",
      render: (_, task) => {
        return <UserTaskTrackingActionButtons taskData={task} />;
      },
    },
  ];

  return (
    <Table
      showHeader={false}
      rowKey={(task) => task.id.toString()}
      columns={columns}
      dataSource={taskList}
      pagination={false}
      className="user-task-tracking-table"
    />
  );
};

export default UserTaskTrackingTable;

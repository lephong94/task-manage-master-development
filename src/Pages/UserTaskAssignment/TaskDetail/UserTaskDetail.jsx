import React, { useEffect } from "react";
import Header from "../../../core/Components/Header/Header";
import TaskDetailForm from "../../../core/Components/Forms/TaskDetailForm";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";
import USER_SERVICE_FIREBASE from "../../../core/services/userServ.firebase";
import { LOCAL_SERVICE } from "../../../core/services/localServ";

const UserTaskDetail = () => {
  const { id } = useParams();
  let [taskInfo, setTaskInfo] = useState({});
  let userInfo = LOCAL_SERVICE.user.get();
  useEffect(() => {
    USER_SERVICE_FIREBASE.getSingleUserInfo(userInfo.id)
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val().hasOwnProperty("tasks")) {
            userInfo.tasks = [...snapshot.val().tasks];
            let taskIdx = snapshot
              .val()
              .tasks.findIndex((task) => task.id === id);
            if (taskIdx > -1) {
              setTaskInfo(snapshot.val().tasks[taskIdx]);
            }
          } else {
            userInfo.tasks = [];
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const renderPage = (taskInfo) => {
    return (
      <div className="col w-full">
        <TaskDetailForm taskInfo={taskInfo} userInfo={userInfo} />
      </div>
    );
  };
  if (Object.keys(taskInfo).length) {
    return (
      <>
        <Header />
        <SectionWrapper
          sectionClass={"user-task-detail"}
          title={`Task Details`}
          content={renderPage(taskInfo)}
          contentClass={"flex flex-col justify-between"}
        />
      </>
    );
  }
};

export default UserTaskDetail;

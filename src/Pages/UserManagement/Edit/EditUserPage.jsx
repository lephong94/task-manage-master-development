import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

import Header from "../../../core/Components/Header/Header";
import EditUserForm from "../../../core/Components/Forms/EditUserForm";

import avatar from "../../../core/assets/images/avatar.svg";
import USER_SERVICE_FIREBASE from "../../../core/services/userServ.firebase";

const EditUserPage = () => {
  const { id } = useParams();

  let [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    USER_SERVICE_FIREBASE.getSingleUserInfo(id)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot);
          setUserInfo({ ...snapshot.val(), id: snapshot.key });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderPage = (userInfo) => {
    const avatarDiv = (
      <div className="col p-[20px] flex justify-center items-center w-full">
        <div className="avatar user-avatar">
          <Avatar
            size={300}
            src={userInfo?.avatar ? userInfo.avatar : avatar}
          />
        </div>
      </div>
    );
    return (
      <>
        <Header />
        {avatarDiv}
        <div className="col w-full">
          <EditUserForm userInfo={userInfo} />
        </div>
      </>
    );
  };

  if (Object.keys(userInfo).length) {
    return (
      <SectionWrapper
        sectionClass={"edit-user"}
        title={`Edit info:  ${userInfo.username}`}
        content={renderPage(userInfo)}
        contentClass={"flex flex-col justify-between"}
      />
    );
  }
};

export default EditUserPage;

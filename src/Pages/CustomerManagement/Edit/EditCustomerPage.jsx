import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditCustomerForm from "../../../core/Components/Forms/EditCustomerForm";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

import CUSTOMER_SERVICE from "../../../core/services/customerServ";
import Header from "../../../core/Components/Header/Header";

import { isValidUrl } from "../../../core/utils/utils";
import avatar from "../../../core/assets/images/avatar_2.svg";
import CUSTOMER_SERVICE_FIREBASE from "../../../core/services/customerServ.firebase";

const EditCustomerPage = () => {
  const { id } = useParams();

  let [customerInfo, setCustomerInfo] = useState({});
  useEffect(() => {
    let returnedData = {};
    CUSTOMER_SERVICE_FIREBASE.getCustomerInfo(id)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let item = snapshot.val();
          returnedData = { ...item, id: id };
          if (!item.hasOwnProperty("order_history")) {
            returnedData = { ...returnedData, order_history: [] };
          }
          setCustomerInfo(returnedData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderPage = (customerInfo) => {
    const avatarDiv = (
      <div className="col p-[20px] flex justify-center items-center w-full">
        <div className="avatar">
          <Avatar
            size={300}
            src={isValidUrl(customerInfo.avatar) ? customerInfo.avatar : avatar}
          />
        </div>
      </div>
    );
    return (
      <>
        <Header />
        {avatarDiv}
        <div className="col w-full">
          <EditCustomerForm customerInfo={customerInfo} />
        </div>
      </>
    );
  };

  if (Object.keys(customerInfo).length) {
    return (
      <SectionWrapper
        sectionClass={"edit-customer"}
        title={`Edit info:  ${customerInfo.fullname}`}
        content={renderPage(customerInfo)}
        contentClass={"flex flex-col justify-between"}
      />
    );
  }
};

export default EditCustomerPage;

import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Label from "./Label/Label";
import TextArea from "antd/es/input/TextArea";
import { nanoid } from "@reduxjs/toolkit";

import Notification from "../Notification/Notification";
import CUSTOMER_SERVICE_FIREBASE from "../../services/customerServ.firebase";
import USER_SERVICE_FIREBASE from "../../services/userServ.firebase";

const TaskDetailForm = ({
  layout = "vertical",
  size = "large",
  taskInfo,
  userInfo,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  let initialValues = { ...taskInfo, specialNote: "" };

  const [customerInfo, setCustomerInfo] = useState({});

  useEffect(() => {
    let returnedData = {};
    CUSTOMER_SERVICE_FIREBASE.getCustomerInfo(taskInfo.customer_id)
      .then((snapshot) => {
        if (snapshot.exists()) {
          returnedData = { ...snapshot.val(), id: taskInfo.customer_id };
          if (!snapshot.val().hasOwnProperty("order_history")) {
            returnedData = { ...returnedData, order_history: [] };
          }
          setCustomerInfo(returnedData);
        }
      })
      .catch((err) => {});
  }, []);

  const handleFinish = (values) => {
    let completeDateTime = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    let newOrderHistory = {
      order_id: nanoid(6),
      order: values.order,
      note: values.note,
      complete_date: completeDateTime.toLocaleDateString("en-US", options),
    };

    let { id, ...newCustomerData } = customerInfo;
    newCustomerData = {
      ...newCustomerData,
      order_history: [...newCustomerData.order_history, newOrderHistory],
    };
    taskInfo.completed = true;
    console.log("task info id");
    console.log(taskInfo);
    console.log("userInfo");
    console.log(userInfo.tasks);
    let taskIdx = userInfo.tasks.findIndex((task) => task.id === taskInfo.id);
    if (taskIdx > -1) {
      userInfo.tasks[taskIdx] = { ...taskInfo };

      let { id, ...newUserData } = userInfo;
      Promise.all([
        CUSTOMER_SERVICE_FIREBASE.updateCustomer(
          taskInfo.customer_id,
          newCustomerData
        ),
        USER_SERVICE_FIREBASE.updateUser(userInfo.id, newUserData),
      ])
        .then(() => {
          Notification("success", `Complete`, `Task ${taskInfo.id} completed`);
          setTimeout(() => {
            navigate("/user/task-tracking");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );
  const renderForm = () => {
    let mapCoordinate = initialValues.map.split(",");
    let latitude = "";
    let longtitude = "";
    let mapUrl = "";
    if (mapCoordinate.length) {
      latitude = mapCoordinate[0].trim();
      longtitude = mapCoordinate[1].trim();
      mapUrl = `https://www.google.pt/maps/dir//${latitude},${longtitude}/@${latitude},${longtitude},20z`;
    }

    initialValues.map = `https://www.google.pt/maps/dir//${latitude},${longtitude}/@${latitude},${longtitude},20z`;

    return (
      <Form
        form={form}
        name="user-task-detail"
        layout={layout}
        size={size}
        onFinish={handleFinish}
        className="user-task-detail-form px-4"
        initialValues={initialValues}
      >
        <Form.Item name="sdt" label={labelItem("Customer phone number")}>
          <Input placeholder="Customer phone number" disabled />
        </Form.Item>
        <Form.Item name="fullname" label={labelItem("Customer name")}>
          <Input placeholder="Customer name" disabled />
        </Form.Item>
        <Form.Item name="address" label={labelItem("Address")}>
          <Input placeholder="Address" disabled />
        </Form.Item>
        <div className="google-map-action">
          <Form.Item name="map" label={labelItem("Google map")}>
            <Input placeholder="Google map" disabled />
          </Form.Item>
          <div className="action">
            <a href={initialValues.map} target="_blank">
              <img
                src="https://templates.envytheme.com/joxi/default/assets/images/icon/maximize.svg"
                alt="map"
              />
            </a>
          </div>
        </div>
        <Form.Item label={labelItem("Order")} name="order">
          <TextArea placeholder="Order" disabled />
        </Form.Item>
        <Form.Item label={labelItem("Order note")} name="note">
          <TextArea placeholder="Order note:" disabled />
        </Form.Item>
        <Form.Item label={labelItem("Customer note")} name="specialNote">
          <TextArea placeholder="Customer note: " disabled />
        </Form.Item>
        <Form.Item className="form-btn-groups">
          <Button
            type="primary"
            htmlType="submit"
            className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded-[4px] font-semibold text-sm transition-all duration-[400ms]"
          >
            Complete
          </Button>
          <Button
            htmlType="button"
            className="btn-cancel bg-[#dc3545] hover:bg-[#bb2d3b] rounded-[4px] text-white text-sm transition-all duration-[400ms] ml-3"
            onClick={() => {
              navigate("/user/task-tracking/");
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  };
  if (Object.keys(customerInfo).length) {
    initialValues = { ...initialValues, specialNote: customerInfo.note };
    return renderForm();
  }
};

export default TaskDetailForm;

import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Label from "../../Components/Forms/Label/Label";
import Notification from "../Notification/Notification";
import { nanoid } from "@reduxjs/toolkit";
import CUSTOMER_SERVICE_FIREBASE from "../../services/customerServ.firebase";
import USER_SERVICE_FIREBASE from "../../services/userServ.firebase";
import axios from "axios";
import ADMIN_SERVICE_FIREBASE from "../../services/adminServ.firebase";

const CustomerInputForm = ({
  layout = "vertical",
  size = "large",
  userInfo,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [customerList, setCustomerList] = useState([]);
  useEffect(() => {
    let returnedData = [];
    CUSTOMER_SERVICE_FIREBASE.getCustomerList()
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((item) => {
            returnedData = [
              ...returnedData,
              {
                key: item.key,
                ...item.val(),
                id: item.key,
              },
            ];
          });
          setCustomerList(returnedData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFinish = (values) => {
    let customerIdx = customerList.findIndex(
      (customer) => customer.sdt === values.sdt
    );
    if (customerIdx > -1) {
      let taskData = {
        id: nanoid(5),
        customer_id: customerList[customerIdx].id,
        fullname: customerList[customerIdx].fullname,
        email: customerList[customerIdx].email,
        sdt: customerList[customerIdx].sdt,
        map: customerList[customerIdx].map,
        address: customerList[customerIdx].address,
        order: values.order,
        note: values.note,
        completed: false,
      };

      userInfo.tasks = [...userInfo.tasks, taskData];
      let { id, ...userData } = userInfo;
      USER_SERVICE_FIREBASE.updateUser(id, { ...userData })
        .then(() => {
          let messageData = {
            to: userData.token,
            notification: {
              title: "Task assigned",
              body: "You have a task assigned",
            },
          };
          let returnedData = ADMIN_SERVICE_FIREBASE.sendMessage(
            messageData
          ).then((res) => {
            return res;
          });

          return returnedData;
        })
        .then((res) => {
          console.log("res after send mess via API");
          console.log(res);
          Notification(
            "success",
            "Assign task for user ok",
            "Please wait a minute"
          );
          setTimeout(() => {
            navigate("/admin/user/task-management");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Notification("error", "Customer phone number does not exist", "");
    }
  };
  const handleFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );

  return (
    <Form
      form={form}
      name="order-customer"
      layout={layout}
      size={size}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      className="order-customer-form"
    >
      <Form.Item
        label={labelItem("Phone number")}
        name="sdt"
        rules={[
          { required: true, message: "Phone number is required" },
          {
            pattern: /^\d+$/,
            message: "Number only, no whitespace",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={labelItem("Order")} name="order">
        <TextArea placeholder="Đơn hàng" />
      </Form.Item>
      <Form.Item label={labelItem("Note")} name="note">
        <TextArea placeholder="Note(s):" />
      </Form.Item>
      <Form.Item className="form-btn-groups">
        <Button
          type="primary"
          htmlType="submit"
          className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded-[4px] font-semibold text-sm transition-all duration-[400ms]"
        >
          Assign
        </Button>
        <Button
          htmlType="button"
          className="btn-cancel bg-[#dc3545] hover:bg-[#bb2d3b] rounded-[4px] text-white text-sm transition-all duration-[400ms] ml-3"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomerInputForm;

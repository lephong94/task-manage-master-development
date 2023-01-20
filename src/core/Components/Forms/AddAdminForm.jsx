import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import Label from "./Label/Label";
import MASTER_SERVICE_FIREBASE from "../../services/masterServ.firebase";
import { LOCAL_SERVICE } from "../../services/localServ";
import Notification from "../Notification/Notification";

const AddAdminForm = ({ layout = "vertical", size = "large" }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [adminId, setAdminId] = useState();

  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() !== "master") {
      navigate("/");
    } else {
      MASTER_SERVICE_FIREBASE.getLastDataRef("/admin")
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((item) => {
              setAdminId(parseInt(item.key) + 1);
            });
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  }, []);

  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );
  const handleFinish = (values) => {
    MASTER_SERVICE_FIREBASE.addAdminInfo(adminId, values)
      .then(() => {
        Notification("success", "Add new admin ok", "Please wait a minute");
        setTimeout(() => {
          navigate("/");
        }, 1200);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderAddForm = () => {
    return (
      <Form
        form={form}
        name="add-admin"
        layout={layout}
        size={size}
        onFinish={handleFinish}
        className="add-admin-form px-4"
      >
        <Form.Item
          label={labelItem("Full name")}
          name="fullname"
          rules={[
            { required: true, message: "Please input your name here" },
            {
              message: "Letters only",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={labelItem("Email")}
          name="email"
          rules={[
            { required: true, message: "Please add your email here" },
            {
              type: "email",
              message: "Please use correct email format",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={labelItem("Password")}
          name="password"
          rules={[{ required: true, message: "Please add your password" }]}
        >
          <Input type="passwords" />
        </Form.Item>

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
        <Form.Item className="form-btn-groups" style={{ marginTop: "30px" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded-[4px] font-semibold text-sm transition-all duration-[400ms]"
          >
            Add new Admin
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
  return renderAddForm();
};

export default AddAdminForm;

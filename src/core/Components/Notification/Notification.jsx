import { notification } from "antd";

const Notification = (type, message = "", desc = "", onClick) => {
  return notification[type]({
    message: message,
    description: desc,
  });
};

export default Notification;

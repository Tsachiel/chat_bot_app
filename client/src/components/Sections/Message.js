import React from "react";
import { List, Avatar, Link } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { RobotOutlined } from "@ant-design/icons";

function Message(props) {
  const AvatarSrc = props.who === "Bot" ? <SmileOutlined /> : <RobotOutlined />;
  return (
    <List.Item style={{ padding: "1rem" }} >
      <List.Item.Meta
        avatar={<Avatar icon={AvatarSrc} />}
        title={props.who}
        description={props.text}
      />
      
    </List.Item>
  );
}

export default Message;

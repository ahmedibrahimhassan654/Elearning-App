import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton, Switch, Col, Divider, Row } from "antd";
import InstructorRoute from "../../components/routes/InstructorRoute";
const { Meta } = Card;
const InstructorIndex = () => {
  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square mt-3">
        instructor dashBoard
      </h1>
    </InstructorRoute>
  );
};

export default InstructorIndex;

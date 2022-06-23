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
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data.data);
  };
  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square mt-3">
        instructor dashBoard
      </h1>
      <pre>{JSON.stringify(courses, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default InstructorIndex;

import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton, Tooltip } from "antd";
import InstructorRoute from "../../components/routes/InstructorRoute";
import Link from "next/link";
const { Meta } = Card;
const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setLoading(false);
    setCourses(data.data);
  };
  const myStyle = { marginTop: "-10px", fontSize: "15px" };

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square mt-3">
        instructor dashBoard
      </h1>
      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}

      {courses && courses.length > 0 ? (
        courses.map((course) => (
          <>
            <div className="container media pt-3 mb-3 border border-secondary">
              <Avatar
                size={150}
                src={course.image ? course.image.Location : "/course.png"}
                alt="course"
                shape="square"
                gap={50}
              />
              <div className="media-body ml-2  ">
                <div className="row ">
                  <div className="col">
                    <Link
                      href={`/instructor/course/view/${course._id}`}
                      className="pointer"
                    >
                      <a className="mt-5 ">
                        <h5 className="pt-2  text-success">{course.name}</h5>
                      </a>
                    </Link>
                    <p className="text-info ">
                      {course.lessons.length} lesson
                    </p>
                    {course.lessons.length < 5 ? (
                      <p style={myStyle} className="text-warning">
                        At least 5 lessons are required to publish a course
                      </p>
                    ) : course.published ? (
                      <p style={myStyle} className="text-success">
                        Your course is live in the marketplace
                      </p>
                    ) : (
                      <p style={myStyle} className="text-success">
                        Your course is ready to be published
                      </p>
                    )}
                  </div>
                  <div className="col-md-3 mt-3 text-center">
                    {course.published ? (
                      <Tooltip title="Published">
                        <CheckCircleOutlined className="h5 pointer text-success" />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Unpublished">
                        <CloseCircleOutlined className="h5 pointer text-warning" />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))
      ) : (
        <h1 className="jumbotron text-center square mt-3">No cources yet</h1>
      )}
    </InstructorRoute>
  );
};

export default InstructorIndex;

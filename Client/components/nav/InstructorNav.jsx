import Link from "next/link";
import { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
const { SubMenu } = Menu;
const { Sider } = Layout;
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
const InstructorNav = ({ collapsed }) => {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        width: "800px",
        top: 0,
      }}
      collapsible
      isCollapsed={collapsed}
      onToggle={(isCollapsed) => setcollapsed(isCollapsed)}
    >
      <div
        className="logo"
        style={{
          backgroundColor: "#8360E6",

          color: "black",
          fontSize: "18px",
          border: "1px solid white",
        }}
      >
        <Link href="/instructor">
          <a className={`nav-link ${current === "/instructor" && "active "} `}>
            <span
              style={{
                backgroundColor: "#8360E6",

                color: "white",
                fontSize: "18px",
              }}
            >
              {" "}
              Instructor DashBoard
            </span>
          </a>
        </Link>
      </div>
      <Menu
        style={{
          overflow: "auto",
          height: "100vh",
          width: "100%",
          position: "fixed",
          position: "sticky",
          backgroundColor: "#8360E6",
          top: 0,
          color: "white",
          fontSize: "18px",
          border: "1px solid white",
          padding: "10px",
        }}
        mode="inline"
        className="nav flex-column nav-pills mt-0"
      >
        <Menu.Item
          icon={<DesktopOutlined />}
          title=" Create Course"
          style={{
            top: 0,
            color: "white",
            fontSize: "18px",
          }}
        >
          <Link href="/instructor/course/create">
            <a
              className={`nav-link ${
                current === "/instructor/course/create" && "active"
              } `}
            >
              Create Course
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default InstructorNav;

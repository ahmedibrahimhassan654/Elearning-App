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
const UserNav = ({ collapsed }) => {
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

        top: 0,
      }}
      collapsible
      isCollapsed={collapsed}
      onToggle={(isCollapsed) => setcollapsed(isCollapsed)}
    >
      <Menu
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          position: "sticky",
          backgroundColor: "#8360E6",
          top: 0,
          color: "white",
          fontSize: "18px",
        }}
        className="nav flex-column nav-pills mt-0"
        mode="inline"
      >
        <Menu.Item icon={<DesktopOutlined />} className="mt-3">
          <Link href="/user">
            <a className={`nav-link ${current === "/user" && "active "} `}>
              Dash Board
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />}>
          Files
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default UserNav;

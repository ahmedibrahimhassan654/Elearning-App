import { useState, useEffect, useContext } from "react";

import { Menu } from "antd";
import Link from "next/link";
import {
  HomeOutlined,
  LoginOutlined,
  PieChartOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const TopNav = () => {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  return (
    <>
      <Menu
        //onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item
          key="/"
          style={{ marginLeft: "auto" }}
          onClick={(e) => setCurrent(e.key)}
          icon={<HomeOutlined twoToneColor="#eb2f96" />}
        >
          <Link href="/">
            <a>App</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="/login"
          onClick={(e) => setCurrent(e.key)}
          icon={<LoginOutlined />}
        >
          <Link href="/login">
            <a>Login</a>
          </Link>
        </Menu.Item>

        <Menu.Item
          key="/register"
          onClick={(e) => setCurrent(e.key)}
          icon={<UserAddOutlined />}
        >
          <Link href="/register">
            <a>register</a>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default TopNav;

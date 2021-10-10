import { Menu } from "antd";
import Link from "next/link";
import {
  HomeOutlined,
  LoginOutlined,
  PieChartOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const TopNav = () => {
  return (
    <>
      <Menu
        //onClick={this.handleClick}
        //selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item
          key="app"
          style={{ marginLeft: "auto" }}
          icon={<HomeOutlined twoToneColor="#eb2f96" />}
        >
          <Link href="/">
            <a>App</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="login" icon={<LoginOutlined />}>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="register" icon={<UserAddOutlined />}>
          <Link href="/register">
            <a>register</a>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default TopNav;

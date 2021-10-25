import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  PieChartOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

import { Context } from "../context";
const TopNav = () => {
  const [current, setCurrent] = useState("");
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    try {
      dispatch({
        type: "LOGOUT",
      });
      // remove user from  local storage
      window.localStorage.removeItem("user");

      const { data } = await axios.get(`/api/logout`);
      toast(` ${data.message}`);

      router.push("/login");
      setLoading(false);
    } catch (err) {
      toast(err.response);
      setLoading(false);
    }
  };
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
        <Menu.Item onClick={logout} icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </>
  );
};

export default TopNav;

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Menu, SubMenu, Avatar } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

import { Context } from "../context";
const TopNav = () => {
  const [current, setCurrent] = useState("");
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  console.log(user);
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
          style={{ marginRight: "auto" }}
          onClick={(e) => setCurrent(e.key)}
          icon={<HomeOutlined twoToneColor="#eb2f96" />}
        >
          <Link href="/">
            <a>App</a>
          </Link>
        </Menu.Item>
        {user === null && (
          <>
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
          </>
        )}
        {user !== null && (
          <>
            <Menu.SubMenu
              key="SubMenu"
              icon={<Avatar size="large" icon={<UserOutlined />} />}
              title={`welcome ${user.name}`}
            >
              <Menu.Item
                onClick={logout}
                icon={<LogoutOutlined />}
                className="float-right"
              >
                Logout
              </Menu.Item>
            </Menu.SubMenu>
          </>
        )}
      </Menu>
    </>
  );
};

export default TopNav;

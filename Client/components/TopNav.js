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
  ProfileOutlined,
  CarryOutOutlined,
  TeamOutlined,
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
        className="navbar"
        selectedKeys={[current]}
        mode="horizontal"
      >
        {user && user.role && user.role.includes("Instructor") ? (
          <>
            <Menu.Item
              key="/instructor/course/create"
              style={{ marginLeft: "200px" }}
              onClick={(e) => setCurrent(e.key)}
              icon={<CarryOutOutlined />}
            >
              <Link href="/instructor/course/create">
                <a style={{ color: "white" }}>Create Course</a>
              </Link>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item
              key="/user/become-instructore"
              style={{ marginLeft: "200px" }}
              onClick={(e) => setCurrent(e.key)}
              icon={<TeamOutlined />}
            >
              <Link href="/user/become-instructore">
                <a style={{ color: "white" }}>Become Instructor</a>
              </Link>
            </Menu.Item>
          </>
        )}
        {user === null && (
          <>
            <Menu.Item
              key="/home"
              style={{ marginLeft: "1px" }}
              onClick={(e) => setCurrent(e.key)}
              icon={<LoginOutlined />}
            >
              <Link href="/home">
                <a>Home</a>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="/login"
              style={{ marginRight: "auto" }}
              onClick={(e) => setCurrent(e.key)}
              icon={<LoginOutlined />}
            >
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Menu.Item>

            <Menu.Item
              key="/register"
              style={{ marginLeft: "auto" }}
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
            <Menu.Item
              key="/"
              style={{ marginLeft: "auto", color: "white" }}
              onClick={(e) => setCurrent(e.key)}
              icon={<HomeOutlined twoToneColor="#eb2f96" />}
            >
              <Link href="/">
                <a style={{ color: "white" }}>App</a>
              </Link>
            </Menu.Item>

            <Menu.SubMenu
              key="SubMenu"
              icon={<Avatar size="large" icon={<UserOutlined />} />}
              title={`welcome ${user.name}`}
              className="float-right"
            >
              <Menu.ItemGroup>
                <Menu.Item
                  key="/user"
                  icon={<ProfileOutlined />}
                  // className="float-left"
                >
                  <Link href="/user">
                    <a>Dash Board</a>
                  </Link>
                </Menu.Item>

                <Menu.Item
                  onClick={logout}
                  icon={<LogoutOutlined />}
                  className="float-left"
                >
                  Logout
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu.SubMenu>
          </>
        )}
      </Menu>
    </>
  );
};

export default TopNav;

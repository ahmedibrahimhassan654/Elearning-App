import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const UserRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false);

  const [collapsed, setcollapsed] = useState(false);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setcollapsed({ collapsed });
  };
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      //   console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        // <div className="container-fluid">
        //   <div className="row">
        //     <div className="col-md-2">
        //       <UserNav />
        //     </div>
        //     <div className="col-md-10">{children}</div>
        //   </div>
        // </div>

        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              position: "sticky",
              top: 0,
            }}
            collapsible
            isCollapsed={collapsed}
            onToggle={(isCollapsed) => setcollapsed(isCollapsed)}
          >
            <div className="logo">
              <h1>logo</h1>
            </div>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                Option 1
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
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content
              style={{ margin: "0 16px", padding: 24, textAlign: "center" }}
            >
              <p className="text-primary">USer Dash Board</p>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <div>{children}</div>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default UserRoute;

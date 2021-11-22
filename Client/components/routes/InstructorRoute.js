import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import InstructorNav from "../nav/InstructorNav";

const InstructorRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false);

  const [collapsed, setcollapsed] = useState(false);
  // router
  const router = useRouter();
  const { SubMenu } = Menu;
  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/current-instructor");
      console.log("INSTRUCTOR ROUTE => ", data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/");
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
        <Layout style={{ minHeight: "100vh", position: "relative" }}>
          <InstructorNav collapsed={collapsed} />
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Content style={{ padding: 24, textAlign: "center" }}>
              <p className="text-primary">Instructor Dash Board</p>
              <div
                className="site-layout-background"
                //  style={{ padding: 24, minHeight: 360 }}
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

export default InstructorRoute;

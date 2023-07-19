import { useQuery } from "react-query";
import { useState } from "react";
import {
  Table,
  Button,
  Layout,
  Menu,
  theme,
  MenuProps,
  Space,
  Avatar,
  Image,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Footer, Header } from "antd/es/layout/layout";
import { getUsersAPI } from "api/user";
import { User } from "core/interface/models";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AntDesignOutlined } from "@ant-design/icons";
import UserPage from "./UserPage/userPage";
import PlanPage from "./PlanPage/PlanPage";
import PlayListMusicPage from "./PlaylistPage/PlayListMusicPage";
import {
  DesktopOutlined,
  MailOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { adminAction } from "store/slice/auth.slice";
import { AUTH_LOGIN } from "core/constants";
import UserDetail from "./UserPage/UserDetail";
import UserInfoPage from "./UserInfo/UserInfoPage";

function HomePage() {
  const [currentPage, setCurrentPage] = useState(null);
  type MenuItem = Required<MenuProps>["items"][number];
  const dispatch = useDispatch();
  const removeData = () => {
    dispatch(adminAction.logout());
    navigate(AUTH_LOGIN);
  };

  const handleClick = (key: any) => {
    setCurrentPage(key);
  };

  const getItem = (
    label: React.ReactNode,
    key: any,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };

  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const { Sider } = Layout;

  const items: MenuItem[] = [
    getItem("DashBoard", "dashbord", <DesktopOutlined />),
    getItem("User Info", "userdetail", <DesktopOutlined />),
    getItem("Manage", "sub1", <MailOutlined />, [
      getItem("User", "user"),
      getItem("Playlist", "playlist"),
      getItem("Plan", "plan"),
    ]),
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background:
            "linear-gradient( rgba(255, 124, 0, 1), rgba(41, 10, 89, 1))",
        }}
      >
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 16px",
            color: "#eee",
            fontSize: "18px",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <span>Mediatation</span>
          <div
            onClick={() => {
              removeData();
            }}
          >
            <LogoutOutlined />
          </div>
        </div>
        <Menu
          style={{
            background: "#D76710",
          }}
          mode="inline"
          items={items}
          onClick={({ key }) => handleClick(key)}
        />
      </Sider>
      <div style={{ width: "100%" }}>
        <div
          style={{
            padding: "12px",
            display: "flex",
            justifyContent: "space-between",
            background: "#eee",
          }}
        >
          <div
            style={{
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
            }}
          >
            Welcome
          </div>
          <div>
            <span>Username</span>
            <Image
              width={50}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              style={{ borderRadius: 30 }}
            />
          </div>
        </div>

        {currentPage === "user" && <UserPage />}
        {currentPage === "playlist" && <PlayListMusicPage />}
        {currentPage === "plan" && <PlanPage />}
        {currentPage === "userdetail" && <UserInfoPage />}
        {currentPage === null && null}
      </div>
    </Layout>
  );
}
export default HomePage;

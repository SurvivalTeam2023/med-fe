/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { getUserDetailAPI, getUsersAPI } from "api/user";
import { User, UserData } from "core/interface/models";
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
import AudioPage from "./AudioPage/AudioPage";
import { getAuthKeyFromLocalStorage } from "../util/localStorage";
import { parseTokenToUsername } from "util/user";
import SubscriptionPage from "./SubscriptionPage/SubscriptionPage";
import MentalHeathDetailPage from "./MentalHeathPage/MentalHeathDetailPage";
import MentalHealthPage from "./MentalHeathPage/MentalHealthPage";

function HomePage() {
  const token: any = getAuthKeyFromLocalStorage();
  const username = parseTokenToUsername(token);
  const fetchUser = async () => {
    const res = await getUserDetailAPI(username);
    const data = res.data;
    return data;
  };
  const { isSuccess, isError, error, data } = useQuery<UserData, Error>(
    ["user"],
    async () => fetchUser()
  );
  if (isSuccess) {
    toast.success("Success");
    toast.clearWaitingQueue();
  }

  if (isError) {
    toast.error(error?.message);
    toast.clearWaitingQueue();
  }
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
    getItem("DashBoard", "dashbord"),
    getItem("User Info", "userdetail"),
    getItem("Suscription", "subscription"),
    getItem("Manage", "sub1", undefined, [
      getItem("User", "user"),
      getItem("Playlist", "playlist"),
      getItem("Plan", "plan"),
      getItem("Audio", "audio"),
      getItem("Mental Health", "mentalhealth"),
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
            fontSize: "16px",
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
            fontSize: "12px",
          }}
          mode="inline"
          items={items}
          onClick={({ key }) => handleClick(key)}
        />
      </Sider>
      <div style={{ width: "100%" }}>
        <div
          style={{
            height: "5%",
            padding: "4px",
            display: "flex",
            justifyContent: "space-between",
            background: "#eee",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
            }}
          >
            Welcome
          </div>
          <div style={{ fontSize: "12px" }}>
            <span style={{ paddingRight: "4px" }}>Username</span>
            <Image
              width={20}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              style={{ borderRadius: 30 }}
            />
          </div>
        </div>

        {currentPage === "user" && <UserPage />}
        {currentPage === "playlist" && <PlayListMusicPage />}
        {currentPage === "plan" && <PlanPage />}
        {currentPage === "audio" && <AudioPage />}
        {currentPage === "userdetail" && <UserInfoPage />}
        {currentPage === "subscription" && <SubscriptionPage />}
        {currentPage === "mentalhealth" && <MentalHealthPage />}
        {currentPage === null && null}
      </div>
    </Layout>
  );
}
export default HomePage;

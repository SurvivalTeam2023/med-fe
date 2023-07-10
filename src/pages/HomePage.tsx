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

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const fetchUsers = async () => {
    const res = await getUsersAPI();
    const data = res.data;
    return data;
  };
  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const { Sider } = Layout;

  const items: MenuItem[] = [
    getItem("DashBoard", "dashbord", <DesktopOutlined />),
    getItem("Manage", "sub1", <MailOutlined />, [
      getItem("User", "user"),
      getItem("Playlist", "playlist"),
      getItem("Plan", "plan"),
    ]),
  ];

  const { isSuccess, isError, error, data } = useQuery<User[], Error>(
    ["users"],
    async () => fetchUsers()
  );

  if (isSuccess) {
    toast.success("Success");
    toast.clearWaitingQueue();
  }

  if (isError) {
    toast.error(error?.message);
    toast.clearWaitingQueue();
  }

  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            border: "1px solid blue",
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
              border: "1px solid black",
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
        <div style={{ border: "1px solid black", width: "100%" }}>
          <div>Hello</div>

          {currentPage === "user" && <UserPage />}
          {currentPage === "playlist" && <PlayListMusicPage />}
          {currentPage === "plan" && <PlanPage />}
          {currentPage === null && null}
        </div>
      </Layout>
    </div>
  );
}
export default HomePage;

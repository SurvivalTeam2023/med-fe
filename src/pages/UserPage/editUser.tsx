import {
  Button,
  Descriptions,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Table,
  theme,
} from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { getUserDetailAPI } from "api/user";
import { UserData } from "core/interface/models";
import { useAppThunkDispatch } from "store";
import { editUserStatusThunk } from "store/thunk";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditUser() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const dispatch = useAppThunkDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const username = location.state;
  const fetchUser = async () => {
    const res = await getUserDetailAPI(username);
    const data = res.data;
    return data;
  };

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };

  const { Sider } = Layout;

  const navigate = useNavigate();

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
  console.log(data);
  const onPress = async (values: any) => {
    await toast.promise(
      dispatch(editUserStatusThunk(values["status"], username)),
      {
        pending: {
          render() {
            return "Loading...";
          },
        },
        success: {
          render() {
            return "Create successfully";
          },
        },
        error: {
          render({ data }) {
            return `${data}`;
          },
        },
      }
    );
  };
  console.log(onPress);

  const items: MenuProps["items"] = [
    {
      label: <a onClick={onPress}>Change user status</a>,
      key: "1",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="logo"
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          Med App
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={["user"]}
          items={[
            {
              key: "user",
              label: "User",
              onClick: onClick,
            },
            {
              key: "playlist",
              label: "Playlist",
              onClick: onClick,
            },
            {
              key: "plan",
              label: "Plan",
              onClick: onClick,
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginTop: "1%" }}>
        <Descriptions title="User Info" layout="vertical" bordered>
          <Descriptions.Item label="First Name">
            {data?.user_db.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <Button>{data?.user_db.status}</Button>
            </Dropdown>
          </Descriptions.Item>
        </Descriptions>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
export default EditUser;

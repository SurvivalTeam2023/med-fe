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
  Modal,
  Form,
  Input,
  Image,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Footer, Header } from "antd/es/layout/layout";
import { getUsersAPI } from "api/user";
import { Register, User } from "core/interface/models";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AntDesignOutlined } from "@ant-design/icons";
import { useUpdateUserApi } from "hooks/user.hook";

function UserPage() {
  const [form] = Form.useForm();
  const { mutate } = useUpdateUserApi();

  const handleUpdateUser = (
    firstname: string,
    lastname: string,
    email: string,
    city: string,
    address: string,
    dob: string,
    avatar: File
  ) => {
    mutate(
      {
        firstName: firstname,
        lastName: lastname,
        email: email,
        city: city,
        address: address,
        dob: dob,
        avatar: avatar,
      },
      {
        onSuccess: (data) => {
          console.log(data["data"]);
          toast.success("Success");
        },
        onError: (error) => {
          console.log("Update Failed", error);
        },
      }
    );
  };
  const onFinish = (values: Register) => {
    // Perform any necessary actions with the form values here
    const { firstName, lastName, email, city, address, dob, avatar } = values;
    if (values) {
      handleUpdateUser(firstName, lastName, email, city, address, dob, avatar);
    } else {
      console.log("Can not get input values");
      //   }
    }
  };

  const handleUpdateUserClick = () => {
    // Trigger the form submission manually
    form.submit();
  };
  const fetchUsers = async () => {
    const res = await getUsersAPI();
    const data = res.data;
    return data;
  };
  const navigate = useNavigate();
  const [modal2Open, setModal2Open] = useState(false);
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };
  const { Sider } = Layout;

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
      <Modal
        title="Edit profile"
        centered
        footer={false}
        bodyStyle={{ width: "100%", padding: "12px" }}
        open={modal2Open}
        width={"75%"}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <div style={{ padding: 8, background: "#eee" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 8,
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0px 52px",
              }}
            >
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                style={{ borderRadius: "100px" }}
              />
            </div>
            <div>
              <Form
                layout="vertical"
                name="basic"
                labelAlign="left"
                wrapperCol={{ span: 20 }}
                style={{ paddingTop: "20px" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div>
                    <Form.Item
                      label="Firstname"
                      name="firstname"
                      style={{ marginBottom: "8px" }}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Firstname"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Lastname"
                      name="lastname"
                      style={{ marginBottom: "8px" }}
                    >
                      <Input style={{ width: "100%" }} placeholder="Lastname" />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      style={{ marginBottom: "8px" }}
                    >
                      <Input style={{ width: "100%" }} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                      label="City"
                      name="city"
                      style={{ marginBottom: "8px" }}
                    >
                      <Input style={{ width: "100%" }} placeholder="City" />
                    </Form.Item>
                  </div>

                  <div style={{ paddingLeft: "16px" }}>
                    <Form.Item
                      label="Address"
                      name="address"
                      style={{ marginBottom: "8px" }}
                    >
                      <Input style={{ width: "100%" }} placeholder="Address" />
                    </Form.Item>
                    <Form.Item
                      label="Date of birth"
                      name="dob"
                      style={{ marginBottom: "8px" }}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Date of birth"
                      />
                    </Form.Item>

                    <Form.Item
                      label="image"
                      name="image"
                      style={{ marginBottom: "1px" }}
                    >
                      <Input.Password
                        style={{ width: "100%" }}
                        placeholder="image"
                      />
                    </Form.Item>
                  </div>
                </div>

                <Form.Item wrapperCol={{ offset: 10 }}>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: "20%",
                        background:
                          "linear-gradient(to bottom, rgba(255, 124, 0, 1), rgba(10, 10, 89, 1))",
                        color: "white",
                        borderRadius: 16,
                      }}
                      onClick={() => {
                        handleUpdateUserClick();
                      }}
                    >
                      Save info
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
      <Layout style={{ padding: 8, background: "#eee" }}>
        <div style={{ padding: 8, background: "#fff" }}>
          <div
            style={{
              padding: "12px 8px",
              background: "#EEEEEE",
              display: "flex",
              alignItems: "center",
              paddingLeft: 4,
              fontSize: 16,
              fontWeight: "500",
              justifyContent: "space-between",
            }}
          >
            <span>Manage User</span>
            <div>
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </div>
          </div>

          <Table
            style={{ margin: "8px 0" }}
            className="playlist-table"
            dataSource={data}
            bordered
            scroll={{ y: 240 }}
            pagination={{ defaultPageSize: 5, position: ["bottomCenter"] }}
            rowKey={(record) => record.id}
            columns={[
              {
                title: "Id",
                dataIndex: "id",
                key: "id",
                width: "10%",
              },
              {
                title: "Username",
                dataIndex: "username",
                key: "username",
                width: "10%",
              },
              {
                title: "First Name ",
                dataIndex: "firstName",
                key: "firstName",
                width: "10%",
              },
              {
                title: "Last Name",
                dataIndex: "lastName",
                key: "lastName",
                width: "10%",
              },
              {
                title: "email",
                dataIndex: "email",
                key: "email",
                width: "10%",
              },
              {
                title: "Action",
                key: "action",
                render: (text, record, index) => (
                  <Space size="middle">
                    <Button
                      type="primary"
                      onClick={() => {
                        navigate(`/user/${record.username}`, {
                          state: record.username,
                        });
                      }}
                    >
                      Detail
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        setModal2Open(true);
                      }}
                    >
                      Edit
                    </Button>
                  </Space>
                ),
                width: "10%",
              },
            ]}
          />
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </div>
      </Layout>
    </div>
  );
}
export default UserPage;

import { useQuery } from "react-query";
import { useState } from "react";
import {
  Table,
  Button,
  Layout,
  Space,
  Avatar,
  Modal,
  Form,
  Input,
  Image,
  UploadProps,
  message,
  Upload,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { getUsersAPI } from "api/user";
import { Register, User } from "core/interface/models";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateUserApi } from "hooks/user.hook";
import UserDetail from "./UserDetail";
import { useDispatch } from "react-redux";
import { store } from "store";
import { userActions } from "store/slice";
const { Header, Content, Footer } = Layout;
function UserPage() {
  const [form] = Form.useForm();
  const { mutate } = useUpdateUserApi();
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalUpdateUser, setModalUpdateUser] = useState(false);
  const [modalUserDetail, setModalUserDetail] = useState(false);
  const { isSuccess, isError, error, data } = useQuery<User[], Error>(
    ["users"],
    async () => fetchUsers()
  );
  const onFileChange = (file: any) => {
    setSelectedFile(file);
  };

  const handleUpdateUser = (
    firstname: string | undefined,
    lastname: string | undefined,
    email: string | undefined,
    city: string | undefined,
    address: string | undefined,
    dob: Date | undefined,
    avatar: File | undefined
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
        open={modalUpdateUser}
        width={"75%"}
        onOk={() => setModalUpdateUser(false)}
        onCancel={() => setModalUpdateUser(false)}
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
                      label="avatar"
                      name="image"
                      style={{ marginBottom: "1px" }}
                    >
                      <div>
                        <input
                          type="file"
                          onChange={() => {
                            onFileChange(selectedFile);
                          }}
                        />
                      </div>
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
      <Modal
        centered
        footer={false}
        bodyStyle={{ width: "100%" }}
        open={modalUserDetail}
        width={"80%"}
        onOk={() => setModalUserDetail(false)}
        onCancel={() => setModalUserDetail(false)}
        key={modalUserDetail ? "visible" : "hidden"}
      >
        <UserDetail />
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
          </div>

          <Table
            style={{ margin: "8px 0" }}
            className="playlist-table"
            dataSource={data}
            bordered
            scroll={{ y: 240 }}
            pagination={{ defaultPageSize: 5, position: ["bottomCenter"] }}
            rowKey={(record: any) => record.id}
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
                render: (text: any, record: any, index: any) => (
                  <Space size="middle">
                    <Button
                      type="primary"
                      onClick={() => {
                        dispatch(userActions.setUsername(record.username));
                        setModalUserDetail(true);
                      }}
                    >
                      Detail
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        setModalUpdateUser(true);
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
        </div>
      </Layout>
    </div>
  );
}
export default UserPage;

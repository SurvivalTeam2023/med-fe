import { Layout, Image, Descriptions, Form, Input, Button, Modal } from "antd";
import { getUserDetailAPI } from "api/user";
import { AsyncLocalStorage } from "async_hooks";
import { ACCOUNT_DETAIL } from "core/constants";
import { Register, User, UserData } from "core/interface/models";
import { useUpdateUserApi } from "hooks/user.hook";
import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { store } from "store";
import { getAuthKeyFromLocalStorage } from "../../util/localStorage";
import { parseTokenToUsername } from "util/user";

function UserInfoPage() {
  const token: any = getAuthKeyFromLocalStorage();
  const username = parseTokenToUsername(token);
  const [userDetail, setUserDetail] = useState<UserData>();
  const fetchUser = async () => {
    const res = await getUserDetailAPI(username);
    const data = res.data;
    setUserDetail(data);
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
  const [form] = Form.useForm();
  const { mutate } = useUpdateUserApi();
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleUpdateUserClick = () => {
    // Trigger the form submission manually
    form.submit();
  };
  const formData = new FormData();

  const onFileChange = (file: any) => {
    setSelectedFile(file);
    console.log(selectedFile);
  };
  const onFinish = (values: Register) => {
    const { firstName, lastName, email, city, address, dob, avatar } = values;
    if (firstName) {
      formData.append("firstName", firstName);
    }
    if (lastName) {
      formData.append("lastName", lastName);
    }
    if (email) {
      formData.append("email", email);
    }
    if (city) {
      formData.append("city", city);
    }
    if (address) {
      formData.append("address", address);
    }
    if (dob) {
      formData.append("dob", dob.toISOString());
    }
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }
    const formDataObject = Object.fromEntries(formData.entries());
    console.log("checker", formDataObject);
    handleUpdateUser(formData);
  };

  const handleUpdateUser = (formData: any) => {
    mutate(formData, {
      onSuccess: (data) => {
        toast.success("Success");
        setModal2Open(false);
      },
      onError: (error) => {
        console.log("Update Failed", error);
      },
    });
  };

  return (
    <div>
      <Modal
        title="Edit profile"
        centered
        footer={false}
        bodyStyle={{ width: "100%", padding: "12px" }}
        open={modal2Open}
        width={"75%"}
        afterClose={() => {
          fetchUser();
        }}
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
                preserve={false}
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
                      name="firstName"
                      style={{ marginBottom: "8px" }}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Firstname"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Lastname"
                      name="lastName"
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
                      label="Avatar"
                      name="avatar"
                      style={{ marginBottom: "1px" }}
                    >
                      <div>
                        <input
                          type="file"
                          onChange={(e: any) => {
                            const selectedFile = e.target.files?.[0];
                            if (selectedFile) {
                              onFileChange(selectedFile); // Pass the selected file to the onFileChange handler

                              // console.log("selected file", selectedFile); // Log the selected file
                              // onFileChange(formImageData);
                            }
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
      <Layout style={{ padding: 8, background: "#eee", marginTop: "12px" }}>
        <div style={{ padding: 8, background: "#fff" }}>
          <div
            style={{
              padding: "12px 8px",
              background: "#EEEEEE",
              display: "flex",
              alignItems: "center",
              paddingLeft: 4,
              fontSize: 14,
              fontWeight: "500",
              justifyContent: "center",
            }}
          >
            User Info
          </div>
          <div style={{ padding: 8, background: "#eee" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                padding: 4,
                background: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                  paddingLeft: "10px",
                }}
              >
                <Image
                  width={"100px"}
                  height={"100px"}
                  style={{ borderRadius: 20 }}
                  src={`${userDetail?.user_db?.avatar?.url}`}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Descriptions
                  extra={
                    <Button
                      type="primary"
                      onClick={() => {
                        setModal2Open(true);
                      }}
                    >
                      Edit
                    </Button>
                  }
                  style={{
                    paddingLeft: "10px",
                    display: "flex",
                    alignContent: "center",
                  }}
                  contentStyle={{
                    fontSize: "10px",
                    display: "flex",
                    alignContent: "center",
                  }}
                  labelStyle={{ fontSize: "12px" }}
                >
                  <Descriptions.Item label="Username">
                    {userDetail?.user_db.username}
                  </Descriptions.Item>
                  <Descriptions.Item label="Firstname">
                    {userDetail?.user_db.firstName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Lastname">
                    {userDetail?.user_db.lastName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {userDetail?.user_db.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="City">
                    {userDetail?.user_db.city}
                  </Descriptions.Item>
                  <Descriptions.Item label="Date or birth">
                    {moment(userDetail?.user_db.dob).format("DD-MM-YYYY")}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
export default UserInfoPage;

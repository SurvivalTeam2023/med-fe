import { Layout, Image, Descriptions, Form, Input, Button, Modal } from "antd";
import { Register } from "core/interface/models";
import { useUpdateUserApi } from "hooks/user.hook";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { store } from "store";

function UserInfoPage() {
  const userData: any = store.getState().admin.data;
  const [form] = Form.useForm();
  const { mutate } = useUpdateUserApi();
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleUpdateUserClick = () => {
    // Trigger the form submission manually
    form.submit();
  };
  const formData = new FormData();

  const onFinish = (values: Register) => {
    // Perform any necessary actions with the form values here
    console.log("values received", values);
    const { firstName, lastName, email, city, address, dob, avatar } = values;
    if (values) {
      handleUpdateUser(firstName, lastName, email, city, address, dob, avatar);
    } else {
      console.log("Can not get input values");
    }
  };

  const handleUpdateUser = (
    firstname: string | null,
    lastname: string | null,
    email: string | null,
    city: string | null,
    address: string | null,
    dob: Date | null,
    avatar: File | null
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
          console.log(data);
          console.log("Update Success");

          toast.success("Success");
        },
        onError: (error) => {
          console.log("Update Failed", error);
        },
      }
    );
  };
  useEffect(() => {}, [selectedFile]);

  const onFileChange = (file: any) => {
    setSelectedFile(file);
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
                src={`${userData.avatar.url}`}
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
                              const formData = new FormData(); // Create a new FormData instance
                              formData.append(
                                "myFile",
                                selectedFile,
                                selectedFile.name
                              ); // Append the selected file to the formData

                              console.log(formData); // Log the formData object
                              onFileChange(selectedFile); // Pass the selected file to the onFileChange handler

                              console.log("selected file", selectedFile); // Log the selected file
                            }
                            onFileChange(formData);

                            console.log("selected file", selectedFile);
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
              fontSize: 16,
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
                  src={`${userData.avatar.url}`}
                  style={{ borderRadius: "100px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid black",
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
                >
                  <Descriptions.Item label="UserName">
                    {userData.username}
                  </Descriptions.Item>
                  <Descriptions.Item label="Firstname">
                    {userData.firstName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Lastname">
                    {userData.lastName}
                  </Descriptions.Item>
                  <Descriptions.Item label="City">empty</Descriptions.Item>
                  <Descriptions.Item label="Date or birth">
                    {moment(userData.dob).format("DD-MM-YYYY")}
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

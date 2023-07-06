import styled from "@emotion/styled";
import { Link as MuiLink } from "@mui/material";

import React, { FunctionComponent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Input, Typography, Checkbox, Modal } from "antd";
import "./login.module.css";
import { FaGoogle } from "react-icons/fa";
import { useLoginApi } from "hooks/auth.hook";
import { LoginPayload } from "core/interface/models/auth";
import { PLAYLIST } from "core/constants";
import { useDispatch } from "react-redux";
import { userActions } from "store/slice";
import { adminAction } from "store/slice/auth.slice";
export const LinkItem = styled(Link)`
  text-decoration: none;
  color: #3683dc;
  &:hover {
    text-decoration: underline;
    color: #5ea1b6;
  }
`;
export const OauthMuiLink = styled(MuiLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6f7;
  border-radius: 1;
  padding: 0.6rem 0;
  column-gap: 1rem;
  text-decoration: none;
  color: #393e45;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
  }
`;

const { Title } = Typography;
const LoginPage: FunctionComponent = () => {
  const [currentForm, setCurrentForm] = useState(true);
  const navigate = useNavigate();
  const { mutate } = useLoginApi();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    // Trigger the form submission manually
    form.submit();
  };

  const handleSignInClick = () => {
    console.log(currentForm);

    setCurrentForm(true);
  };

  const handleSignUpClick = () => {
    setCurrentForm(false);
  };

  const onFinish = (values: LoginPayload) => {
    console.log("Received values:", values);
    // Perform any necessary actions with the form values here
    const { username, password } = values;
    handleLogin(username, password);
  };

  const handleLogin = (username: string, password: string) => {
    mutate(
      {
        username: username,
        password: password,
      },
      {
        onSuccess: (data) => {
          // const access_token =
          console.log("login Success", data["data"]);
          dispatch(adminAction.storeUser(data["data"]));
          navigate(PLAYLIST);
        },
        onError: (error) => {
          console.log("Login Failed", error);
        },
      }
    );
  };
  return (
    <div
      className="wrapper"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255, 124, 0, 1), rgba(41, 10, 89, 1))",
        height: "100vh",
      }}
    >
      <Modal
        className="loginContainer"
        open={true}
        footer={null}
        mask={false}
        style={{ alignItems: "center" }}
        closable={false}
        centered={true}
      >
        <div
          className="loginHeader"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Title
            level={2}
            style={{
              display: "flex",
              justifyContent: "center",
              background:
                "linear-gradient(to bottom, rgba(255, 124, 0, 1), rgba(40, 10, 89, 1))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Admin Page
          </Title>
        </div>
        <div className="loginBody">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
              }}
              onClick={() => {
                handleSignInClick();
              }}
            >
              Sign In
            </Button>
            <Button
              type="text"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
              }}
              onClick={() => {
                handleSignUpClick();
              }}
            >
              Sign Up
            </Button>
          </div>
          <div>
            {currentForm ? (
              <div>
                <Form
                  name="basic"
                  wrapperCol={{ span: 16 }}
                  style={{ paddingTop: "20px" }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: 5,
                    }}
                  >
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                      style={{ marginBottom: "10px" }}
                    >
                      <Input
                        style={{ width: "250px", borderRadius: 16 }}
                        placeholder="Username"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                      style={{ marginBottom: "1px" }}
                    >
                      <Input.Password
                        style={{ width: "250px", borderRadius: 16 }}
                        placeholder="Password"
                      />
                    </Form.Item>
                  </div>

                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 6 }}
                    style={{ marginBottom: "10px" }}
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 6 }}>
                    <div>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          width: "70%",
                          background:
                            "linear-gradient(to bottom, rgba(255, 124, 0, 1), rgba(10, 10, 89, 1))",
                          color: "white",
                        }}
                        onClick={handleButtonClick}
                      >
                        SIGN IN
                      </Button>
                    </div>
                  </Form.Item>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingBottom: 24,
                      marginTop: -25,
                      width: "100%",
                    }}
                  >
                    or sign in with
                    <FaGoogle
                      style={{ marginLeft: "5px", paddingTop: "2px" }}
                    />
                  </div>
                </Form>
                <div
                  className="loginFooter"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#aaa",
                    fontStyle: "italic",
                  }}
                >
                  Forgot Password?
                </div>
              </div>
            ) : (
              <Form
                name="basic"
                wrapperCol={{ span: 16 }}
                style={{ paddingTop: "20px" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 10,
                  }}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    style={{ marginBottom: "10px" }}
                  >
                    <Input
                      style={{ width: "250px", borderRadius: 16 }}
                      placeholder="Username"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                    style={{ marginBottom: "10px" }}
                  >
                    <Input
                      style={{ width: "250px", borderRadius: 16 }}
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    style={{ marginBottom: "10px" }}
                  >
                    <Input.Password
                      style={{ width: "250px", borderRadius: 16 }}
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item
                    name="Repassword"
                    rules={[
                      {
                        required: true,
                        message: "Please comfirm your password!",
                      },
                    ]}
                    style={{ marginBottom: "24px" }}
                  >
                    <Input.Password
                      style={{ width: "250px", borderRadius: 16 }}
                      placeholder="Confirm password"
                    />
                  </Form.Item>
                </div>

                <Form.Item wrapperCol={{ offset: 6 }}>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: "70%",
                        background:
                          "linear-gradient(to bottom, rgba(255, 124, 0, 1), rgba(10, 10, 89, 1))",
                        color: "white",
                        marginBottom: "10px",
                      }}
                      shape="round"
                    >
                      SIGN UP
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginPage;

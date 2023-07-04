import styled from "@emotion/styled";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  Link as MuiLink,
  OutlinedInput,
  TextField,
} from "@mui/material";

import { particles } from "core/constants/particles";
import { PLAYLIST } from "core/constants";
import { ILogin } from "core/interface/models";
import { useAppThunkDispatch } from "store";
import { thunkLogin } from "store/thunk";
import React, { FunctionComponent, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { Button, Form, Input, Typography, Checkbox, Modal } from "antd";
import "./login.module.css";

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
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
        style={{ alignItems: "center", marginTop: "200px", height: "800px" }}
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
            >
              Sign In
            </Button>
            <Button
              type="text"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
              }}
            >
              Sign Up
            </Button>
          </div>
          <div>
            <Form
              name="basic"
              wrapperCol={{ span: 16 }}
              style={{ paddingTop: "20px" }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
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
                    { required: true, message: "Please input your username!" },
                  ]}
                  style={{ marginBottom: "10px" }}
                >
                  <Input style={{ width: "250px" }} placeholder="Username" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  style={{ marginBottom: "1px" }}
                >
                  <Input.Password
                    style={{ width: "250px" }}
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
                      marginBottom: "10px",
                    }}
                  >
                    SIGN IN
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>

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
      </Modal>
    </div>
  );
};

export default LoginPage;

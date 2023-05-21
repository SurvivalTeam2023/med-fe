import styled from "@emotion/styled";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link as MuiLink,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { registerUserApi } from "api/auth";
import "assets/css/app.min.css";
import "assets/css/bootstrap.min.css";
import { ReactComponent as AuthBackGroundSvg } from "common/icon/auth-bg.svg";
import { ReactComponent as GoogleLogo } from "common/icon/google.svg";
import { ReactComponent as MicrosoftLogo } from "common/icon/microsoft.svg";
import { particles } from "core/constants/particles";
import { IRegister } from "core/interface/models";
import { useAppSelector, useAppThunkDispatch } from "store";
import { selectIsError } from "store/selector";
import React, { FunctionComponent, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

export const LinkItem = styled(Link)`
  text-decoration: none;
  color: #3683dc;
  &:hover {
    text-decoration: underline;
    color: #5ea1b6;
  }
`;

// 👇 Styled Material UI Link Component
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

const RegisterPage: FunctionComponent = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRePassword, setShowRePassword] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();
  const isLoginError = useAppSelector(selectIsError);
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownRePassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);

  const defaultValues: IRegister = {
    username: "",
    password: "",
    repassword: "",
    email: "",
  };

  const methods = useForm<IRegister>({
    defaultValues,
  });
  const mutation = useMutation({
    mutationFn: (payload: IRegister) => registerUserApi(payload),
  });
  const onSubmitHandler: SubmitHandler<IRegister> = async (
    values: IRegister
  ) => {
    try {
      setLoading(true);
      const result = await registerUserApi({
        username: values["username"],
        email: values["email"],
        password: values["password"],
        repassword: values["repassword"],
      });
      if (result) {
        await toast.success("Signup successful", {
          autoClose: 8000,
          toastId: 2,
        });
        setLoading(false);
        setTimeout(() => navigate("/auth/login"), 2000);
      }
    } catch (error: any) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-page-wrapper pt-5">
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particles}
          />
          <div className="shape">
            <AuthBackGroundSvg />
          </div>
        </div>

        <div className="auth-page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <a href="index.html" className="d-inline-block auth-logo">
                      <img
                        src="assets/images/logo-light.png"
                        alt=""
                        height="20"
                      />
                    </a>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">
                    Premium Admin & Dashboard Template
                  </p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card mt-4">
                  <div className="card-body p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Create New Account</h5>
                      <p className="text-muted">
                        Get your free MED account now
                      </p>
                    </div>
                    <div className="p-2 mt-4">
                      <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
                        <div className="mb-3">
                          {/* <label for="username" className="form-label">Username</label> */}
                          <TextField
                            label="User name"
                            placeholder="Username"
                            sx={{ width: "100%" }}
                            {...methods.register("username")}
                          />
                        </div>
                        <div className="mb-3">
                          {/* <label for="username" className="form-label">Username</label> */}
                          <TextField
                            label="Email"
                            placeholder="Email"
                            sx={{ width: "100%" }}
                            {...methods.register("email")}
                            type="email"
                          />
                        </div>

                        <div className="mb-3">
                          {/* <label className="form-label" for="password-input">
                            Password
                          </label> */}
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <FormControl
                              variant="outlined"
                              sx={{ width: "100%" }}
                            >
                              <InputLabel htmlFor="outlined-adornment-password">
                                Password
                              </InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                      size="small"
                                    >
                                      {showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                label="Password"
                                {...methods.register("password")}
                              />
                            </FormControl>
                          </div>
                        </div>
                        <div className="mb-3">
                          {/* <label className="form-label" for="password-input">
                            Password
                          </label> */}
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <FormControl
                              variant="outlined"
                              sx={{ width: "100%" }}
                            >
                              <InputLabel htmlFor="outlined-adornment-repassword">
                                Password
                              </InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-repassword"
                                type={showRePassword ? "text" : "password"}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowRePassword}
                                      onMouseDown={handleMouseDownRePassword}
                                      edge="end"
                                      size="small"
                                    >
                                      {showRePassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                size="small"
                                label="Password"
                                {...methods.register("repassword")}
                              />
                            </FormControl>
                          </div>
                        </div>

                        <div className="mt-4">
                          <LoadingButton
                            loading={loading}
                            loadingPosition="start"
                            variant="outlined"
                            sx={{
                              backgroundColor: "#13c56b",
                              color: "#fff",
                              border: "none",
                              "&:hover": {
                                color: "#fff",
                                backgroundColor: "#30DA85",
                                border: "none",
                              },
                            }}
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            Sign Up
                          </LoadingButton>
                        </div>

                        <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title">
                              Create account with
                            </h5>
                          </div>
                          <OauthMuiLink href="">
                            <GoogleLogo style={{ height: "2rem" }} />
                            Google
                          </OauthMuiLink>
                          <OauthMuiLink href="">
                            <MicrosoftLogo style={{ height: "2rem" }} />
                          </OauthMuiLink>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Already have an account ?{" "}
                    <Link
                      to="/auth/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      Signin
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer containerId={2} />
    </>
  );
};

export default RegisterPage;

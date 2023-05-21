import styled from "@emotion/styled";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Checkbox,
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
import { ReactComponent as AuthBackGroundSvg } from "common/icon/auth-bg.svg";
import { ReactComponent as GoogleLogo } from "common/icon/google.svg";
import { ReactComponent as MicrosoftLogo } from "common/icon/microsoft.svg";
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

const LoginPage: FunctionComponent = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const defaultValues: ILogin = {
    username: "",
    password: "",
  };

  const methods = useForm<ILogin>({
    defaultValues,
  });

  const onSubmitHandler: SubmitHandler<ILogin> = async (values: ILogin) => {
    await toast.promise(
      dispatch(thunkLogin(values.username, values.password)),
      {
        pending: {
          render() {
            return "Loading...";
          },
        },
        success: {
          render({ data }) {
            return "Login successfully";
          },
        },
        error: {
          render({ data }) {
            return `${data}`;
          },
        },
      }
    );
    setTimeout(() => {
      navigate(PLAYLIST);
    }, 1000);
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
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">Sign in to continue to MED.</p>
                    </div>
                    <div className="p-2 mt-4">
                      <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
                        <div className="mb-3">
                          <TextField
                            label="User name"
                            placeholder="Username"
                            sx={{ width: "100%" }}
                            {...methods.register("username")}
                          />
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <a
                              href="auth-pass-reset-basic.html"
                              className="text-muted"
                              style={{
                                position: "relative",
                                zIndex: 2,
                              }}
                            >
                              Forgot password?
                            </a>
                          </div>
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

                        <div className="form-check">
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Remember me"
                            />
                          </FormGroup>
                        </div>

                        <div className="mt-4">
                          <button
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            Sign In
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title">Sign In with</h5>
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
                    Don't have an account ?{" "}
                    <Link
                      to="/auth/signup"
                      className="fw-semibold text-primary text-decoration-underline"
                      replace
                    >
                      Signup
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} limit={1} />
    </>
  );
};

export default LoginPage;

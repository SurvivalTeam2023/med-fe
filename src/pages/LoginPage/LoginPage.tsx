import styled from "@emotion/styled";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, Link as MuiLink,
  OutlinedInput, TextField
} from "@mui/material";
import "assets/css/app.min.css";
import "assets/css/bootstrap.min.css";
import { ReactComponent as AuthBackGroundSvg } from "common/icon/auth-bg.svg";
import { ReactComponent as GoogleLogo } from "common/icon/google.svg";
import { ReactComponent as MicrosoftLogo } from "common/icon/microsoft.svg";
import { particles } from "constants/particles";
import { AppDispatch } from "core/store";
import { thunkLogin } from "core/store/thunk";
import React, { FunctionComponent, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";

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
type ILogin = {
  username: string;
  password: string;
};
const LoginPage: FunctionComponent = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch: AppDispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
    },
    []
  );
  const defaultValues: ILogin = {
    username: "",
    password: "",
  };

  const methods = useForm<ILogin>({
    defaultValues,
  });

  const onSubmitHandler: SubmitHandler<ILogin> = (values: ILogin) => {
    console.log("form", values);
    dispatch(thunkLogin(values.username, values.password));
  };

  return (
    <>
      <div className="auth-page-wrapper pt-5">
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>

          <div className="shape">
            <AuthBackGroundSvg />
          </div>
          <Particles
            options={particles}
            init={particlesInit}
            loaded={particlesLoaded}
          />
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
                          {/* <label for="username" className="form-label">Username</label> */}
                          <TextField
                            sx={{ width: "100%" }}
                            required
                            label="User name"
                            {...methods.register('username')}
                          />
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <a
                              href="auth-pass-reset-basic.html"
                              className="text-muted"
                            >
                              Forgot password?
                            </a>
                          </div>
                          {/* <label className="form-label" for="password-input">
                            Password
                          </label> */}
                          <div className="auth-pass-inputgroup mb-3">
                            <FormControl
                              sx={{ width: "100%" }}
                              variant="outlined"
                            >
                              <InputLabel htmlFor="password" size="small">
                                Password
                              </InputLabel>
                              <OutlinedInput
                                size="small"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
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
                                {...methods.register('password')}
                              />
                            </FormControl>
                          </div>
                        </div>

                        <div className="form-check">
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
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
                          <div>
                            <OauthMuiLink href="" sx={{ mb: 1 }}>
                              <GoogleLogo style={{ height: "2rem" }} />
                              Google
                            </OauthMuiLink>
                            <OauthMuiLink href="">
                              <MicrosoftLogo style={{ height: "2rem" }} />
                            </OauthMuiLink>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Don't have an account ?{" "}
                    <a
                      href="auth-signup-basic.html"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Signup{" "}
                    </a>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

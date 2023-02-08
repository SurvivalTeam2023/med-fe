import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ReactComponent as GoogleLogo } from "common/icon/google.svg";
import { ReactComponent as MicrosoftLogo } from "common/icon/microsoft.svg";
import { ReactComponent as AuthBackGroundSvg } from "common/icon/auth-bg.svg";
import styles from "./login.module.css";
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
  email: string;
  password: string;
};
const LoginPage1: FunctionComponent = () => {
  const defaultValues: ILogin = {
    email: "",
    password: "",
  };

  const methods = useForm<ILogin>({
    defaultValues,
  });

  const onSubmitHandler: SubmitHandler<ILogin> = (values: ILogin) => {
    console.log(values);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div className="bg-overlay"></div>

        <div className="shape">
          <AuthBackGroundSvg />
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid container>
          <Grid container justifyContent={"center"}>
            <Grid item columns={{ md: 8, lg: 6, xl: 5 }}>
              <Card>
                <CardContent>
                  <Typography>Welcome Back!</Typography>
                  <Typography>Sign in to continue to MED</Typography>
                  <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
                    <Box>
                      <TextField
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        autoFocus
                        className="form-control"
                      />
                    </Box>
                    <Box>
                      <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="email"
                        autoFocus
                        className="form-control"
                      />
                    </Box>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Remember me"
                      />
                    </FormGroup>
                    <Box>
                      <Button variant="contained" type="submit">
                        Sign in
                      </Button>
                    </Box>
                    <Box textAlign={"center"}>
                      <Box className="sigin-other-title">
                        <Typography variant="h5">Welcome Back!</Typography>
                      </Box>
                      <div>
                        <OauthMuiLink href="">
                          <GoogleLogo style={{ height: "2rem" }} />
                          Google
                        </OauthMuiLink>
                        <OauthMuiLink href="">
                          <MicrosoftLogo style={{ height: "2rem" }} />
                        </OauthMuiLink>
                      </div>
                    </Box>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default LoginPage1;

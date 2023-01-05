import { LoadingButton } from "@mui/lab";
import { Container, Grid, Typography, Box, Stack } from "@mui/material";
import FormInput from "components/LoginInput/LoginInput";
import { OauthMuiLink, LinkItem } from "pages/LoginPage/LoginPage";
import { FunctionComponent } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ReactComponent as GoogleLogo } from "common/icon/google.svg";
import { ReactComponent as MicrosoftLogo } from "common/icon/microsoft.svg";

type ISignUp = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
const RegisterPage: FunctionComponent = () => {
  const defaultValues: ISignUp = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const methods = useForm<ISignUp>({
    defaultValues,
  });

  const onSubmitHandler: SubmitHandler<ISignUp> = (values: ISignUp) => {
    console.log(JSON.stringify(values, null, 4));
  };

  return (
    <Container
      maxWidth={false}
      sx={{ height: "100vh", backgroundColor: { xs: "#fff", md: "#f4f4f4" } }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Grid
          item
          sx={{ maxWidth: "70rem", width: "100%", backgroundColor: "#fff" }}
        >
          <Grid
            container
            sx={{
              boxShadow: { sm: "0 0 5px #ddd" },
              py: "6rem",
              px: "1rem",
            }}
          >
            <FormProvider {...methods}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  mb: "1.5rem",
                  pb: { sm: "3rem" },
                }}
              >
                Welcome To MED
              </Typography>
              <Grid
                item
                container
                justifyContent="space-between"
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: "45rem" },
                  marginInline: "auto",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ borderRight: { sm: "1px solid #ddd" } }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ paddingRight: { sm: "3rem" } }}
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{ textAlign: "center", mb: "1.5rem" }}
                    >
                      Create new your account
                    </Typography>

                    <FormInput
                      label="Name"
                      type="text"
                      name="name"
                      focused
                      required
                    />
                    <FormInput
                      label="Enter your email"
                      type="email"
                      name="email"
                      focused
                      required
                    />
                    <FormInput
                      type="password"
                      label="Password"
                      name="password"
                      required
                      focused
                    />
                    <FormInput
                      type="password"
                      label="Confirm Password"
                      name="passwordConfirm"
                      required
                      focused
                    />

                    <LoadingButton
                      loading={false}
                      type="submit"
                      variant="contained"
                      sx={{
                        py: "0.8rem",
                        mt: 2,
                        width: "80%",
                        marginInline: "auto",
                      }}
                    >
                      Sign Up
                    </LoadingButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{}}>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{
                      paddingLeft: { sm: "3rem" },
                      mb: "1.5rem",
                      textAlign: "center",
                    }}
                  >
                    Sign up using another provider:
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="column"
                    sx={{ paddingLeft: { sm: "3rem" }, rowGap: "1rem" }}
                  >
                    <OauthMuiLink href="">
                      <GoogleLogo style={{ height: "2rem" }} />
                      Google
                    </OauthMuiLink>
                    <OauthMuiLink href="">
                      <MicrosoftLogo style={{ height: "2rem" }} />
                    </OauthMuiLink>
                  </Box>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Stack sx={{ mt: "3rem", textAlign: "center" }}>
                  <Typography sx={{ fontSize: "0.9rem", mb: "1rem" }}>
                    Already have an account?{" "}
                    <LinkItem to="/auth/login">Login</LinkItem>
                  </Typography>
                </Stack>
              </Grid>
            </FormProvider>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default RegisterPage;

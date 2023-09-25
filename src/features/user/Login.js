import { useState } from "react";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { loginApi } from "../../Axios/Apis/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slice/user";
import { fetchUserData } from "../../redux/action/auth";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../constants/routing";
import { LOCAL_STORAGE_KEY } from "../../constants/app";

function Login() {
  const dispatch = useDispatch();
  const INITIAL_LOGIN_OBJ = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const handleFetchUserData = (access_token) => {
    const userData = fetchUserData(access_token);
    if (userData) {
      setLoading(false);
      dispatch(userActions.setUser(userData));
      navigate(Routing.DASHBOARD);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.username.trim() === "")
      return setErrorMessage("Username is required! (use any value)");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Password is required! (use any value)");
    else {
      setLoading(true);
      loginApi(loginObj)
        .then((res) => {
          const { access_token } = res.data;
          localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, access_token);
          dispatch(userActions.setToken(access_token));
          handleFetchUserData(access_token);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              MED ADMIN
            </h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  //   type="username"
                  defaultValue={loginObj.username}
                  updateType="username"
                  containerStyle="mt-4"
                  labelTitle="Username"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>
              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

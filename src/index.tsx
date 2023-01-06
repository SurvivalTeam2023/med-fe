import ReactDOM from "react-dom/client";
import "./common/index.css";
import App from "./App";
import reportWebVitals from "./common/reportWebVitals";
import { ThemeProvider } from "@mui/material";
import theme from "config/MUI";
import { Provider } from "react-redux";
import { store } from "core/store";
// import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

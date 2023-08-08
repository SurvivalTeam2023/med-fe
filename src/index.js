import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { Provider } from "react-redux";
import SuspenseContent from "./containers/SuspenseContent";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<SuspenseContent />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
    <ReactQueryDevtoolsProduction initialIsOpen />
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

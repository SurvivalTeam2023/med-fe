import ReactDOM from "react-dom/client";
import "./common/index.css";
import App from "./App";
import reportWebVitals from "./common/reportWebVitals";
import { Provider } from "react-redux";
import { store } from "store";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);
reportWebVitals();

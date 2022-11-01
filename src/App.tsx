import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./common/App.css";
import HomePage from "./pages/HomePage";

const queryClient = new QueryClient();
const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);
function App() {
  const [showDevtools, setShowDevtools] = React.useState(false);
  React.useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
      <ReactQueryDevtoolsProduction initialIsOpen />
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
}

export default App;

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { FunctionComponent } from "react";

const Loading: FunctionComponent = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "black",
      opacity: 0.8,
    }}
  >
    <h2>Med</h2>
    <CircularProgress />
  </Box>
);

export default Loading;

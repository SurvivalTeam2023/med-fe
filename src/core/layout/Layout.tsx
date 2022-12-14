import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Grid, Box } from "@mui/material";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as ChartIcon } from "common/icon/chart-icon.svg";
import { DASHBOARD, PROJECT, RESOURCE, TIME_SHEET } from "core/constant";
import { ROLE_ADMIN } from "core/constant/role";
import { NavigationItem } from "core/interface/navigation";
import NavBar from "core/layout/NavBar";
import Sidebar from "core/layout/Sidebar";
const Layout = () => {
  const navigationItem: NavigationItem[] = useMemo(
    () => [
      {
        acceptRoles: [ROLE_ADMIN],
        icon: <ChartIcon />,
        text: "Dashboard",
        path: DASHBOARD,
      },
      {
        acceptRoles: [ROLE_ADMIN],
        icon: <AddCircleOutlineOutlinedIcon />,
        text: "Projects",
        path: PROJECT,
      },
      {
        acceptRoles: [ROLE_ADMIN],
        icon: <PersonAddOutlinedIcon />,
        text: "Resources",
        path: RESOURCE,
      },
      {
        acceptRoles: [ROLE_ADMIN],
        icon: <PendingActionsRoundedIcon />,
        text: "Timesheet",
        path: TIME_SHEET,
      },
    ],
    []
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <NavBar navigationItems={navigationItem} />

      <Grid container sx={{ overflow: "auto", flex: 1 }}>
        <Grid
          xs="auto"
          item
          sx={{
            borderRight: "1px solid #C1C1C1",
          }}
        >
          <Sidebar navigationItems={navigationItem} />
        </Grid>
        <Grid
          xs
          item
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;

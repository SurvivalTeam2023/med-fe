// eslint-disable-next-line
import { Box, Button, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { notFoundPageText } from "core/constant";
import { buttonText } from "core/constant/button";
import { useAppSelector } from "core/store";
import { selectUserStore } from "core/store/selector";
const NotFoundPage: FC = () => {
  const { user } = useAppSelector(selectUserStore);
  // const userRoles = useAppSelector(selectUserRoleNames);
  const navigate = useNavigate();
  const navigateCheck = useCallback(() => {
    if (!user?.id) return navigate("/auth/login");
  }, [navigate, user?.id]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      rowGap="32px"
    >
      <Typography sx={{ fontSize: 96 }}>{notFoundPageText[404]}</Typography>
      <Typography sx={{ fontSize: 32 }}>
        {notFoundPageText.NOT_FOUND}
      </Typography>
      <Typography sx={{ fontWeight: 600 }}>
        {notFoundPageText.DESCRIPTION}
      </Typography>
      <Button variant="outlined" onClick={navigateCheck}>
        {buttonText.GO_HOME}
      </Button>
    </Box>
  );
};

export default NotFoundPage;

import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Role } from "core/interface/role";

interface AuthWrapperProps {
  acceptRoles?: Role[];
}
const UnAuthGuard: FC<AuthWrapperProps> = ({ acceptRoles }) => {
  console.log("routing wihtou auth");
  return <Outlet />;
};
export default UnAuthGuard;

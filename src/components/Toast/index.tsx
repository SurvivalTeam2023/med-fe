import { FC } from "react";

interface Props {
  message: string;
}
const ToastError: FC<Props> = ({ message }) => <div>Sign up fail! <br />{message}</div>;

export default ToastError;

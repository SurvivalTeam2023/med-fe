import { CallAPI } from "../../AxiosBase";

export const getMentalHealthList = () => {
  const url = "/mentalHealth?status=ACTIVE";
  return CallAPI.get(url);
};

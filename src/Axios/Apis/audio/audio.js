import { CallAPI } from "../../AxiosBase";

export const getAudioList = () => {
  const url = "/audio?status=ACTIVE";
  return CallAPI.get(url);
};

import { CallAPI } from "../../AxiosBase";

export const getPlaylistList = () => {
  const url = "/playlist";
  return CallAPI.get(url);
};

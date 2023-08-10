import { CallAPI } from "../../AxiosBase";

export const getGenreList = () => {
  const url = "/genres";
  return CallAPI.get(url);
};

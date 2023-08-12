import { CallAPI } from "../../AxiosBase";

export const getDegreeList = () => {
  const url = "/mentalHealthDegree";
  return CallAPI.get(url);
};

import { CallAPI } from "../../AxiosBase";

export const getQuestionList = () => {
  const url = "/question";
  return CallAPI.get(url);
};

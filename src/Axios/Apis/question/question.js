import { CallAPI } from "../../AxiosBase";

export const getQuestionList = () => {
  const url = "/question";
  return CallAPI.get(url);
};

export const getQuestionListNextPage = (currentPage) => {
  const url = `/question?page=${currentPage}`;
  return CallAPI.get(url);
};

import { CallAPI, CallDeleteAPI } from "../../AxiosBase";

export const getOptionsAPI = (currentPage) => {
  const url = `option?page=${currentPage}`;
  return CallAPI.get(url);
};

export const getOptionsByQuestionIdAPI = (selectedQuestionId) => {
  const url = `option?status=ACTIVE&questionId=${selectedQuestionId}`;
  return CallAPI.get(url);
};

export const createOptionAPI = (payload) => {
  const url = "/option";
  const { option, status, points, questionId } = payload;
  return CallAPI.post(url, {
    option,
    status,
    points,
    questionId,
  });
};

export const deleteOptionAPI = (selectedOptionId) => {
  const url = `/option/${selectedOptionId}`;
  return CallDeleteAPI.delete(url);
};

export const updateOptionAPI = (selectedOptionId, payload) => {
  const url = `/option/${selectedOptionId}`;
  const { option, status, point } = payload;
  return CallAPI.put(url, {
    option,
    status,
    point,
  });
};

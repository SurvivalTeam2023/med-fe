import { CallAPI, CallDeleteAPI } from "../../AxiosBase";

export const getQuestionList = () => {
  const url = "/question";
  return CallAPI.get(url);
};

export const getQuestionListNextPage = (currentPage) => {
  const url = `/question?page=${currentPage}`;
  return CallAPI.get(url);
};

export const getAgeListAPI = () => {
  const url = "/age";
  return CallAPI.get(url);
};

export const createQuestionAPI = (payload) => {
  const url = "/question";
  const { question, status, mentalHealthId, ageId } = payload;
  return CallAPI.post(url, {
    question,
    status,
    mentalHealthId,
    ageId,
  });
};

export const deleteQuestionAPI = (selectedQuestionId) => {
  const url = `/question/${selectedQuestionId}`;
  return CallDeleteAPI.delete(url);
};

export const updateQuestionAPI = (selectedQuestionId, payload) => {
  const url = `/question/${selectedQuestionId}`;
  const { question, status } = payload;
  return CallAPI.put(url, {
    question,
    status,
  });
};

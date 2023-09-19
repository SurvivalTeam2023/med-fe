import { CallAPI, CallDeleteAPI } from "../../AxiosBase";

export const getExercisesAPI = (currentPage) => {
  const url = "/exercise";
  return CallAPI.get(url);
};

export const createExerciseAPI = (payload) => {
  const url = "/exercise";
  const { name, content } = payload;
  return CallAPI.post(url, {
    name,
    content,
  });
};

export const getExercisesByIdAPI = (selectedExerciseId) => {
  const url = `/exercise/${selectedExerciseId}`;
  return CallAPI.get(url);
};

export const deleteExerciseAPI = (selectedExerciseId) => {
  const url = `/exercise/${selectedExerciseId}`;
  return CallDeleteAPI.delete(url);
};

export const updateExerciseAPI = (id, payload) => {
  const url = `/exercise/${id}`;
  const { name, content, status } = payload;
  return CallAPI.put(url, {
    name,
    content,
    status,
  });
};

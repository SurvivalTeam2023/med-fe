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

export const deleteExerciseAPI = (selectedExerciseId) => {
  const url = `/exercise/${selectedExerciseId}`;
  return CallDeleteAPI.delete(url);
};

export const updateExerciseAPI = (selectedExerciseId, payload) => {
  const url = `/exercise/${selectedExerciseId}`;
  const { name, content } = payload;
  return CallAPI.put(url, {
    name,
    content,
  });
};

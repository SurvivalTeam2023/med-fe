import { CallAPI, CallDeleteAPI } from "../../AxiosBase";

export const getDegreeList = () => {
  const url = "/mentalHealthDegree";
  return CallAPI.get(url);
};

export const createDegreeAPI = (payload) => {
  const url = "/mentalHealthDegree";
  const { mentalHealthId, title, description, status, pointStart, pointEnd } =
    payload;
  return CallAPI.post(url, {
    mentalHealthId,
    title,
    description,
    status,
    pointStart,
    pointEnd,
  });
};

export const deleteDegreeAPI = (selectedDegreeId) => {
  const url = `/mentalHealthDegree/${selectedDegreeId}`;
  return CallDeleteAPI.delete(url);
};

export const updateDegreeAPI = (selectedDegreeId, payload) => {
  const url = `/mentalHealthDegree/${selectedDegreeId}`;
  const { title, status, pointStart, pointEnd } = payload;
  return CallAPI.put(url, {
    title,
    status,
    pointStart,
    pointEnd,
  });
};

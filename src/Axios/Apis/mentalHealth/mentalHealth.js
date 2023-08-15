import { CallAPI, CallDeleteAPI } from "../../AxiosBase";

export const getMentalHealthList = () => {
  const url = "/mentalHealth";
  return CallAPI.get(url);
};

export const createMentalHealthAPI = (payload) => {
  const url = "/mentalHealth";
  const { name, description, status } = payload;
  return CallAPI.post(url, {
    name,
    description,
    status,
  });
};

export const updateMentalHealthAPI = (selectedMentalId, payload) => {
  const url = `/mentalHealth/${selectedMentalId}`;
  const { name, status } = payload;
  return CallAPI.put(url, {
    name,
    status,
  });
};

export const deleteMentalHealthAPI = (selectedMentalId) => {
  const url = `/mentalHealth/${selectedMentalId}`;
  return CallDeleteAPI.delete(url);
};

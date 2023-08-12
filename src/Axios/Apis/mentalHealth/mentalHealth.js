import { CallAPI } from "../../AxiosBase";

export const getMentalHealthList = () => {
  const url = "/mentalHealth?status=ACTIVE";
  return CallAPI.get(url);
};
export const createMentalHealthAPI = (payload) => {
  const url = "/mentalHealth";
  const { name, status } = payload;
  return CallAPI.post(url, {
    name,
    status,
  });
};
export const updateMentalHealthAPI = (payload, mentalId) => {
  const url = "/mentalHealth/" + `${mentalId}`;
  const { name, status } = payload;
  return CallAPI.put(url, {
    name,
    status,
  });
};

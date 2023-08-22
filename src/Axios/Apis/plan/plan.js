import { CallAPI, CallDeleteAPI } from "../../AxiosBase";

export const getPlanList = () => {
  const url = "/plans";
  return CallAPI.get(url);
};

export const createPlanAPI = (payload) => {
  const url = "/plans";
  const { name, desc, usageTime, cost } = payload;
  return CallAPI.post(url, {
    name,
    desc,
    usageTime,
    cost,
  });
};

export const deletePlanAPI = (selectedPlanId) => {
  const url = `/plans/${selectedPlanId}`;
  return CallDeleteAPI.delete(url);
};

export const updatePlanAPI = (selectedPlanId, payload) => {
  const url = `/plans/${selectedPlanId}`;
  const { name, desc, usageTime, cost } = payload;
  return CallAPI.put(url, {
    name,
    desc,
    usageTime,
    cost,
  });
};

import { CallAPI, CallAPIMulti } from "core/axiosCore";
import { ApiResponse } from "core/interface/api";
import {
  MentalHealthData,
  newMentalHealth,
} from "core/interface/models/mentalHeath";

export const getMentalHeathAPI = (
  page: number
): ApiResponse<MentalHealthData> => {
  const url = `/mentalHealth?status=ACTIVE`;
  return CallAPI.get(url);
};

export const createMentalHealthAPI = (
  form: any
): ApiResponse<newMentalHealth> => {
  const url = "/mentalHealth";

  return CallAPI.post(url, form);
};

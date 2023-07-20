import { CallAPI, CallAPIMulti } from "core/axiosCore";
import { ApiResponse } from "core/interface/api";
import { AudiosData, newAudio } from "core/interface/models/audio";

export const getAudioAPi = (page: number): ApiResponse<AudiosData> => {
  const url = `/audio?status=ACTIVE`;
  return CallAPI.get(url);
};

export const createAudioAPi = (form: any): ApiResponse<newAudio> => {
  const url = "/audio";

  return CallAPIMulti.post(url, form);
};

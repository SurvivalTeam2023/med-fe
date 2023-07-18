import { CallAPI } from "core/axiosCore";
import { ApiResponse } from "core/interface/api";
import { AudiosData } from "core/interface/models/audio";

export const getAudioAPi = (page: number): ApiResponse<AudiosData> => {
  const url = `/audio?status=ACTIVE`;
  return CallAPI.get(url);
};

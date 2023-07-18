import { CallAPI } from "core/axiosCore";
import { ApiResponse } from "core/interface/api";
import { Genre } from "core/interface/models/genre";

export const getGenreAPI = (): ApiResponse<Genre> => {
  const url = `/genres`;
  return CallAPI.get(url);
};

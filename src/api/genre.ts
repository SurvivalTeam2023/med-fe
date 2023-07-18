import { CallAPI } from "core/axiosCore";
import { ApiResponse } from "core/interface/api";
import { GenreData } from "core/interface/models/genre";

export const getGenreAPI = (page: number): ApiResponse<GenreData> => {
  const url = `/genres`;
  return CallAPI.get(url);
};

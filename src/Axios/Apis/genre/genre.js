import { CallAPI } from "../../AxiosBase";

export const getGenreList = () => {
  const url = "/genres";
  return CallAPI.get(url);
};

export const createGenreAPI = (payload) => {
  const url = "/genres";
  const { name, desc, image, status, emotion } = payload;
  return CallAPI.post(url, {
    name,
    desc,
    image,
    status,
    emotion,
  });
};

export const updateGenreAPI = (selectedGenreId, payload) => {
  const url = `/genres/${selectedGenreId}`;
  const { name, desc, image, status, emotion } = payload;
  return CallAPI.put(url, {
    name,
    desc,
    image,
    status,
    emotion,
  });
};

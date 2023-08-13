import { CallAPI } from "../../AxiosBase";

export const getPlaylistList = () => {
  const url = "/playlist";
  return CallAPI.get(url);
};

export const createPlaylistAPI = (payload) => {
  const url = "/playlist";
  const { name, description, imageUrl, playlistType, isPublic } = payload;
  return CallAPI.post(url, {
    name,
    description,
    imageUrl,
    playlistType,
    isPublic,
  });
};

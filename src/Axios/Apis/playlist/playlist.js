import { CallAPI, CallDeleteAPI } from "../../AxiosBase";

export const getPlaylistList = (currentPage) => {
  const url = `/playlist?page=${currentPage}`;
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

export const updatePlaylistAPI = (selectedPlaylistId, payload) => {
  const url = `/playlist/${selectedPlaylistId}`;
  const { name, image_url, status, description } = payload;
  return CallAPI.put(url, {
    name,
    image_url,
    status,
    description,
  });
};

export const deletePlaylistAPI = (selectedPlaylistId) => {
  const url = `/playlist/${selectedPlaylistId}`;
  return CallDeleteAPI.delete(url);
};

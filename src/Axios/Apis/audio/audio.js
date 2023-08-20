import { CallAPI, CallDeleteAPI } from "../../AxiosBase";

export const getTotalAudio = () => {
  const url = `/audio/count/totalAudio`;
  return CallAPI.get(url);
};
export const getAudioList = () => {
  const url = "/audio?status=ACTIVE";
  return CallAPI.get(url);
};

export const getTop10Listened = () => {
  const url = "/history/top10";
  return CallAPI.get(url);
};

export const getNextAudioList = (currentPage) => {
  const url = `/audio?page=${currentPage}`;
  return CallAPI.get(url);
};

export const createAudioAPI = (payload) => {
  const url = "/audio";
  const { name, playlistId, genreId, audioFileId, imageFileId } = payload;
  return CallAPI.post(url, {
    name,
    playlistId,
    genreId,
    audioFileId,
    imageFileId,
  });
};

export const deleteAudioAPI = (selectedAudioId) => {
  const url = `/audio/${selectedAudioId}`;
  return CallDeleteAPI.delete(url);
};

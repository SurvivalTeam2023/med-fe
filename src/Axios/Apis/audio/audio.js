import { CallAPI } from "../../AxiosBase"

export const getTotalAudio = () => {
  const url = `/audio/count/totalAudio`
  return CallAPI.get(url)
}
export const getAudioList = () => {
  const url = "/audio?status=ACTIVE";
  return CallAPI.get(url);
};

export const getTop10Listened = () => {
  const url = "/history/top10"
  return CallAPI.get(url)
}

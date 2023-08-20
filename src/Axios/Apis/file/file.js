import { CallAPIMulti } from "../../AxiosBase";

export const uploadImageFileAPI = (selectedFile) => {
  const url = "/files/audio";
  return CallAPIMulti.post(url, selectedFile);
};

import { useMutation } from "@tanstack/react-query";
import { uploadImageFileAPI } from "../Axios/Apis/file/file";

export const useUploadImageFile = () =>
  useMutation({
    mutationFn: uploadImageFileAPI,
    onSuccess: (data) => {
      console.log("success", data);
    },
  });

import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import InputFile from "../../../components/Input/InputFile";
import { useUploadImageFile } from "../../../hooks/file.hook";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGenreList } from "../../../Axios/Apis/genre/genre";
import InputMultipleSelect from "../../../components/Input/InputMultipleSelect";
import { useCreateAudio } from "../../../hooks/audio.hook";

const INITIAL_LEAD_OBJ = {
  name: "",
  audioFile: null,
  imageFile: null,
  genreId: [],
  playlistId: [],
};

function AddAudioModalBody({ closeModal }) {
  const { data: genre } = useQuery({
    queryKey: ["genre"],
    queryFn: async () => {
      try {
        const result = await getGenreList();
        return result;
      } catch (error) {
        throw new Error(`Error fetching audio: ${error.message}`);
      }
    },
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [fileChecked, setFileChecked] = useState(false);
  const [idImageUploaded, setIdImageUploaded] = useState();
  const [idAudioUploaded, setIdAudioUploaded] = useState();
  const { mutate, data, isSuccess } = useUploadImageFile();
  const { mutate: mutatee } = useCreateAudio();
  const fileImageUpload = leadObj.imageFile;
  const fileAudioUpload = leadObj.audioFile;
  const dataAudioFileId = data?.data?.audioFile?.id;
  const dataImageFileId = data?.data?.imageFile?.id;

  const genreData = genre?.data;

  const handleImageFileChange = async () => {
    const formData = new FormData();

    formData.append("audio", fileAudioUpload);
    formData.append("image", fileImageUpload);

    await mutate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showNotification({ message: "New Audio file saved!", status: 1 })
      );

      setIdAudioUploaded(dataAudioFileId);

      setIdImageUploaded(dataImageFileId);

      setFileChecked(true);
    }
  }, [isSuccess]);

  let mappedOptions = [];

  if (genreData) {
    mappedOptions = genreData.map((options) => ({
      value: options.id,
      label: options.name,
    }));
  }

  const saveNewLead = async () => {
    if (leadObj.name.trim() === "") {
      return setErrorMessage("Name is required!");
    } else if (!isSuccess) {
      return setErrorMessage("Error uploading files!");
    } else {
      try {
        const payload = {
          name: leadObj.name,
          playlistId: leadObj.playlistId,
          genreId: leadObj.genreId,
          audioFileId: idAudioUploaded,
          imageFileId: idImageUploaded,
        };

        await mutatee(payload);
        dispatch(showNotification({ message: "New Audio Added!", status: 1 }));
        closeModal();
      } catch (error) {
        console.error("Error adding new Audio:", error);
        setErrorMessage("Error adding new Audio. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj((prevLeadObj) => ({
      ...prevLeadObj,
      [updateType]: value,
    }));
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={leadObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />

      <InputFile
        updateType="audioFile"
        containerStyle="mt-4"
        labelTitle="Upload Audio File"
        updateFormValue={updateFormValue}
      />

      <InputFile
        updateType="imageFile"
        containerStyle="mt-4"
        labelTitle="Upload Image File"
        updateFormValue={updateFormValue}
      />

      <InputMultipleSelect
        options={mappedOptions}
        defaultValue={leadObj.genreId}
        updateType="genreId"
        containerStyle="mt-4"
        labelTitle="Genre"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary px-6"
          onClick={() => {
            handleImageFileChange();
          }}
        >
          Upload file
        </button>
        <button
          className="btn btn-primary px-6"
          disabled={!fileChecked}
          onClick={() => {
            saveNewLead();
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddAudioModalBody;

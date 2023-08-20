import { useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useAddAudioToPlaylist } from "../../../hooks/audioPlaylist.hook";
import InputNumber from "../../../components/Input/InputNumber";

const INITIAL_LEAD_OBJ = {
  audioId: 1,
};

function AddPlaylistToAudioModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { mutate } = useAddAudioToPlaylist();
  const selectedPlaylistId = extraObject.selectedPlaylistId;

  const saveNewLead = async () => {
    try {
      const payload = {
        audioId: leadObj.audioId,
        playlistId: selectedPlaylistId,
      };

      await mutate(payload);
      dispatch(
        showNotification({
          message: "New Audio Added into Playlist!",
          status: 1,
        })
      );
      closeModal();
    } catch (error) {
      console.error("Error adding new Audio into Playlist:", error);
      setErrorMessage(
        "Error adding new Audio into Playlist. Please try again."
      );
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
      <InputNumber
        type="number"
        defaultValue={leadObj.audioId}
        updateType="audioId"
        containerStyle="mt-4"
        labelTitle="Audio Id"
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
            saveNewLead();
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddPlaylistToAudioModalBody;

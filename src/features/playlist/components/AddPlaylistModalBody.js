import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useCreateGenre } from "../../../hooks/genre.hook";
import InputSelect from "../../../components/Input/InputSelect";
import { useCreatePlaylist } from "../../../hooks/playlist.hook";

const INITIAL_LEAD_OBJ = {
  name: "",
  description: "",
  imageUrl: "",
  playlistType: "ALBUM",
  isPublic: "PUBLIC",
};

const playlistTypeOptions = [
  { value: "ALBUM", label: "ALBUM" },
  { value: "PLAYLIST", label: "PLAYLIST" },
];

const isPublicOptions = [
  { value: "PUBLIC", label: "PUBLIC" },
  { value: "PRIVATE", label: "PRIVATE" },
];

function AddPlaylistModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { mutate } = useCreatePlaylist();

  const saveNewLead = async () => {
    if (leadObj?.name?.trim() === "") {
      return setErrorMessage("Name is required!");
    } else if (leadObj?.imageUrl?.trim() === "") {
      return setErrorMessage("Image URL is required!");
    } else if (leadObj?.description?.trim() === "") {
      return setErrorMessage("Description is required!");
    } else {
      try {
        const payload = {
          name: leadObj.name,
          imageUrl: leadObj.imageUrl,
          description: leadObj.description,
          playlistType: leadObj.playlistType,
          isPublic: leadObj.isPublic,
        };
        await mutate(payload);

        dispatch(
          showNotification({ message: "New Playlist added!", status: 1 })
        );
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error adding new Playlist:", error);
        setErrorMessage("Error adding new Playlist. Please try again.");
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
        labelTitle="Playlist Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.description}
        updateType="description"
        containerStyle="mt-4"
        labelTitle="Description"
        updateFormValue={updateFormValue}
      />

      <InputSelect
        options={playlistTypeOptions}
        defaultValue={leadObj.playlistType}
        updateType="playlistType"
        containerStyle="mt-4"
        labelTitle="Playlist Type"
        updateFormValue={updateFormValue}
      />

      <InputSelect
        options={isPublicOptions}
        defaultValue={leadObj.isPublic}
        updateType="isPublic"
        containerStyle="mt-4"
        labelTitle="Accessability"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.imageUrl}
        updateType="imageUrl"
        containerStyle="mt-4"
        labelTitle="Image URL"
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

export default AddPlaylistModalBody;

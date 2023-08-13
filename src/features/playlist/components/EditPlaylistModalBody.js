import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import InputSelect from "../../../components/Input/InputSelect";
import {
  useCreatePlaylist,
  useUpdatePlaylist,
} from "../../../hooks/playlist.hook";

const statusOptions = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "INACTIVE", label: "INACTIVE" },
];

function EditPlaylistModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate } = useUpdatePlaylist();

  const INITIAL_LEAD_OBJ = {
    name: extraObject.name,
    description: extraObject.description,
    imageUrl: extraObject.imageUrl,
    status: extraObject.status,
  };

  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const selectedPlaylistId = extraObject.selectedPlaylistId;
  console.log("selectedPlaylistId", selectedPlaylistId);

  const saveNewLead = async () => {
    if (!leadObj?.name?.trim()) {
      return setErrorMessage("Name is required!");
    } else if (!leadObj?.description?.trim()) {
      return setErrorMessage("Description is required!");
    } else {
      try {
        const payload = {
          name: leadObj.name,
          image_url: leadObj.imageUrl,
          status: leadObj.status,
          description: leadObj.description,
        };

        console.log("payload:", payload);

        await mutate({ selectedPlaylistId, payload });

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

      <InputText
        type="text"
        defaultValue={leadObj.imageUrl}
        updateType="imageUrl"
        containerStyle="mt-4"
        labelTitle="Image URL"
        updateFormValue={updateFormValue}
      />

      <InputSelect
        options={statusOptions}
        defaultValue={leadObj.status}
        updateType="status"
        containerStyle="mt-4"
        labelTitle="Status"
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

export default EditPlaylistModalBody;

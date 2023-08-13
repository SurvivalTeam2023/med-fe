import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useUpdateGenre } from "../../../hooks/genre.hook";
import InputSelect from "../../../components/Input/InputSelect";

const options = [
  { value: "HAPPY", label: "HAPPY" },
  { value: "SAD", label: "SAD" },
  { value: "DISGUSTED", label: "DISGUSTED" },
  { value: "CALM", label: "CALM" },
  { value: "ANGRY", label: "ANGRY" },
  { value: "CONFUSED", label: "CONFUSED" },
];

const statusOptions = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "INACTIVE", label: "INACTIVE" },
];

function EditGenreModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate } = useUpdateGenre();
  const selectedGenreId = extraObject.selectedGenreId;
  const INITIAL_LEAD_OBJ = {
    name: extraObject.name,
    desc: extraObject.desc,
    image: extraObject.image,
    status: extraObject.status,
    emotion: extraObject.emotion,
  };

  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    try {
      const payload = {
        name: leadObj.name,
        desc: leadObj.desc,
        image: leadObj.image,
        status: leadObj.status,
        emotion: leadObj.emotion,
      };
      await mutate({ selectedGenreId, payload });
      dispatch(
        showNotification({ message: "Edited Genre Successfully!", status: 1 })
      );
      closeModal();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error adding edit Genre:", error);
      setErrorMessage("Error adding edit Genre. Please try again.");
    } finally {
      setLoading(false);
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
        labelTitle="Genre Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.desc}
        updateType="desc"
        containerStyle="mt-4"
        labelTitle="Description"
        updateFormValue={updateFormValue}
      />

      <InputSelect
        options={options}
        defaultValue={leadObj.emotion}
        updateType="emotion"
        containerStyle="mt-4"
        labelTitle="Emotion"
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

      <InputText
        type="text"
        defaultValue={leadObj.image}
        updateType="image"
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

export default EditGenreModalBody;

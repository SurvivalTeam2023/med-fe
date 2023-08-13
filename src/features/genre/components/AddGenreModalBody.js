import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useCreateGenre } from "../../../hooks/genre.hook";
import InputSelect from "../../../components/Input/InputSelect";

const INITIAL_LEAD_OBJ = {
  name: "",
  desc: "",
  image: "",
  status: "ACTIVE",
  emotion: "HAPPY",
};
const options = [
  { value: "HAPPY", label: "HAPPY" },
  { value: "SAD", label: "SAD" },
  { value: "DISGUSTED", label: "DISGUSTED" },
  { value: "CALM", label: "CALM" },
  { value: "ANGRY", label: "ANGRY" },
  { value: "CONFUSED", label: "CONFUSED" },
];

function AddGenreModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { mutate } = useCreateGenre();

  const saveNewLead = async () => {
    if (leadObj.emotion.trim() === "") {
      return setErrorMessage("Username is required!");
    } else if (leadObj.name.trim() === "") {
      return setErrorMessage("Name is required!");
    } else if (leadObj.desc.trim() === "") {
      return setErrorMessage("Description is required!");
    } else {
      try {
        const payload = {
          name: leadObj.name,
          desc: leadObj.desc,
          image: leadObj.image,
          status: leadObj.status,
          emotion: leadObj.emotion,
        };
        await mutate(payload);
        dispatch(showNotification({ message: "New Genre added!", status: 1 }));
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error adding new Genre:", error);
        setErrorMessage("Error adding new Genre. Please try again.");
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

export default AddGenreModalBody;

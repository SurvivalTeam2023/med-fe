import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useCreateExercise } from "../../../hooks/exercise.hook";

const INITIAL_LEAD_OBJ = {
  name: "",
  content: "",
};

function AddExercisesModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { mutate } = useCreateExercise();

  const saveNewLead = async () => {
    if (leadObj?.option?.trim() === "") {
      return setErrorMessage("Exercise is required!");
    } else {
      try {
        const payload = {
          name: leadObj.name,
          content: leadObj.content,
        };
        await mutate(payload);

        dispatch(
          showNotification({ message: "New Exercise added!", status: 1 })
        );
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error adding new Exercise:", error);
        setErrorMessage("Error adding new Exercise. Please try again.");
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

      <InputText
        type="text"
        defaultValue={leadObj.content}
        updateType="content"
        containerStyle="mt-4"
        labelTitle="Content"
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

export default AddExercisesModalBody;

import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import InputSelect from "../../../components/Input/InputSelect";
import { useUpdateExercise } from "../../../hooks/exercise.hook";

const statusOptions = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "INACTIVE", label: "INACTIVE" },
];

function EditMentalHealthModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate } = useUpdateExercise();
  const selectedExerciseId = extraObject.selectedExerciseId;
  const INITIAL_LEAD_OBJ = {
    name: extraObject.name,
    status: extraObject.status,
  };

  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    try {
      const payload = {
        name: leadObj.name,
        status: leadObj.status,
      };

      await mutate({ selectedExerciseId, payload });
      dispatch(
        showNotification({
          message: "Edited Mental Health Successfully!",
          status: 1,
        })
      );
      closeModal();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error adding edit Mental Health:", error);
      setErrorMessage("Error adding edit Mental Health. Please try again.");
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
        labelTitle="Mental Health Problem"
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

export default EditMentalHealthModalBody;

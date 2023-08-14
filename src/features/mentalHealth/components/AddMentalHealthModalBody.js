import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useCreateMentalHealth } from "../../../hooks/mentalHealth.hook";

const INITIAL_LEAD_OBJ = {
  name: "",
  description: "",
  status: "ACTIVE",
};

function AddMentalHealthModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { mutate } = useCreateMentalHealth();

  const saveNewLead = async () => {
    if (leadObj.name.trim() === "") {
      return setErrorMessage("Name is required!");
    } else if (leadObj.description.trim() === "") {
      return setErrorMessage("Description is required!");
    } else {
      try {
        const payload = {
          name: leadObj.name,
          description: leadObj.description,
          status: leadObj.status,
        };

        await mutate(payload);
        dispatch(
          showNotification({ message: "New Mental Health Added!", status: 1 })
        );
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error adding new Mental Health:", error);
        setErrorMessage("Error adding new Mental Health. Please try again.");
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
        defaultValue={leadObj.description}
        updateType="description"
        containerStyle="mt-4"
        labelTitle="Description"
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

export default AddMentalHealthModalBody;

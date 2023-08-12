import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import InputSelect from "../../../components/Input/InputSelect";
import { showNotification } from "../../common/headerSlice";
import { useUpdateMentalHealthApi } from "../../../hooks/mental.hook";

const INITIAL_LEAD_OBJ = {
  name: "",
  status: "ACTIVE",
};

function UpdateMentalModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { mutate } = useUpdateMentalHealthApi(extraObject.id);
  const saveNewLead = async () => {
    if (leadObj.name.trim() === "") {
      return setErrorMessage("Name is required!");
    } else {
      try {
        const payload = {
          name: leadObj.name,
          status: leadObj.status,
        };

        // Assuming mutate function handles the API call internally
        await mutate(payload);

        // Assuming showNotification and closeModal are actions/functions
        dispatch(
          showNotification({ message: "Mental Health Updated!", status: 1 })
        );
        closeModal();
      } catch (error) {
        console.error("Error update mental health", error);
        setErrorMessage("Error update mental health. Please try again.");
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
        labelTitle={extraObject.mentalName}
        placeholder={"Type new value"}
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

export default UpdateMentalModalBody;

import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import InputNumber from "../../../components/Input/InputNumber";
import InputSelect from "../../../components/Input/InputSelect";
import { useUpdateDegree } from "../../../hooks/degree.hook";

const statusOptions = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "INACTIVE", label: "INACTIVE" },
];

function EditDegreeModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const INITIAL_LEAD_OBJ = {
    title: extraObject.title,
    status: extraObject.status,
    pointStart: extraObject.pointStart,
    pointEnd: extraObject.pointEnd,
  };
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const selectedDegreeId = extraObject.selectedDegreeId;

  const { mutate } = useUpdateDegree();

  const saveNewLead = async () => {
    try {
      const payload = {
        title: leadObj.title,
        status: leadObj.status,
        pointStart: leadObj.pointStart,
        pointEnd: leadObj.pointEnd,
      };

      console.log("payload", payload);

      await mutate({ selectedDegreeId, payload });

      dispatch(
        showNotification({ message: "Edit Degree Success!", status: 1 })
      );

      closeModal();

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error edit:", error);
      setErrorMessage("Error adding new Plan. Please try again.");
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
        defaultValue={leadObj.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Title"
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

      <InputNumber
        type="number"
        defaultValue={leadObj.pointStart}
        updateType="pointStart"
        containerStyle="mt-4"
        labelTitle="Point Start"
        updateFormValue={updateFormValue}
      />

      <InputNumber
        type="number"
        defaultValue={leadObj.pointEnd}
        updateType="pointEnd"
        containerStyle="mt-4"
        labelTitle="Point End"
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

export default EditDegreeModalBody;

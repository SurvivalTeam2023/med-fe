import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import InputNumber from "../../../components/Input/InputNumber";
import InputSelect from "../../../components/Input/InputSelect";
import { useUpdateOption } from "../../../hooks/option.hook";

const statusOptions = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "INACTIVE", label: "INACTIVE" },
];

function EditOptionModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const INITIAL_LEAD_OBJ = {
    option: extraObject.option,
    status: extraObject.status,
    point: extraObject.point,
  };
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const selectedOptionId = extraObject.selectedOptionId;

  const { mutate } = useUpdateOption();

  const saveNewLead = async () => {
    if (leadObj?.option?.trim() === "") {
      return setErrorMessage("Name is required!");
    } else {
      try {
        const payload = {
          option: leadObj.option,
          status: leadObj.status,
          point: leadObj.point,
        };

        await mutate({ selectedOptionId, payload });

        dispatch(showNotification({ message: "New Option added!", status: 1 }));
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error adding new Option:", error);
        setErrorMessage("Error adding new Option. Please try again.");
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
        defaultValue={leadObj.option}
        updateType="option"
        containerStyle="mt-4"
        labelTitle="Option Name"
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
        defaultValue={leadObj.point}
        updateType="point"
        containerStyle="mt-4"
        labelTitle="Point"
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

export default EditOptionModalBody;

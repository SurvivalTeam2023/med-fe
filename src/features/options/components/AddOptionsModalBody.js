import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import InputNumber from "../../../components/Input/InputNumber";
import InputSelect from "../../../components/Input/InputSelect";
import { useCreateOption } from "../../../hooks/option.hook";

const INITIAL_LEAD_OBJ = {
  option: "",
  status: "ACTIVE",
  points: 1,
  questionId: 0,
};

const statusOptions = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "INACTIVE", label: "INACTIVE" },
];

function AddOptionsModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { mutate } = useCreateOption();

  const saveNewLead = async () => {
    if (leadObj?.option?.trim() === "") {
      return setErrorMessage("Option is required!");
    } else {
      try {
        const payload = {
          option: leadObj.option,
          status: leadObj.status,
          points: leadObj.points,
          questionId: leadObj.questionId,
        };
        console.log("payload", payload);
        await mutate(payload);

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
        defaultValue={leadObj.points}
        updateType="points"
        containerStyle="mt-4"
        labelTitle="Points"
        updateFormValue={updateFormValue}
      />

      <InputNumber
        type="number"
        defaultValue={leadObj.questionId}
        updateType="questionId"
        containerStyle="mt-4"
        labelTitle="Question Id"
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

export default AddOptionsModalBody;

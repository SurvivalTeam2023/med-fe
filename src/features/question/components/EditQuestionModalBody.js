import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import InputSelect from "../../../components/Input/InputSelect";
import { useUpdateQuestion } from "../../../hooks/question.hook";

const statusOptions = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "INACTIVE", label: "INACTIVE" },
];

function EditQuestionModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const INITIAL_LEAD_OBJ = {
    question: extraObject.question,
    status: extraObject.status,
  };
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const selectedQuestionId = extraObject.selectedQuestionId;

  const { mutate } = useUpdateQuestion();

  const saveNewLead = async () => {
    if (leadObj?.question?.trim() === "") {
      return setErrorMessage("Question is required!");
    } else {
      try {
        const payload = {
          question: leadObj.question,
          status: leadObj.status,
        };

        await mutate({ selectedQuestionId, payload });

        dispatch(showNotification({ message: "New Plan added!", status: 1 }));
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error adding new Plan:", error);
        setErrorMessage("Error adding new Plan. Please try again.");
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
        defaultValue={leadObj.question}
        updateType="question"
        containerStyle="mt-4"
        labelTitle="Question"
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

export default EditQuestionModalBody;

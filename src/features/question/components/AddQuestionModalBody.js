import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useQuery } from "@tanstack/react-query";
import { getMentalHealthList } from "../../../Axios/Apis/mentalHealth/mentalHealth";
import InputSelect from "../../../components/Input/InputSelect";
import InputMultipleSelect from "../../../components/Input/InputMultipleSelect";
import { useCreateQuestion } from "../../../hooks/question.hook";

const INITIAL_LEAD_OBJ = {
  question: "",
  status: "ACTIVE",
  mentalHealthId: [],
  ageId: 1,
};

const statusOptions = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "INACTIVE", label: "INACTIVE" },
];

const ageOptions = [
  { value: "1", label: "13-20" },
  { value: "2", label: "21-30" },
  { value: "3", label: "31-50" },
  { value: "4", label: "51-100" },
];

function AddQuestionModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { mutate } = useCreateQuestion();

  const { data: mental } = useQuery({
    queryKey: ["getMentalHealthList"],
    queryFn: async () => {
      try {
        const result = await getMentalHealthList();
        return result;
      } catch (error) {
        throw new Error(`Error fetching mental: ${error.message}`);
      }
    },
  });

  const mentalData = mental?.data;

  let mappedOptions = [];

  if (mentalData) {
    mappedOptions = mentalData?.map((options) => ({
      value: options.id,
      label: options.name,
    }));
  }

  const saveNewLead = async () => {
    if (leadObj.question.trim() === "") {
      return setErrorMessage("question is required!");
    } else {
      try {
        const payload = {
          question: leadObj.question,
          status: leadObj.status,
          mentalHealthId: leadObj.mentalHealthId,
          ageId: leadObj.ageId,
        };

        await mutate(payload);
        dispatch(
          showNotification({ message: "New Question Added!", status: 1 })
        );
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error adding new Question:", error);
        setErrorMessage("Error adding new Question. Please try again.");
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

      <InputMultipleSelect
        options={mappedOptions}
        defaultValue={leadObj.mentalHealthId}
        updateType="mentalHealthId"
        containerStyle="mt-4"
        labelTitle="Mental Health"
        updateFormValue={updateFormValue}
      />

      <InputSelect
        options={ageOptions}
        defaultValue={leadObj.ageId}
        updateType="ageId"
        containerStyle="mt-4"
        labelTitle="Age Group"
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

export default AddQuestionModalBody;

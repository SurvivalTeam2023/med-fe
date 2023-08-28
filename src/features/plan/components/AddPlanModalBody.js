import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import InputNumber from "../../../components/Input/InputNumber";
import { useCreatePlan } from "../../../hooks/plan.hook";

const INITIAL_LEAD_OBJ = {
  name: "",
  desc: "",
  usageTime: 1,
  cost: 1,
};

function AddPlanModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { mutate, isSuccess } = useCreatePlan();

  const saveNewLead = async () => {
    if (leadObj?.name?.trim() === "") {
      return setErrorMessage("Name is required!");
    } else if (leadObj?.desc?.trim() === "") {
      return setErrorMessage("Description is required!");
    } else if (leadObj?.usageTime > 12) {
      return setErrorMessage("Usage Time is should be less than 12 months!");
    } else if (leadObj?.usageTime === 0) {
      return setErrorMessage("Usage Time is should be more than 1 months!");
    } else if (leadObj?.cost <= 0) {
      return setErrorMessage("Cost is required!");
    } else {
      try {
        const payload = {
          name: leadObj.name,
          desc: leadObj.desc,
          usageTime: leadObj.usageTime,
          cost: leadObj.cost,
        };
        await mutate(payload);

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
        defaultValue={leadObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Plan Name"
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

      <InputNumber
        type="number"
        defaultValue={leadObj.usageTime}
        updateType="usageTime"
        containerStyle="mt-4"
        labelTitle="Usage time (month)"
        updateFormValue={updateFormValue}
      />

      <InputNumber
        type="number"
        defaultValue={leadObj.cost}
        updateType="cost"
        containerStyle="mt-4"
        labelTitle="Cost (USD)"
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

export default AddPlanModalBody;

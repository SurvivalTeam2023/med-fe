import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import InputNumber from "../../../components/Input/InputNumber";
import { useQuery } from "@tanstack/react-query";
import { getMentalHealthList } from "../../../Axios/Apis/mentalHealth/mentalHealth";
import InputSelect from "../../../components/Input/InputSelect";
import { useCreateDegree } from "../../../hooks/degree.hook";

const INITIAL_LEAD_OBJ = {
  mentalHealthId: 1,
  title: "",
  description: "",
  status: "ACTIVE",
  pointStart: 0,
  pointEnd: 0,
};

function AddDegreeModalBody({ closeModal }) {
  const { data: Mental } = useQuery({
    queryKey: ["genre"],
    queryFn: async () => {
      try {
        const result = await getMentalHealthList();
        return result;
      } catch (error) {
        throw new Error(`Error fetching list: ${error.message}`);
      }
    },
  });
  const MentalData = Mental?.data;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { mutate } = useCreateDegree();

  let mappedOptions = [];

  if (MentalData) {
    mappedOptions = MentalData?.map((options) => ({
      value: options.id,
      label: options.name,
    }));
  }

  const saveNewLead = async () => {
    if (leadObj?.description?.trim() === "") {
      return setErrorMessage("Description is required!");
    } else if (!leadObj?.pointStart) {
      return setErrorMessage("Point Start is required!");
    } else if (!leadObj?.pointEnd) {
      return setErrorMessage("Point End is required!");
    } else {
      try {
        const payload = {
          mentalHealthId: leadObj.mentalHealthId,
          title: leadObj.title,
          description: leadObj.description,
          status: leadObj.status,
          pointStart: leadObj.pointStart,
          pointEnd: leadObj.pointEnd,
        };
        await mutate(payload);

        dispatch(showNotification({ message: "New Degree added!", status: 1 }));
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error adding new Degree:", error);
        setErrorMessage("Error adding new Degree. Please try again.");
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
        defaultValue={leadObj.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Title"
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

      <InputSelect
        options={mappedOptions}
        defaultValue={leadObj.mentalHealthId}
        updateType="mentalHealthId"
        containerStyle="mt-4"
        labelTitle="Mental Health"
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

export default AddDegreeModalBody;

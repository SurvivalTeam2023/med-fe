import { useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useCreateExercise } from "../../../hooks/exercise.hook";
import { useQuery } from "@tanstack/react-query";
import InputMultipleSelect from "../../../components/Input/InputMultipleSelect";
import {
  getExercisesAPI,
  getExercisesByMentalHealthIdAPI,
} from "../../../Axios/Apis/exercise/exercise";

const INITIAL_LEAD_OBJ = {
  mentalHealthId: [],
};

function AddMentalHealthIntoExerciseModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const selectedMentalId = extraObject.selectedMentalId;
  let mappedMentalOptions = [];
  let mappedExerciseOptions = [];
  const { mutate } = useCreateExercise();
  const { data: mental } = useQuery({
    queryKey: ["getExerciseMentalList"],
    queryFn: async () => {
      try {
        const result = await getExercisesByMentalHealthIdAPI(selectedMentalId);
        return result;
      } catch (error) {
        throw new Error(`Error fetching mental: ${error.message}`);
      }
    },
  });

  const { data: exercise } = useQuery({
    queryKey: ["getExerciseList"],
    queryFn: async () => {
      try {
        const result = await getExercisesAPI();
        return result;
      } catch (error) {
        throw new Error(`Error fetching audio: ${error.message}`);
      }
    },
  });

  const exerciseData = exercise?.data;
  const mentalData = mental?.data?.mentalHealthExercise;

  // for (const exercise of mentalData) {
  //   exerciseNames.push(exercise.exercise);
  // }

  if (mentalData) {
    mappedMentalOptions = mentalData?.map((options) => ({
      value: options.exercise.id,
      label: options.exercise.name,
    }));
  }

  if (exerciseData) {
    mappedExerciseOptions = exerciseData?.map((options) => ({
      value: options.id,
      label: options.name,
    }));
  }

  const saveNewLead = async () => {
    if (leadObj?.option?.trim() === "") {
      return setErrorMessage("Exercise is required!");
    } else {
      try {
        const payload = {
          mentalHealthId: leadObj.mentalHealthId,
        };
        await mutate(payload);

        dispatch(
          showNotification({
            message: "Mental Health added to exercise!",
            status: 1,
          })
        );
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error adding new Exercise:", error);
        setErrorMessage("Error adding new Exercise. Please try again.");
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
      <InputMultipleSelect
        options={mappedExerciseOptions}
        defaultValue={mappedMentalOptions}
        updateType="mentalHealthId"
        containerStyle="mt-4"
        labelTitle="Exercise"
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

export default AddMentalHealthIntoExerciseModalBody;

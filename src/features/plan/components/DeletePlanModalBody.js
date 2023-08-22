import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import { deletePlaylistAPI } from "../../../Axios/Apis/playlist/playlist";
import ErrorText from "../../../components/Typography/ErrorText";
import { useState } from "react";
import { deletePlanAPI } from "../../../Axios/Apis/plan/plan";

function DeletePlanModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const selectedPlanId = extraObject.selectedPlanId;
  const message = extraObject.message;

  const proceedWithYes = async () => {
    try {
      await deletePlanAPI(selectedPlanId);
      dispatch(
        showNotification({
          message: "Delete Plan successfully!",
          status: 1,
        })
      );
      closeModal();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("Error deleting selected Plan!");
    }
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          Yes
        </button>
      </div>
    </>
  );
}

export default DeletePlanModalBody;

import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import { useState } from "react";
import { deleteOptionAPI } from "../../../Axios/Apis/options/options";

function DeleteOptionModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const selectedOptionId = extraObject.selectedOptionId;
  const message = extraObject.message;

  const proceedWithYes = async () => {
    try {
      await deleteOptionAPI(selectedOptionId);
      dispatch(
        showNotification({
          message: "Delete Option successfully!",
          status: 1,
        })
      );
      closeModal();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("Error deleting selected Option!");
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

export default DeleteOptionModalBody;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useUpdateUser } from "../../../hooks/user.hook";

const INITIAL_LEAD_OBJ = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  address: "",
  dob: "",
};

function EditLeadModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const selectedLeadId = useSelector((state) => state.lead.selectedLeadId);

  const { mutate } = useUpdateUser();

  const saveNewLead = async () => {
    try {
      const payload = {};

      if (leadObj.firstName) payload.firstName = leadObj.firstName;
      if (leadObj.lastName) payload.lastName = leadObj.lastName;
      if (leadObj.email) payload.email = leadObj.email;
      if (leadObj.city) payload.city = leadObj.city;
      if (leadObj.address) payload.address = leadObj.address;
      if (leadObj.dob) payload.dob = leadObj.dob;

      console.log("payload la gi bro?", payload);
      await mutate({ selectedLeadId, payload });

      dispatch(
        showNotification({ message: "User Edit Successfully!", status: 1 })
      );
      closeModal();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error edit user:", error);
      setErrorMessage("Error edit user. Please try again.");
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
        defaultValue={leadObj.firstName}
        updateType="firstName"
        containerStyle="mt-4"
        labelTitle="First Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.lastName}
        updateType="lastName"
        containerStyle="mt-4"
        labelTitle="Last Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="email"
        defaultValue={leadObj.email}
        updateType="email"
        containerStyle="mt-4"
        labelTitle="Email"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.city}
        updateType="city"
        containerStyle="mt-4"
        labelTitle="City"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.address}
        updateType="address"
        containerStyle="mt-4"
        labelTitle="Address"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.dob}
        updateType="dob"
        containerStyle="mt-4"
        labelTitle="Dob"
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

export default EditLeadModalBody;

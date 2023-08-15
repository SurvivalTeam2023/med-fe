import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import InputSelect from "../../../components/Input/InputSelect";
import { showNotification } from "../../common/headerSlice";
import { useCreateUser } from "../../../hooks/user.hook";

const INITIAL_LEAD_OBJ = {
  username: "",
  email: "",
  password: "",
  repassword: "",
  first_name: "",
  last_name: "",
  gender: "MALE",
  city: "",
  address: "",
  dob: "1997-09-25T18:35:41.428Z",
};

const options = [
  { value: "MALE", label: "MALE" },
  { value: "FEMALE", label: "FEMALE" },
  { value: "OTHERS", label: "OTHERS" },
];

function AddLeadModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { mutate } = useCreateUser();

  const saveNewLead = async () => {
    if (leadObj.first_name.trim() === "") {
      return setErrorMessage("First Name is required!");
    } else if (leadObj.email.trim() === "") {
      return setErrorMessage("Email id is required!");
    } else if (leadObj.username.trim() === "") {
      return setErrorMessage("Username is required!");
    } else if (leadObj.password.trim() === "") {
      return setErrorMessage("Password is required!");
    } else if (
      leadObj.repassword.trim() === "" ||
      leadObj.repassword !== leadObj.password
    ) {
      return setErrorMessage("Passwords do not match!");
    } else if (leadObj.last_name.trim() === "") {
      return setErrorMessage("Last Name is required!");
    } else if (leadObj.gender.trim() === "") {
      return setErrorMessage("Gender is required!");
    } else if (leadObj.city.trim() === "") {
      return setErrorMessage("City is required!");
    } else if (leadObj.address.trim() === "") {
      return setErrorMessage("Address is required!");
    } else if (leadObj.dob.trim() === "") {
      return setErrorMessage("Date of Birth is required!");
    } else {
      try {
        const payload = {
          username: leadObj.username,
          email: leadObj.email,
          password: leadObj.password,
          repassword: leadObj.repassword,
          firstName: leadObj.first_name,
          lastName: leadObj.last_name,
          gender: leadObj.gender,
          city: leadObj.city,
          address: leadObj.address,
          dob: leadObj.dob,
        };
        await mutate(payload);
        dispatch(showNotification({ message: "New user Added!", status: 1 }));
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error adding new user:", error);
        setErrorMessage("Error adding new user. Please try again.");
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
        defaultValue={leadObj.username}
        updateType="username"
        containerStyle="mt-4"
        labelTitle="Username"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.password}
        updateType="password"
        containerStyle="mt-4"
        labelTitle="Password"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.repassword}
        updateType="repassword"
        containerStyle="mt-4"
        labelTitle="Re-password"
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
        defaultValue={leadObj.first_name}
        updateType="first_name"
        containerStyle="mt-4"
        labelTitle="First Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.last_name}
        updateType="last_name"
        containerStyle="mt-4"
        labelTitle="Last Name"
        updateFormValue={updateFormValue}
      />

      <InputSelect
        options={options}
        defaultValue={leadObj.gender}
        updateType="gender"
        containerStyle="mt-4"
        labelTitle="Gender"
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

export default AddLeadModalBody;

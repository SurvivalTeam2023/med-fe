import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { showNotification } from "../../common/headerSlice";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

const { TextArea } = Input;

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
};
const inputStyle = {
  width: "100%",
  marginBottom: "20px",
};

const inputContainerStyle = {
  width: "800px", // Adjust the width for "Answers"
};

const pointsContainerStyle = {
  width: "10%", // Adjust the width for "Points"
  marginLeft: "20px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

function ViewOptionsModalBody({ closeModal, extraObject }) {
  const mappedData = extraObject.mappedData;

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [isValueChanged, setIsValueChanged] = useState(false);

  const onFinish = (values) => {
    console.log("Form values:", values);

    // Dispatch any necessary actions and close the modal
    dispatch(showNotification({ message: "Answers updated!", status: 1 }));
    closeModal();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setErrorMessage("Please fill in all answer fields.");
  };

  const handleValueChange = (e, index) => {
    // Check if the new value is different from the initial value
    const newValue = e.target.value;
    const initialValue = mappedData[index]?.points;
    setIsValueChanged(newValue !== initialValue);
  };

  return (
    <div style={containerStyle}>
      <Form
        form={form}
        name="answer_form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.List name="answers" initialValue={mappedData}>
          {(fields, { add, remove }) => (
            <div>
              {fields?.map(({ key, name, ...restField }, index) => (
                <div
                  key={key}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div style={containerStyle}>
                    <div style={inputContainerStyle}>
                      <div style={{ marginBottom: "20px" }}>Answers</div>
                      <Form.Item
                        {...restField}
                        name={[name, "answer"]}
                        style={inputStyle}
                        initialValue={mappedData[index]?.label}
                        rules={[
                          {
                            required: true,
                            message: "Answer is required!",
                          },
                        ]}
                      >
                        <TextArea placeholder="Enter your answer here" />
                      </Form.Item>
                    </div>

                    <div style={pointsContainerStyle}>
                      <div style={{ marginBottom: "20px" }}>Points</div>
                      <Form.Item
                        {...restField}
                        name={[name, "points"]}
                        initialValue={mappedData[index]?.points}
                        rules={[
                          {
                            required: true,
                            message: "Points are required!",
                          },
                        ]}
                      >
                        <Input.TextArea
                          placeholder="Enter your points here"
                          onChange={handleValueChange} // Call this function when the value changes
                        />
                        {isValueChanged && (
                          <Button
                            type="primary"
                            icon={<PlusCircleIcon />}
                            onClick={() => {
                              setIsValueChanged(false);
                            }}
                          >
                            Save
                          </Button>
                        )}
                      </Form.Item>
                    </div>
                  </div>

                  {fields.length > 1 && (
                    <Button
                      type="danger"
                      onClick={() => {
                        remove(name);
                      }}
                    >
                      <TrashIcon className="w-5" />
                    </Button>
                  )}
                </div>
              ))}

              <Form.Item>
                {fields.length < 4 && (
                  <Button
                    type="danger"
                    onClick={() => {
                      add();
                    }}
                  >
                    <PlusCircleIcon className="w-5" />
                  </Button>
                )}
              </Form.Item>
            </div>
          )}
        </Form.List>

        {errorMessage && (
          <div style={{ color: "red", marginBottom: "20px" }}>
            {errorMessage}
          </div>
        )}

        <div style={buttonContainerStyle}>
          <Button type="button">Save</Button>
          <Button
            htmlType="button"
            onClick={closeModal}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ViewOptionsModalBody;

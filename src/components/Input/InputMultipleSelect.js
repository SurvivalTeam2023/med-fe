import React, { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

function InputMultipleSelect({
  labelTitle,
  labelStyle,
  options,
  containerStyle,
  defaultValue,
  updateFormValue,
  updateType,
}) {
  const [values, setValues] = useState(defaultValue);

  const updateSelectValues = (selectedValues) => {
    const selectedNumbers = selectedValues.map(Number);
    setValues(selectedNumbers);
    updateFormValue({ updateType, value: selectedNumbers });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <Select
        mode="multiple"
        value={values}
        onChange={(selectedValues) => updateSelectValues(selectedValues)}
        className="w-full"
        showSearch // Enable search functionality
        optionFilterProp="children" // Specify the property to use for filtering (default is 'value')
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default InputMultipleSelect;

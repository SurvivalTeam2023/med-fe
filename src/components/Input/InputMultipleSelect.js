import { useState } from "react";

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
      <select
        multiple
        value={values}
        onChange={(e) => {
          const selectedOptions = Array.from(
            e.target.selectedOptions,
            (option) => option.value
          );
          updateSelectValues(selectedOptions);
        }}
        className="select select-bordered w-full"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputMultipleSelect;

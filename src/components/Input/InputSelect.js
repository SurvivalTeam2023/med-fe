import { useState } from "react";

function InputSelect({
  labelTitle,
  labelStyle,
  options,
  containerStyle,
  defaultValue,
  updateFormValue,
  updateType,
}) {
  const [value, setValue] = useState(defaultValue);

  const updateSelectValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <select
        value={value}
        onChange={(e) => updateSelectValue(e.target.value)}
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

export default InputSelect;

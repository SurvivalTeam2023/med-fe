import { useState } from "react";

function InputNumber({
  labelTitle,
  labelStyle,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
}) {
  const initialValue =
    typeof defaultValue === "number" ? defaultValue : Number(defaultValue);
  const [value, setValue] = useState(initialValue);

  const updateInputValue = (val) => {
    const numericValue = Number(val); // Ensure numeric value
    setValue(numericValue);
    updateFormValue({ updateType, value: numericValue });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <input
        type="number"
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        className="input input-bordered w-full"
      />
    </div>
  );
}

export default InputNumber;

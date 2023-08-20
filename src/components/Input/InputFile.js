import React from "react";

const InputFile = ({
  updateType,
  containerStyle,
  labelTitle,
  updateFormValue,
}) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      updateFormValue({ updateType, value: file });
    }
  };

  return (
    <div className={containerStyle} style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>
        {labelTitle}
      </label>
      <input
        type="file"
        onChange={handleFileChange}
        accept={updateType === "audioFile" ? "audio/*" : "image/*"}
        style={{
          display: "block",
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default InputFile;

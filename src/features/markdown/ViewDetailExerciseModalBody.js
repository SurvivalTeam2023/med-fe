import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const editorAndPreviewContainerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  width: "100%",
};

const editorStyle = {
  flex: 1,
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const previewStyle = {
  flex: 1,
  marginLeft: "20px",
};

const previewHeadingStyle = {
  fontSize: "20px",
  marginBottom: "10px",
};

const markdownPreviewStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f5f5f5", // Background color
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Box shadow
  fontFamily: "Arial, sans-serif", // Font family
  fontSize: "18px", // Font size
  lineHeight: "1.6", // Line height
  color: "#333", // Text color
};

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState("hehe");
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const formatCharacter = getFormatCharacter(e.key);
      if (formatCharacter) {
        formatSelectedText(formatCharacter);
      }
    } else if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      insertNewlineAtCursor();
    }
  };

  const insertNewlineAtCursor = () => {
    const textArea = textareaRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const currentText = markdownText;
    const newText =
      currentText.substring(0, start) +
      "\n\n" + // Use double newlines to indicate a new line
      currentText.substring(end);
    setMarkdownText(newText);
  };

  const getFormatCharacter = (key) => {
    switch (key) {
      case "b":
        return "**"; // Bold
      case "i":
        return "_"; // Italic
      default:
        return null;
    }
  };

  const formatSelectedText = (format) => {
    const textArea = textareaRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = markdownText.substring(start, end);
    const newText =
      markdownText.substring(0, start) +
      format +
      selectedText +
      format +
      markdownText.substring(end);
    setMarkdownText(newText);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.Clipboard;
    const pastedText = clipboardData.getData("text/plain");

    const textArea = textareaRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const currentText = markdownText;
    const newText =
      currentText.substring(0, start) + pastedText + currentText.substring(end);
    setMarkdownText(newText);
  };

  return (
    <div style={containerStyle}>
      <div style={editorAndPreviewContainerStyle}>
        <div style={editorStyle}>
          <textarea
            ref={textareaRef}
            style={textareaStyle}
            rows="10"
            value={markdownText}
            onChange={(e) => setMarkdownText(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste} // Handle paste events
          />
        </div>
        <div style={previewStyle}>
          <h2 style={previewHeadingStyle}>Preview:</h2>
          <div style={markdownPreviewStyle}>
            <ReactMarkdown>{markdownText}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;

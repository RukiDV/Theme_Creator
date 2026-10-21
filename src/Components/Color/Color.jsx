import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../Clipboard/CopyToBoard";
import ContrastChecker from "../ContrastChecker/ContrastChecker";
import "./Color.css";
import { useState } from "react";

export default function Color({ color, onDeleteColor, onUpdateColor }) {
  const { id, role, hex, contrastText } = color;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleUpdate(updatedColor) {
    onUpdateColor(updatedColor);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div
        className="color-card"
        style={{
          backgroundColor: hex,
          color: contrastText,
        }}
      >
        <ColorForm
          initialData={color}
          onSubmitColor={handleUpdate}
          isEditing={true}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }
  return (
    <div
      className="color-card"
      style={{
        backgroundColor: hex,
        color: contrastText,
      }}
    >
      {/* add copy button */}
      <div className="color-card-headline-container">
        <h3 className="color-card-headline">{hex}</h3>
        <CopyToClipboard hex={hex} />
      </div>

      <p>{role}</p>
      <p>contrast: {contrastText}</p>

      <ContrastChecker hex={hex} contrastText={contrastText} />

      {/* add delete and edit button */}
      {isDeleting ? (
        <div className="color-card-highlight">
          <span>Really delete?</span>
          {/* cancel button hides confirmation dialog */}
          <button onClick={() => setIsDeleting(false)}>CANCEL</button>
          {/* delete button triggers actual deletion function from App */}
          <button onClick={() => onDeleteColor(id)}>DELETE</button>
        </div>
      ) : (
        <>
          <button onClick={() => setIsDeleting(true)}>DELETE</button>
          <button onClick={() => setIsEditing(true)}>EDIT</button>
        </>
      )}
    </div>
  );
}

import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../Clipboard/CopyToBoard";
import ContrastChecker from "../ContrastChecker/ContrastChecker";
import "./Color.css";
import { useState } from "react";
import { Plus, Pencil, Trash, Check, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Color({ color, onDeleteColor, onUpdateColor, onMoveColor }) {
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

      <p className="color-card-role">{role}</p>
      <p className="color-card-contrast"> Contrast: {contrastText}</p>

      <ContrastChecker hex={hex} contrastText={contrastText} />

      {/* add delete and edit button */}
      {isDeleting ? (
        <div className="color-card-delete-confirmation">
          <span>Really delete? </span>
          {/* cancel button hides confirmation dialog */}
          <button type="button" title="Cancel" className="icon-button" onClick={() => setIsDeleting(false)}><X size={16} /> </button>
          {/* delete button triggers actual deletion function from App */}
          <button type="button" title="Confirm Delete" className="icon-button" onClick={() => onDeleteColor(id)}><Check size={16} /> </button>
        </div>
      ) : (
        <div className="color-card-actions">
          {/* move button left */}
          <button
            type="button"
            title="Move Left"
            className="icon-button"
            onClick={() => onMoveColor(id, "left")}
          >
            <ChevronLeft size={16} />
          </button>

          {/* move button right*/}
          <button
            type="button"
            title="Move Right"
            className="icon-button"
            onClick={() => onMoveColor(id, "right")}
          >
            <ChevronRight size={16} />
          </button>

          {/* delete and edit button */}
          <button type="button" title="Delete Color" className="icon-button" onClick={() => setIsDeleting(true)}><Trash size={16} /> </button>
          <button type="button" title="Edit Color" className="icon-button" onClick={() => setIsEditing(true)}><Pencil size={16} /> </button>
        </div>
      )}
    </div>
  );
}
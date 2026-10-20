import "./Color.css";
import { useState } from "react";

export default function Color({ color, onDeleteColor }) {
  const { id, role, hex, contrastText } = color;
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div
      className="color-card"
      style={{
        backgroundColor: hex,
        color: contrastText,
      }}
    >
      <h3 className="color-card-headline">{hex}</h3>
      <p>{role}</p>
      <p>contrast: {contrastText}</p>
      {isDeleting ? (
        <div className="color-card-highlight">
          <span>Really delete?</span>
          {/* cancel button hides confirmation dialog */}
          <button onClick={() => setIsDeleting(false)}>CANCEL</button>
          {/* delete button triggers actual deletion fucntion from App */}
          <button onClick={() => onDeleteColor(id)}>DELETE</button>
        </div>
      ) : (
        <button onClick={() => setIsDeleting(true)}>DELETE</button>
      )}
    </div>
  );
}

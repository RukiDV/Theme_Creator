import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";
import { Plus, Check, X } from "lucide-react";

export default function ColorForm({
  onSubmitColor,
  initialData = {
    role: "some color",
    hex: "#123456",
    contrastText: "#ffffff",
  },
  isEditing = false,
  onCancel,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (isEditing) {
      onSubmitColor({ id: initialData.id, ...data });
    } else {
      onSubmitColor(data);
    }
    event.target.reset();
  }
  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label htmlFor="role">
        Role
        <br />
        <input
          type="text"
          id="role"
          name="role"
          defaultValue={initialData.role}
        />
      </label>
      <br />
      <label htmlFor="hex">
        Hex
        <br />
        <ColorInput id="hex" defaultValue={initialData.hex} />
      </label>
      <br />
      <label htmlFor="contrastText">
        Contrast Text
        <br />
        <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
      </label>
      <br />
      <div className="color-form-actions">
        <button
          type="submit"
          className="submit-button" 
          title={isEditing ? "Update Color" : "Add Color"}
        > 
          {/* if we edit a color then we can update it or if not we can add a new color */}
          {isEditing ? (
            <>
              <Check size={16} /> UPDATE COLOR
            </>
          ) : (
            <>
              <Plus size={16} /> ADD COLOR
            </>
          )}
        </button>

        {/* cancel button in card form, show only when button is clicked */}
        {isEditing && (
          <button
            type="button"
            className="icon-button"
            title="Cancel"
            onClick={onCancel}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </form>
  );
}

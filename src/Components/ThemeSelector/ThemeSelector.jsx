import "./ThemeSelector.css";
import { Plus, Pencil, Trash, Check, X } from "lucide-react";

export default function ThemeSelector({
  themes,
  currentThemeId,
  isDefaultTheme,
  themeAction,
  onThemeChange,
  onAddTheme,
  onEditTheme,
  onUpdateTheme,
  onDeleteTheme,
  onSetThemeAction,
}) {
  return (
    // theme selection
    <div className="theme-selector-container">
      {/* in edit mode, show input field */}
      {themeAction.isEditing ? (
        <form className="theme-edit-form" onSubmit={onUpdateTheme}>
          <input
            type="text"
            className="theme-input"
            value={themeAction.nameInput}
            onChange={(event) =>
              onSetThemeAction({
                ...themeAction,
                nameInput: event.target.value,
              })
            }
            autoFocus
          />
          <button type="submit" className="icon-button" title="Update Theme">
            <Check size={16} />
          </button>
          <button
            type="button"
            className="icon-button"
            title="Cancel"
            onClick={() =>
              onSetThemeAction({ ...themeAction, isEditing: false })
            }
          >
            <X size={16} />
          </button>
        </form>
      ) : (
        // show dropdown list
        <select
          className="theme-dropdown"
          title="Select Color Theme"
          value={currentThemeId}
          onChange={onThemeChange}
        >
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      )}

      {/* theme buttons  */}
      <div className="theme-actions">
        <button type="button" className="icon-button" onClick={onAddTheme} title="Add New Theme">
          <Plus size={16} />
        </button>

        {!themeAction.isEditing && (
          <button
            type="button"
            className="icon-button"
            title={isDefaultTheme ? "Default theme cannot be edited" : "Edit Theme Name"}
            onClick={onEditTheme}
            disabled={isDefaultTheme}
          >
            <Pencil size={16} />
          </button>
        )}

        {/* delete button: show confirmation dialog or delete button */}
        {themeAction.isDeleting ? (
          <div className="theme-delete-confirmation">
            <span>Really delete color theme?</span>
            <button
              type="button"
              className="icon-button"
              title="Cancel"
              onClick={() =>
                onSetThemeAction({ ...themeAction, isDeleting: false })
              }
            >
              <X size={16} />
            </button>
            <button type="button" className="icon-button" title="Confirm Delete" onClick={onDeleteTheme}>
              <Check size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="icon-button"
            title={isDefaultTheme ? "Default theme cannot be deleted" : "Delete Theme"}
            onClick={() =>
              onSetThemeAction({ ...themeAction, isDeleting: true })
            }
            disabled={isDefaultTheme}
          >
            <Trash size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

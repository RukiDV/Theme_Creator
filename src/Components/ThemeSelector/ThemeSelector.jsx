import "./ThemeSelector.css"

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
            value={themeAction.nameInput}
            onChange={(event) =>
              onSetThemeAction({
                ...themeAction,
                nameInput: event.target.value,
              })
            }
            autoFocus
          />
          <button type="submit">UPDATE</button>
          <button
            type="button"
            onClick={() =>
              onSetThemeAction({ ...themeAction, isEditing: false })
            }
          >
            CANCEL
          </button>
        </form>
      ) : (
        // show dropdown list
        <select value={currentThemeId} onChange={onThemeChange}>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      )}

      {/* theme buttons  */}
      <button type="button" onClick={onAddTheme}>
        ADD
      </button>

      <button type="button" onClick={onEditTheme} disabled={isDefaultTheme}>
        EDIT
      </button>

      {/* delete button: show confirmation dialog or delete button */}
      {themeAction.isDeleting ? (
        <span className="theme-delete-confirmation">
          <span>Really delete color theme?</span>
          <button
            type="button"
            onClick={() =>
              onSetThemeAction({ ...themeAction, isDeleting: false })
            }
          >
            CANCEL
          </button>
          <button type="button" onClick={onDeleteTheme}>
            CONFIRM DELETE
          </button>
        </span>
      ) : (
        <button
          type="button"
          onClick={() => onSetThemeAction({ ...themeAction, isDeleting: true })}
          disabled={isDefaultTheme}
        >
          DELETE
        </button>
      )}
    </div>
  );
}

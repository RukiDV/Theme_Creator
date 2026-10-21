import { initialThemes } from "./lib/colors";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { useState } from "react";

function App() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });

  const [currentThemeId, setCurrentThemeId] = useState("t1");

  // all ui actions for current theme in one object instead of multiple useStates
  const [themeAction, setThemeAction] = useState({
    isEditing: false,
    isDeleting: false,
    nameInput: "",
  });

  // find current selected theme, if undefined use default theme
  const currentTheme =
    themes.find((theme) => theme.id === currentThemeId) || themes[0];

  const isDefaultTheme = currentTheme.id === "t1";

  function handleThemeChange(event) {
    setCurrentThemeId(event.target.value);
    setThemeAction({ isEditing: false, isDeleting: false, nameInput: "" });
  }

  // COLOR HANDLERS
  function handleAddColor(newColor) {
    setThemes(
      themes.map((theme) => {
        if (theme.id === currentTheme.id) {
          return {
            ...theme,
            colors: [{ id: uid(), ...newColor }, ...theme.colors],
          };
        }
        return theme;
      }),
    );
  }

  function handleDeleteColor(colorId) {
    setThemes(
      themes.map((theme) => {
        if (theme.id === currentTheme.id) {
          return {
            ...theme,
            colors: theme.colors.filter((color) => colorId !== color.id),
          };
        }
        return theme;
      }),
    );
  }

  function handleUpdateColor(updatedColor) {
    setThemes(
      themes.map((theme) => {
        if (theme.id === currentTheme.id) {
          return {
            ...theme,
            colors: theme.colors.map((color) =>
              updatedColor.id === color.id ? updatedColor : color,
            ),
          };
        }
        return theme;
      }),
    );
  }

  // THEME HANDLERS
  function handleAddTheme() {
    const newTheme = {
      id: uid(),
      name: "New Theme",
      colors: [],
    };
    setThemes([...themes, newTheme]);
    setCurrentThemeId(newTheme.id);
    setThemeAction({ isEditing: false, isDeleting: false, nameInput: "" });
  }

  function handleEditTheme() {
    if (isDefaultTheme) return; // do not edit default theme
    setThemeAction({
      isEditing: true,
      isDeleting: false,
      nameInput: currentTheme.name,
    });
  }

  // in edit mode, when user changes color input name, use update button
  function handleUpdateTheme(event) {
    event.preventDefault();
    if (!themeAction.nameInput.trim()) return;

    setThemes(
      themes.map((theme) =>
        theme.id === currentTheme.id
          ? { ...theme, name: themeAction.nameInput }
          : theme,
      ),
    );
    setThemeAction({ isEditing: false, isDeleting: false, nameInput: "" });
  }

  function handleDeleteTheme() {
    if (isDefaultTheme) return; // do not delete default theme
    const updatedThemes = themes.filter(
      (theme) => theme.id !== currentTheme.id,
    );
    setThemes(updatedThemes);
    setCurrentThemeId("t1");
    setThemeAction({ isEditing: false, isDeleting: false, nameInput: "" });
  }

  return (
    <>
      <h1>Theme Creator</h1>

      {/* theme selection */}
      <div className="theme-selector-container">
        {/* in edit mode, show input field */}
        {themeAction.isEditing ? (
          <form 
            className="theme-edit-form"
            onSubmit={handleUpdateTheme}
          >
            <input
              type="text"
              value={themeAction.nameInput}
              onChange={(event) =>
                setThemeAction({
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
                setThemeAction({ ...themeAction, isEditing: false })
              }
            >
              CANCEL
            </button>
          </form>
        ) : (
          // show dropdown list 
          <select value={currentThemeId} onChange={handleThemeChange}>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        )}

        {/* theme buttons */}
        <button type="button" onClick={handleAddTheme}>
          ADD
        </button>

        <button
          type="button"
          onClick={handleEditTheme}
          disabled={isDefaultTheme}
        >
          EDIT
        </button>

        {/* delete button: show confirmation dialog or delete button */}
        {themeAction.isDeleting ? (
          <span className="theme-delete-confirmation">
            <span>Really delete color theme?</span>
            <button
              type="button"
              onClick={() =>
                setThemeAction({ ...themeAction, isDeleting: false })
              }
            >
              CANCEL
            </button>
            <button type="button" onClick={handleDeleteTheme}>
              CONFIRM DELETE
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() =>
              setThemeAction({ ...themeAction, isDeleting: true })
            }
            disabled={isDefaultTheme}
          >
            DELETE
          </button>
        )}
      </div>

      {/* add new color to current theme */}
      <ColorForm onSubmitColor={handleAddColor} />

      {/* show hint if no color is available */}
      {currentTheme.colors.length === 0 ? (
        <p>No colors left. PLease add some new colors to your palette!</p>
      ) : (
        currentTheme.colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
            onUpdateColor={handleUpdateColor}
          />
        ))
      )}
    </>
  );
}

export default App;

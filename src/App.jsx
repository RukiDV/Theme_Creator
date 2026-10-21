import { initialThemes } from "./lib/colors";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import { uid } from "uid";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import ThemeSelector from "./Components/ThemeSelector/ThemeSelector";
import "./App.css";

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

      <ThemeSelector 
      themes={themes}
      currentThemeId={currentThemeId}
      currentTheme={currentTheme}
      isDefaultTheme={isDefaultTheme}
      themeAction={themeAction}
      onThemeChange={handleThemeChange}
      onAddTheme={handleAddTheme}
      onEditTheme={handleEditTheme}
      onUpdateTheme={handleUpdateTheme}
      onDeleteTheme={handleDeleteTheme}
      onSetThemeAction={setThemeAction}
      />

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

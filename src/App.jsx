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
  const currentTheme =
    themes.find((theme) => theme.id === currentThemeId) || themes[0];
  const isDefaultTheme = currentTheme.id === "t1";

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

  return (
    <>
      <h1>Theme Creator</h1>

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

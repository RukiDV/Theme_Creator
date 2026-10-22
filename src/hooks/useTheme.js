import { initialThemes } from "../lib/colors";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import { uid } from "uid";

export function useThemes() {
  
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

  // move colors after adding to get correct palette
  function handleMoveColor(colorId, direction) {
    const colors = [...currentTheme.colors];
    const index = colors.findIndex((c) => c.id === colorId);

    if (index === -1) return;

    const targetIndex = direction === "left" ? index - 1 : index + 1;

    // check out of bounce
    if (targetIndex < 0 || targetIndex >= colors.length) return;

    // swap elements in array
    const temp = colors[index];
    colors[index] = colors[targetIndex];
    colors[targetIndex] = temp;

    setThemes(
      themes.map((theme) =>
        theme.id === currentTheme.id ? { ...theme, colors } : theme
      )
    );
  }

  return {
    themes,
    currentThemeId,
    currentTheme,
    isDefaultTheme,
    themeAction,
    setThemeAction,
    handleThemeChange,
    handleAddColor,
    handleDeleteColor,
    handleUpdateColor,
    handleAddTheme,
    handleEditTheme,
    handleUpdateTheme,
    handleDeleteTheme,
    handleMoveColor
  };
}

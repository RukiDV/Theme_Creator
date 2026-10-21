import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import ThemeSelector from "./Components/ThemeSelector/ThemeSelector";
import "./App.css";
import { useThemes } from "./hooks/useTheme";

function App() {
  // custom useTheme hook
  const {
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
    handleDeleteTheme
  } = useThemes();

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

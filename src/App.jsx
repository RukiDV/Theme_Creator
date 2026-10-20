import { initialColors } from "./lib/colors";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  function handleAddColor(newColor) {
    setColors([{ id: uid(), ...newColor }, ...colors]);
  }

  function handleDeleteColor(id) {
    setColors(colors.filter((color) => id !== color.id));
  }

  function handleUpdateColor(updatedColor) {
    setColors(
      colors.map((color) =>
        updatedColor.id === color.id ? updatedColor : color,
      ),
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={handleAddColor} />
      {/* show hint if no color is available */}
      {colors.length === 0 ? (
        <p>No colors left. PLease add some new colors to your palette!</p>
      ) : (
        colors.map((color) => (
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

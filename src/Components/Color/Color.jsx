import "./Color.css";

export default function Color({ color }) {
  const { role, hex, contrastText } = color;
  return (
    <div
      colorName="color-card"
      style={{
        backgroundColor: hex,
        color: contrastText,
      }}
    >
      <h3 className="color-card-headline">{hex}</h3>
      <p>{role}</p>
      <p>contrast: {contrastText}</p>
    </div>
  );
}

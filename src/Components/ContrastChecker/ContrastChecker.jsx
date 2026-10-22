import useSWR from "swr";
import "./ContrastChecker.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ContrastChecker({ hex, contrastText }) {
  const { data, isLoading, error } = useSWR(
    `https://webaim.org/resources/contrastchecker/?fcolor=${contrastText.replace("#", "")}&bcolor=${hex.replace("#", "")}&api`,
    fetcher,
  );

  if (isLoading) {
    return <p>Checking contrast...</p>;
  }

  if (error) {
    return <p>Failed to check contrast!</p>;
  }

  const getContrastStatus = (ratioValue) => {
    const ratio = parseFloat(ratioValue);
    if (ratio >= 4.5) {
      return { text: "Yup", class: "success" };
    }
    if (ratio >= 3.0) {
      return { text: "Kinda", class: "warning" };
    }
    return { text: "Nope", class: "error" };
  };

  const status = getContrastStatus(data.ratio);

  return (
    <div className="contrast-score-box">
      <p className="contrast-line">
        Contrast Ratio: <strong>{data.ratio}</strong>
      </p>
      <p className="contrast-line">
        AA Score: {data.AA === "pass" ? " ✅ Pass" : "❌ Fail"} | AAA Score:{" "}
        {data.AAA === "pass" ? "✅ Pass" : "❌ Fail"}{" "}
      </p>
      <p className="contrast-line">
        <span className={`contrast-badge ${status.class}`}>
          Overall Contrast Score: {status.text}
        </span>
      </p>
    </div>
  );
}

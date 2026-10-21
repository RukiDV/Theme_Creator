import useSWR from "swr";
import "./ContrastChecker.css"

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

  return (
    <>
      <p>Contrast Ratio: <strong>{data.ratio}</strong></p>
      <p>AA Score: {data.AA === "pass" ? " ✅ Pass" : "❌ Fail"} | AAA Score: {data.AAA === "pass" ? "✅ Pass" : "❌ Fail"} </p> 
      <p>
        {data.AA === "pass" ? (
          <span className="contrast-badge success">
            Overall Contrast Score: Yup
          </span>
        ) : (
          <span className="contrast-badge error">
            Overall Contrast Score: Nope
          </span>
        )}
      </p>
    </>
  );
}

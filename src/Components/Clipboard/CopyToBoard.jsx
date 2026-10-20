import { useEffect, useState } from "react";

export default function CopyToClipboard({ hex }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timeout;

    if (isCopied) {
      timeout = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isCopied]);

  async function handleCopyClipboard() {
    try {
      await navigator.clipboard.writeText(hex);
      setIsCopied(true);
    } catch (error) {
      console.log("Failed to copy: ", error);
    }
  }

  return (
    <button type="button" onClick={handleCopyClipboard}>
      {isCopied ? "Successfully copied" : "COPY"}
    </button>
  );
}

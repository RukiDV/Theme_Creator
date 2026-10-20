import { useEffect, useState } from "react";

export default function CopyToClipboard({ hex }) {
  // manges current copy state: "default copy", "success", "error"
  const [copyStatus, setCopyStatus] = useState("default_copy");

  useEffect(() => {
    let timeout;

    // start timer only then when statues is not the default state
    if (copyStatus !== "default_copy") {
      timeout = setTimeout(() => {
        setCopyStatus("default_copy");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [copyStatus]);

  async function handleCopyClipboard() {
    try {
      await navigator.clipboard.writeText(hex);
      setCopyStatus("success");
    } catch (error) {
      console.log("Failed to copy: ", error);
      setCopyStatus("error");
    }
  }

  return (
    <button type="button" onClick={handleCopyClipboard}>
      {copyStatus === "success" && "Successfully copied!"}
      {copyStatus === "error" && "Failed to copy!"}
      {copyStatus === "default_copy" && "COPY"}
    </button>
  );
}

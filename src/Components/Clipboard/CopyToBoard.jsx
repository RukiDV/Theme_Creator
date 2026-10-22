import { useEffect, useState } from "react";
import { Copy, Check, X } from "lucide-react";

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

  function getToolTipText() {
    if (copyStatus === "success") return "Successfully copied!";
    if (copyStatus === "error") return "Failed to copy!";
    return "Copy Hex Code";
  }

  return (
    <button
      type="button"
      className="icon-button"
      title={getToolTipText()}
      onClick={handleCopyClipboard}
    >
      {copyStatus === "success" && <Check size={16} />}
      {copyStatus === "error" && <X size={16} />}
      {copyStatus === "default_copy" && <Copy size={16} />}
    </button>
  );
}

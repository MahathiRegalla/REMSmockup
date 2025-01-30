import React, { useState } from "react";

export function Toggle({ label }) {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex items-center">
      <span className="mr-2">{label}</span>
      <button onClick={() => setEnabled(!enabled)} className="px-3 py-1 bg-gray-400 rounded">
        {enabled ? "ON" : "OFF"}
      </button>
    </div>
  );
}

import React from "react";

export function Alert({ children }) {
  return <div className="p-4 bg-red-200 border border-red-600 rounded">{children}</div>;
}

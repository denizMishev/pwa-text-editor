import React, { forwardRef } from "react";

export const LineNumbers = forwardRef(({ content }, ref) => {
  const lineNumbers = Array.from(
    { length: content.split("\n").length },
    (_, i) => `${i + 1}`
  ).join("\n");

  return (
    <textarea
      readOnly
      value={lineNumbers}
      className="content-line-nums"
      ref={ref}
    />
  );
});

export default LineNumbers;

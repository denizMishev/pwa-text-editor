import { useContext } from "react";
import { GapBufferContext } from "../context/GapBufferContext";

export function LineNumbers() {
  const { gapBufferState } = useContext(GapBufferContext);
  const { lines, ln } = gapBufferState;

  const lineNumbers =
    Object.keys(lines).length === 0 ? [1] : Object.keys(lines).map(Number);

  const lineNumberElements = lineNumbers.map((lineNumber) => (
    <div
      key={lineNumber}
      className={`line-number ${lineNumber === ln ? "current-line" : ""}`}
    >
      {lineNumber}
    </div>
  ));

  return <>{lineNumberElements}</>;
}

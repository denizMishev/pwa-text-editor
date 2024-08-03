import { useContext } from "react";
import { GapBufferContext } from "../context/GapBufferContext";

export function Bottombar() {
  const { gapBufferState } = useContext(GapBufferContext);

  return (
    <div id="bottom-bar" className="bg-primary-100 clr-accent-100">
      <div className="caret-position">
        <span>
          Ln {gapBufferState.ln}, Col {gapBufferState.col}
        </span>
      </div>
    </div>
  );
}

import React, { useState, useRef } from "react";
import LineNumbers from "./LineNumbers";

export function Content() {
  const [content, setContent] = useState("");
  const contentRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const lineNumbersScrollSync = () => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = contentRef.current.scrollTop;
    }
  };

  return (
    <main id="main">
      <div className="content-ctr">
        <LineNumbers content={content} ref={lineNumbersRef} />
        <textarea
          id="content"
          className="content"
          placeholder="Start typing here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onScroll={lineNumbersScrollSync}
          ref={contentRef}
        ></textarea>
      </div>
    </main>
  );
}

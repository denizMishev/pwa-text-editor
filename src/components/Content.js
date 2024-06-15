import React, { useState, useRef, useEffect } from "react";
import { GapBuffer } from "../text_editor/gapBuffer";

export function Content() {
  const gapBuffer = useRef(new GapBuffer());
  const contentRef = useRef(null);
  const [displayContent, setDisplayContent] = useState("");

  const handleKeyDown = (e) => {
    e.preventDefault();

    switch (e.key) {
      case "ArrowLeft":
        gapBuffer.current.left();
        break;
      case "ArrowRight":
        gapBuffer.current.right();
        break;
      case "Backspace":
        gapBuffer.current.delete();
        break;
      case "Enter":
        gapBuffer.current.insert("\n");
        break;
      default:
        if (e.key.length === 1) {
          gapBuffer.current.insert(e.key);
        }
        break;
    }

    updateDisplay();
  };

  const updateDisplay = () => {
    const text = gapBuffer.current.getContent();
    setDisplayContent(text);
  };

  useEffect(() => {
    updateDisplay();
  }, []);

  return (
    <main id="main">
      <div className="content-ctr">
        <div
          contentEditable="true"
          id="content"
          className="content | user-font"
          placeholder="Start typing here..."
          onKeyDown={handleKeyDown}
          ref={contentRef}
        >
          {displayContent}
        </div>
      </div>
    </main>
  );
}

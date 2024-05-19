import React, { useState, useRef, useEffect } from "react";
import { GapBuffer } from "../text_editor/gapBuffer";
import { Cursor } from "../text_editor/cursor";

export function Content() {
  const gapBuffer = useRef(new GapBuffer());
  const contentRef = useRef(null);
  const cursor = useRef(new Cursor());
  const [displayContent, setDisplayContent] = useState("");

  const handleKeyDown = (e) => {
    let preventDefault = true;
    const text = gapBuffer.current.getContent();

    switch (e.key) {
      case "ArrowLeft":
        gapBuffer.current.left();
        cursor.current.moveLeft();
        break;
      case "ArrowRight":
        gapBuffer.current.right();
        cursor.current.moveRight(text.length);
        break;
      case "Backspace":
        gapBuffer.current.delete();
        cursor.current.moveLeft();
        break;
      case "Enter":
        gapBuffer.current.insert("\n");
        cursor.current.moveRight(text.length + 1);
        break;
      default:
        if (e.key.length === 1) {
          gapBuffer.current.insert(e.key);
          cursor.current.moveRight(text.length + 1);
        } else {
          preventDefault = false;
        }
        break;
    }

    if (preventDefault) {
      e.preventDefault();
      updateDisplay();
    }
  };

  const updateDisplay = () => {
    const text = gapBuffer.current.getContent();
    const cursorPos = cursor.current.getPosition();
    const displayedText =
      text.substring(0, cursorPos) + "|" + text.substring(cursorPos);
    setDisplayContent(displayedText);
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

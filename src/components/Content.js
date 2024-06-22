import React, { useRef, useEffect } from "react";
import { GapBuffer } from "../text_editor/gapBuffer";

export function Content() {
  const gapBuffer = useRef(new GapBuffer());
  const contentRef = useRef(null);

  function handleUserAction(e) {
    switch (e.type) {
      case "input":
        onInputHandler(e);
        break;
      case "keydown":
        onKeyDownHandler(e);
        break;
      case "paste":
        onPasteHandler(e);
        break;
      default:
        console.error("Unhandled user action:", e.type);
        break;
    }
  }

  const onInputHandler = (e) => {};

  const onPasteHandler = (e) => {
    e.preventDefault();

    const pastedContent = e.clipboardData.getData("text/plain");
    for (let char of pastedContent) gapBuffer.current.insert(char);
    updateDisplay();
  };

  const onKeyDownHandler = (e) => {
    let preventDefault = true;
    if (e.ctrlKey && e.key === "v") {
      preventDefault = false;
    }

    if (preventDefault) {
      e.preventDefault();
    }

    console.log("check 2");

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
    if (contentRef.current) contentRef.current.innerText = text;
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
          ref={contentRef}
          onInput={handleUserAction}
          onKeyDown={handleUserAction}
          onPaste={handleUserAction}
        ></div>
      </div>
    </main>
  );
}

//you introduced an if statement pattern to my switch pattern function, can we not achieve this simultaneous pressing of ctrl and v key as a switch?

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

    if (e.ctrlKey && e.key === "v") preventDefault = false;

    if (preventDefault) e.preventDefault();

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
    const caretPosition = getCaretPosition(text);
    const textWithCaret = insertCaretAtPosition(text, caretPosition);

    console.log(
      "Current Line:",
      gapBuffer.current.ln,
      "Current Column:",
      gapBuffer.current.col
    );
    console.log(gapBuffer.current.lines, "gapbuffer lines");

    if (contentRef.current) contentRef.current.innerHTML = textWithCaret;
  };

  const getCaretPosition = () => {
    let position = 0;
    for (let i = 1; i < gapBuffer.current.ln; i++) {
      position += gapBuffer.current.lines[i] + 1; // +1 for newline
    }
    position += gapBuffer.current.col;
    return position;
  };

  const insertCaretAtPosition = (text, position) => {
    return (
      text.slice(0, position) +
      '<span class="caret">|</span>' +
      text.slice(position)
    );
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

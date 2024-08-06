import { useRef, useEffect, useContext } from "react";
import { GapBuffer } from "../text_editor/gapBuffer";
import { GapBufferContext } from "../context/GapBufferContext";
import { LineNumbers } from "./LineNumbers";

export function Content() {
  const gapBuffer = useRef(new GapBuffer());
  const { setGapBufferState } = useContext(GapBufferContext);
  const contentRef = useRef(null);
  const lineNumbersRef = useRef(null);

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

  const onInputHandler = (e) => {
    updateDisplay();
  };

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
      case "ArrowUp":
        gapBuffer.current.up();
        break;
      case "ArrowDown":
        gapBuffer.current.down();
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

    console.log(gapBuffer.current.lines, "gapbuffer lines");
    console.log(gapBuffer.current.gapStart, "gapstart here");

    setGapBufferState({
      ln: gapBuffer.current.ln,
      col: gapBuffer.current.col,
      lines: gapBuffer.current.lines,
    });

    if (contentRef.current) {
      contentRef.current.innerHTML = textWithCaret;
      setTimeout(() => {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }, 0);
    }
  };

  const getCaretPosition = () => {
    let position = 0;
    for (let i = 1; i < gapBuffer.current.ln; i++) {
      position += gapBuffer.current.lines[i] + 1; // +1 for newline
    }
    position += gapBuffer.current.col;
    return gapBuffer.current.gapStart;
  };

  const insertCaretAtPosition = (text, position) => {
    return (
      text.slice(0, position) +
      '<span class="caret">|</span>' +
      text.slice(position)
    );
  };

  const handleScroll = () => {
    if (lineNumbersRef.current && contentRef.current) {
      lineNumbersRef.current.scrollTop = contentRef.current.scrollTop;
    }
  };

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
      return () => {
        contentElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    updateDisplay();
  }, []);

  return (
    <main id="main">
      <div className="content-ctr">
        <div
          ref={lineNumbersRef} // Add ref for line numbers container
          className="content-line-nums | bg-primary-100 clr-accent-100"
        >
          <LineNumbers />
        </div>
        <div
          contentEditable="true"
          id="content"
          className="content | user-font clr-accent-100 bg-primary-100"
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

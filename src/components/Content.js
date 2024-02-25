import React, { useState, useRef, useEffect } from "react";
import LineNumbers from "./LineNumbers";
import socket from "../websocket";

export function Content() {
  const [content, setContent] = useState("");
  const contentRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const lineNumbersScrollSync = () => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = contentRef.current.scrollTop;
    }
  };

  useEffect(() => {
    // log on initial connection
    socket.on("connect", () => {
      console.log("connected to websocket server");
    });

    // listens for updates from the server
    socket.on("textUpdate", (newContent) => {
      setContent(newContent);
    });

    // cleanup
    return () => {
      socket.off("textUpdate");
      socket.off("connect");
    };
  });

  const handleTextChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    // emit text changes to server
    socket.emit("textChange", newContent);
  };

  return (
    <main id="main">
      <div className="content-ctr">
        <LineNumbers content={content} ref={lineNumbersRef} />
        <textarea
          id="content"
          className="content | user-font"
          placeholder="Start typing here..."
          value={content}
          // onChange={(e) => setContent(e.target.value)}
          onChange={handleTextChange}
          onScroll={lineNumbersScrollSync}
          ref={contentRef}
        ></textarea>
      </div>
    </main>
  );
}

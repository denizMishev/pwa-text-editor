import React, { useEffect } from "react";
import io from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

export function Chat() {
  useEffect(() => {
    // connect to WS server
    const socket = io(SERVER_URL);

    // listen for messages from the server
    socket.on("serverToClient", (message) => {
      console.log("Message from server:", message);
    });

    // cleanup on component unmount
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h2>React WebSocket Example</h2>
      {/* More UI elements here */}
    </div>
  );
}

import { createContext, useState } from "react";

export const GapBufferContext = createContext();

export const GapBufferProvider = ({ children }) => {
  const [gapBufferState, setGapBufferState] = useState({ ln: 0, col: 0 });

  return (
    <GapBufferContext.Provider value={{ gapBufferState, setGapBufferState }}>
      {children}
    </GapBufferContext.Provider>
  );
};

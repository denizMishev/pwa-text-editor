import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Bottombar } from "./components/Bottombar";
import { GapBufferProvider } from "./context/GapBufferContext";

function App() {
  return (
    <div id="layout-wrapper" className="App">
      <Header />
      <GapBufferProvider>
        <Content />
        <Bottombar />
      </GapBufferProvider>
    </div>
  );
}

export default App;

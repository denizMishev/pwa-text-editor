import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Chat } from "./components/WebsocketTest";

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Chat />
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { GrButton } from "@graphiteds/react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GrButton variant="primary">Send</GrButton>
      </header>
    </div>
  );
}

export default App;

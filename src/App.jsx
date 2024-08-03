import { useState } from "react";
import Chatbot from "./components/Chatbot";
import Introduction from "./components/Introduction";
function App() {
  const [maximize, setMaximize] = useState(false);
  return (
    <div className="h-screen flex bg-gradient-to-l from-green-400 via-teal-500 to-blue-500">
      {!maximize && <Introduction />}
      <Chatbot maximize={maximize} setMaximize={setMaximize} />
    </div>
  );
}

export default App;

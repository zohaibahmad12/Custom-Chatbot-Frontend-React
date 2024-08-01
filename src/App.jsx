import { useState } from "react";
import Chatbot from "./components/Chatbot";
import Introduction from "./components/Introduction";
import VoiceToText from "./components/VoiceToText";
function App() {
  return (
    <div className="h-screen flex bg-gradient-to-br from-black via-gray-500 to-gray-100">
      <Introduction />
      <Chatbot />

      {/* <VoiceToText /> */}
    </div>
  );
}

export default App;

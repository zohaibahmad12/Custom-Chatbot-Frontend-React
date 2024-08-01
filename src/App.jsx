import Chatbot from "./components/Chatbot";
import Introduction from "./components/Introduction";
function App() {
  return (
    <div className="h-screen flex bg-gradient-to-br from-black via-gray-500 to-gray-100">
      <Introduction />
      <Chatbot />
    </div>
  );
}

export default App;

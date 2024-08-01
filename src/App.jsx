import Chatbot from "./components/Chatbot";

function App() {
  return (
    <div className="h-screen flex bg-gradient-to-br from-black via-gray-800 to-gray-900">
      {/* Left Side Content */}
      <div className="hidden lg:flex lg:w-1/2 p-6 items-center justify-center text-white">
        <div className="text-center">
          <img
            src="/icon.png"
            alt="Chatbot Icon"
            className="h-12 w-12 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold mb-2">Chatbot</h1>
          <p className="text-lg">
            Welcome to our chatbot! Ask me anything and I'll do my best to help
            you.
          </p>
        </div>
      </div>

      {/* Chatbot Component */}
      <div className="w-full lg:w-1/2 p-6 flex-shrink-0">
        <Chatbot />
      </div>
    </div>
  );
}

export default App;

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import Message from "./Message";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;
    setMessages([...messages, { text: userInput, isUser: true }]);
    setUserInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/ask", {
        question: userInput,
      });
      setMessages([
        ...messages,
        { text: userInput, isUser: true },
        { text: res.data.answer, isUser: false },
      ]);
    } catch (error) {
      console.log(error);
      setMessages([
        ...messages,
        { text: userInput, isUser: true },
        { text: "Error fetching response.", isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg shadow-lg flex flex-col p-4">
      <div className="flex-1 overflow-auto p-4 bg-gray-900 rounded-t-lg shadow-md space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <Message msg={msg} />
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 bg-gray-700 text-gray-200 rounded-lg max-w-xs">
              <Loader />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center p-4 bg-gray-800 rounded-b-lg shadow-md"
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
          className="w-full p-3 border border-transparent rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 ease-in-out"
        />
        <button
          type="submit"
          className="ml-3 py-2 px-4 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition duration-300 ease-in-out"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;

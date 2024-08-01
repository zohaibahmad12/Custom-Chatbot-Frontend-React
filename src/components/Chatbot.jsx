import { useState, useRef, useEffect } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
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
    <div className="w-full lg:w-1/2 p-6 flex-shrink-0">
      <div className="h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg shadow-lg flex flex-col p-4">
        <MessageList
          messages={messages}
          loading={loading}
          chatEndRef={chatEndRef}
        />
        <MessageForm
          userInput={userInput}
          setUserInput={setUserInput}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Chatbot;

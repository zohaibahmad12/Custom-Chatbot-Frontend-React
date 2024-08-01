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
      console.log(res.data.answer);
      const botResponse =
        res.data.answer.trim() === "I don't know."
          ? "Sorry! I don't have knowledge regarding this."
          : res.data.answer;
      setMessages([
        ...messages,
        { text: userInput, isUser: true },
        { text: botResponse, isUser: false },
      ]);
    } catch (error) {
      setMessages([
        ...messages,
        { text: userInput, isUser: true },
        {
          text: "There might be some error in generating response. Please try again later.",
          isUser: false,
        },
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
      <div className="h-full flex flex-col p-4">
        <header className="bg-gray-900 text-white p-4 rounded-t-lg">
          <h1 className="text-2xl font-bold">Chatbot</h1>
          <p className="text-sm">Ask me questions and I'll try to help!</p>
        </header>
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

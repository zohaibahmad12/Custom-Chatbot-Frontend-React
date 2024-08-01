import { useEffect } from "react";
import Message from "./Message";
import Loader from "./Loader";

const MessageList = ({ messages, loading, chatEndRef }) => {
  useEffect(() => {
    if (messages?.length > 0 && !messages[messages.length - 1]?.isUser) {
      const msg = new SpeechSynthesisUtterance();
      msg.text = messages[messages.length - 1]?.text;
      console.log("called");
      window.speechSynthesis.speak(msg);
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-auto p-4 bg-gray-400">
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
  );
};

export default MessageList;

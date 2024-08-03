import { useEffect } from "react";
import Message from "./Message";
import Loader from "./Loader";
import { memo } from "react";
import { ThreeDot } from "react-loading-indicators";
const MessageList = ({ messages, loading, chatEndRef }) => {
  console.log("Message List execute");
  useEffect(() => {
    if (messages?.length > 0 && !messages[messages.length - 1]?.isUser) {
      const msg = new SpeechSynthesisUtterance();
      msg.text = messages[messages.length - 1]?.text;
      window.speechSynthesis.speak(msg);
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-auto p-4 bg-gray-100">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
        >
          <Message msg={msg} />
        </div>
      ))}
      {loading && (
        <ThreeDot color="#3169cc" size="small" text="" textColor="blue" />
      )}
      <div ref={chatEndRef} />
    </div>
  );
};

export default memo(MessageList);

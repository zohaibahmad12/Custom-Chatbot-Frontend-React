import Message from "./Message";
import Loader from "./Loader";

const MessageList = ({ messages, loading, chatEndRef }) => {
  return (
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
  );
};

export default MessageList;

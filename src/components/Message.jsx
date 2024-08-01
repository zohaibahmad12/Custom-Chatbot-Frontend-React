import { memo } from "react";
const Message = ({ msg }) => {
  console.log("Message execute");
  return (
    <div
      className={`p-3 rounded-lg ${
        msg.isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
      } max-w-xs`}
    >
      {msg.text}
    </div>
  );
};
export default memo(Message);

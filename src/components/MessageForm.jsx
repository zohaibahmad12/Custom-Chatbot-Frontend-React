import { useEffect } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane } from "react-icons/fa";
const MessageForm = ({ userInput, setUserInput, handleSubmit, loading }) => {
  const { text, isRecording, startRecording, stopRecording } =
    useSpeechRecognition();

  useEffect(() => {
    setUserInput(text);
  }, [text]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-4 bg-gray-800 shadow-md"
    >
      <textarea
        value={userInput}
        maxLength={200}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your question here..."
        className="w-full p-3 border border-transparent rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out resize-none"
        rows={1}
        maxRows={2}
      />
      <button
        type="button"
        onClick={isRecording ? stopRecording : startRecording}
        className={
          isRecording
            ? "ml-3 py-2 px-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
            : "ml-3 py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
        }
      >
        {isRecording ? (
          <FaMicrophoneSlash size={20} />
        ) : (
          <FaMicrophone size={20} />
        )}
      </button>
      <button
        type="submit"
        className={
          userInput.trim() === "" || loading
            ? "ml-3 py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md cursor-not-allowed opacity-50"
            : "ml-3 py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-orange-700 transition duration-300 ease-in-out"
        }
        disabled={userInput.trim() === ""}
      >
        <FaPaperPlane size={20} />
      </button>
    </form>
  );
};

export default MessageForm;

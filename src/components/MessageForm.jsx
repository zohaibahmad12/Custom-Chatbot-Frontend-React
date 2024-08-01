import { useState } from "react";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const MessageForm = ({ userInput, setUserInput, handleSubmit, loading }) => {
  recognition.continuous = true;
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    setUserInput("");
    recognition.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognition.stop();
  };

  recognition.onresult = (event) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      interimTranscript += event.results[i][0].transcript;
    }
    setUserInput((prevUserInput) => prevUserInput + interimTranscript);
  };

  recognition.onend = () => {
    if (isRecording) {
      recognition.start();
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setIsRecording(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-4 bg-gray-800 rounded-b-lg shadow-md"
    >
      <input
        type="text"
        value={userInput}
        maxLength={120}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your question here..."
        className="w-full p-3 border border-transparent rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300 ease-in-out"
      />
      <button
        type="submit"
        className={
          userInput.trim() === "" || loading
            ? "ml-3 py-2 px-4 bg-orange-600 text-white rounded-lg shadow-md cursor-not-allowed opacity-50"
            : "ml-3 py-2 px-4 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition duration-300 ease-in-out"
        }
        disabled={userInput.trim() === ""}
      >
        Send
      </button>
      <button
        type="button"
        onClick={isRecording ? stopRecording : startRecording}
        className={
          isRecording
            ? "ml-3 py-2 px-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
            : "ml-3 py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
        }
      >
        {isRecording ? "StopRec" : "StartRec"}
      </button>
    </form>
  );
};

export default MessageForm;

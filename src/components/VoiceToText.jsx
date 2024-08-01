import React, { useState, useRef } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const VoiceToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  recognition.continuous = true; // Ensure continuous recognition

  const startRecording = () => {
    setIsRecording(true);
    setTranscript("");
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
    setTranscript((prevTranscript) => prevTranscript + interimTranscript);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <button
        className={`p-4 rounded-lg shadow-md text-white ${
          isRecording ? "bg-red-500" : "bg-green-500"
        }`}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <p className="mt-4 text-lg bg-white p-4 rounded-lg shadow-md">
        {transcript || "Your transcribed text will appear here..."}
      </p>
    </div>
  );
};

export default VoiceToText;

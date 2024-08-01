// useSpeechRecognition.js
import { useState, useEffect } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    recognition.continuous = true;

    const handleResult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        interimTranscript += event.results[i][0].transcript;
      }
      setTranscript((prevTranscript) => prevTranscript + interimTranscript);
    };

    const handleEnd = () => {
      if (isRecording) {
        recognition.start();
      }
    };

    const handleError = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.addEventListener("result", handleResult);
    recognition.addEventListener("end", handleEnd);
    recognition.addEventListener("error", handleError);

    return () => {
      recognition.removeEventListener("result", handleResult);
      recognition.removeEventListener("end", handleEnd);
      recognition.removeEventListener("error", handleError);
    };
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setTranscript("");
    recognition.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognition.stop();
  };

  return { isRecording, transcript, startRecording, stopRecording };
};

export default useSpeechRecognition;

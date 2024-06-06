"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useAssistant } from "ai/react";
import { useSearchParams } from "next/navigation";
import ChatMessages from "@/components/chat/chat-messages";
import FileUploadStatus from "@/components/chat/file-upload-status";
import PromptForm from "@/components/chat/prompt-form";
import { FooterText } from "@/components/footer";

function ChatComponent() {
  const searchParams = useSearchParams();
  const [thread, setThread] = useState(searchParams.get("threadId") || null);

  const {
    status,
    threadId,
    messages,
    input,
    submitMessage,
    handleInputChange,
    error,
    stop,
  } = useAssistant({ api: "/api/assistant", threadId: thread });

  // console.log("Thread ID:", threadId);

  const [file, setFile] = useState(null);
  const [fileUploadStatus, setFileUploadStatus] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  const handleFileUpload = async () => {
    console.log(threadId);
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("threadId", threadId);

    setFileUploadStatus("Uploading...");
    setFileName(file.name); // Set the file name

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const result = await response.json();
      console.log("File uploaded:", result);
      setFileUploadStatus("Upload successful!");
      console.log("File upload response:", result); // Log the response from the API

      // Show the response at the top of the chat box
      setFileUploadStatus("Upload successful!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setFileUploadStatus("Upload failed.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitMessage(e);
    }
  };

  useEffect(() => {
    const mssgContainer = document.getElementById("message-container");
    if (mssgContainer) {
      mssgContainer.scrollTo({
        top: mssgContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div>
      <div
        id="message-container"
        className="flex flex-col m-2 h-full justify-between"
      >
        <ChatMessages messages={messages} error={error} status={status} />
      </div>
      <section className="fixed my-2  bottom-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
        <div className=" bg-white/90 w-full duration-300 ease-in-out peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] dark:from-10% z-50">
          <div className="mx-auto sm:max-w-2xl sm:px-4">
            <div className="grid gap-4 sm:pb-4">
              <FileUploadStatus
                fileUploadStatus={fileUploadStatus}
                fileName={fileName}
              />
              <PromptForm
                status={status}
                input={input}
                handleInputChange={handleInputChange}
                submitMessage={submitMessage}
                handleKeyDown={handleKeyDown}
                fileRef={fileRef}
                setFile={setFile}
              />
              <FooterText />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Chat() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatComponent />
    </Suspense>
  );
}

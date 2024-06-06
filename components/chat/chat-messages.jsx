"use client";

import { ChatMessage } from "./chat-message";

const ChatMessages = ({ messages, error, status }) => {
  return (
    <div id="message-container" className="p-6 my-20 ">
      {error && (
        <div className="px-6 py-4 max-w-xl text-white bg-red-500 rounded-md">
          <span className="block sm:inline">Error: {error.toString()}</span>
        </div>
      )}

      {messages.length > 0 && (
        <div className="max-w-xl mx-auto ">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
        </div>
      )}

      {status === "in_progress" && (
        <div className="max-w-xl mx-auto">
          <div className="w-full h-2 p-2 mb-2 ml-12 bg-gray-300 rounded-lg dark:bg-gray-600 animate-pulse" />
          <div className="w-full h-2 p-2 ml-12 bg-gray-300 rounded-lg dark:bg-gray-600 animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default ChatMessages;

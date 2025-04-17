"use client";	

import { Message } from "@/types/types";

function Messages({ 
	messages, 
	chatBotName 
} : {
	messages: Message[];
	chatBotName: string;
}) {
  return (
	<div>
	  {messages.map((message) => {
		const isSender = message.sender !== "user";
		return (
		<div 
		key={message.id}
		className={`chat ${isSender ? "chat-start" : "chat-end"}
		relative `}>
		</div>
	  )})}
	</div>
  );
}

export default Messages

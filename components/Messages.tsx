"use client";	

import { Message } from "@/types/types";
import { usePathname } from "next/navigation";

function Messages({ 
	messages, 
	chatBotName 
} : {
	messages: Message[];
	chatBotName: string;
}) {

	const path = usePathname();
	const isReviewsPage = path.includes("review-sessions");
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

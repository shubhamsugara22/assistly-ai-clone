"use client";	

import { Message } from "@/types/types";
import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import { UserCircle } from "lucide-react";

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
			{isReviewsPage && (
				<p className="absolute -bottom-5 text-xs text-gray-300">
					sent {new Date(message.created_at).toLocaleString()}
				</p>
			)}

				<div className={`chat-image avatar w-10 ${!isSender &&
					"-mr-4"}`}>
					{isSender ? (
						<Avatar
						  seed={chatBotName}
						  className="h-12 w-12 bg-white rounded-full border-2 border-[#2991EE]"
						  />
					) : (
						<UserCircle className="text-[#2991EE]"/>
					)}
			</div>
			<p
			 className={`chat-bubble text-white ${
			 isSender
			  ? "chat-bubble-primary bg-[#4D7DFB]"
			  : "chat-bubble-secondary bg-gray-200 text-gray-700 " 
			}`}
			>
				{message.content}
			 </p>
		</div>
	  )})}
	</div>
  );
}

export default Messages

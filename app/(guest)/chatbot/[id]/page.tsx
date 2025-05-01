'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

import { Message } from "postcss";
import { useState } from "react";


function ChatbotPage({ params: { id } }: { params: { id: string } }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [chatId, setChatId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessages] = useState<Message[]>([]);

	return (
	<div>
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:maz-w-[425px]">
				<form>
					
				</form>

			</DialogContent>

		</Dialog>
	  Chatbotpage {id} 
	</div>
  )
}

export default ChatbotPage

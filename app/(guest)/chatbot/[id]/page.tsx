'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";


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
			<DialogContent className="sm:max-w-[425px]">
				<form>
				<DialogHeader>
					<DialogDescription>
						I just need a few details to get started.
					</DialogDescription>
				</DialogHeader>

				<div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
						 id="name"
						 value={name}
						 onChange={(e) => setName(e.target.value)}
						 placeholder="John doe"
						 className="col-span-3"
						 />
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Email
						</Label>
						<Input
						 id="username"
						 type="email"
						 value={name}
						 onChange={(e) => setName(e.target.value)}
						 placeholder="John@appleseed.com"
						 className="col-span-3"
						 />
					</div>
				</div>
			</form>
			</DialogContent>
		</Dialog>
	</div>
  )
}

export default ChatbotPage

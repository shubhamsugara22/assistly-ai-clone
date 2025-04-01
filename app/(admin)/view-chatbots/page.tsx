import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";

import { GET_CHATBOT_BY_USER } from "@/graphql/queries/queries";
import { serverClient  } from "@/lib/server/serverClient";

import {
	Chatbot,
	GetChatbotsByUserData,
	GetChatbotsByUserDataVariables
}
 from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function ViewChatbots() {
	const {userId} = await auth();
	if (!userId) return;

	// get the chatbots for user

	const {
		data: { chatbotsByUser },
	} = await serverClient.query<
	GetChatbotsByUserData,
	GetChatbotsByUserDataVariables
	>({
		query: GET_CHATBOT_BY_USER,
		variables : {
			clerk_user_id: userId,
		},
	});
    const sortedChatbotsByUser: Chatbot[] = [...chatbotsByUser].sort(
		(a, b) =>
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	);	
  return (
	<div>
		<h1 className="text-xl lg:text-3xl font-semibold mb-5">
			Active Chatbots
		</h1>
	</div>
  )
}

export default ViewChatbots

import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";

import { GET_CHATBOT_BY_USER } from "@/graphql/queries/queries";
import { serverClient  } from "@/lib/server/serverClient";

import {
	Chatbot,
	GetChatbotdByUserData,
	GetChatbotsByUserDataVariables
}
 from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import  Link  from "next/link";

export const dynamic = "force-dynamic";

async function ViewChatbots() {
	const {userId} = await auth();
	if (!userId) return;

	// get the chatbots for user

	const {data} = await serverClient.query<>({
		query: GET_CHATBOT_BY_USER
		variables: {},
	});
	
  return (
	<div>
	  
	</div>
  )
}

export default ViewChatbots

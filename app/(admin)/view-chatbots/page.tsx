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

function ViewChatbots() {
  return (
	<div>
	  
	</div>
  )
}

export default ViewChatbots

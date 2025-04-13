import { GET_USER_CHATBOTS } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import { auth } from "@clerk/nextjs/server";
import  ChatBotSessions  from "@/components/ChatBotSessions";
import { Chatbot , GetUserChatbotsResponse , GetUserChatbotsVariables } from "@/types/types";

async function ReviewSessions() {
	const { userId } = await auth();
	if (!userId) return;

	const {
		data: { chatbotsByUser },
	} = await serverClient.query<
	GetUserChatbotsResponse,
	GetUserChatbotsVariables 
  >({
	query: GET_USER_CHATBOTS,
	variables: { userId: userId }
  });

  const sortedChatbotsByUser: Chatbot[] = 
   chatbotsByUser?.map((chatbot) => ({
	...chatbot,
	chat_sessions: [...chatbot.chat_sessions].sort(
		(a, b) =>
			// sort in ascending order 
		new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	)
}));
	  return (
	<div>
	 <h1 className="text-xl lg:text-3xl font-semibold mt-10">
		Chat sessions </h1>
	 <h2 className="mb-5">
		Review all the chat session that chat bots have had with your customers
		</h2>
		<ChatBotSessions chatbots={sortedChatbotsByUser} />
	</div>
  )
}

export default ReviewSessions

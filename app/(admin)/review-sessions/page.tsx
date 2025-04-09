import { GET_USER_CHATBOTS } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import { auth } from "@clerk/nextjs/server";
import { GetUserChatbotsResponse , GetUserChatbotsVariables } from "@/types/types";

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
	variables: { userId: userId}
  });

	}
	  return (
	<div>
	  ReviewSessions
	</div>
  )
}

export default ReviewSessions

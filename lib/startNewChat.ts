import client from "@/graphql/apolloClient";
import { INSERT_GUEST , INSERT_CHAT_SESSION, INSERT_MESSAGE } from "@/graphql/mutations/mutations";
import { gql } from "@apollo/client";

async function startNewChat(
	guestName: string,
	guestEmail: string,
	chatbotId: number
) {
	try {
	// 1. Create a new guest entry
	const guestResult = await client.mutate({
		mutation:INSERT_GUEST,
	    variables: {name: guestName, email: guestEmail },
	});
	const guestId = guestResult.data.insertGuests.id;

	// 2. Intialize a new chat session

	const chatSessionResult = await client.mutate({
		mutation: INSERT_CHAT_SESSION,
		variables: { chatbot_id: chatbotId , guest_id: guestId},
	})
	const chatSessionId = chatSessionResult.data.insertChat_sessions.id;

	//3. Insert Initial message(optional)

	await client.mutate({
		mutation: INSERT_MESSAGE,
		variables: {
			chat_session_id : chatSessionId,
			sender: "ai",
			content: "welcome ${guestname}!\n how can i assist you today ?",
		},
	});

	} catch(error) {
		console.error("Error starting new chat session", error)
	}
}

export default startNewChat;
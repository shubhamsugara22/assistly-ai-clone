import client from "@/graphql/apolloClient";
import { INSERT_MESSAGE } from "@/graphql/mutations/insertMessage";
import { gql } from "@apollo/client";

async function startNewChat(
	guestName: string,
	guestEmail: string,
	chatbotId: number
) {
	try {

	} catch(error) {
		console.error("Error starting new chat session", error)
	}
}
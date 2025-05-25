import { GET_CHATBOT_BY_I, GET_MESSAGES_BY_CHAT_SESSION_ID } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import { GetChatbotByIdResponse, MessagesByChatSessionIdResponse } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs"

const openai =new OpenAI ({
	apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: NextRequest) {

	const { chat_session_id, chatbot_id, content, name } = await req.json();

	console.log(
		`Received message from chat session ${chat_session_id}: ${content} {chatbot: ${chatbot_id}}`
	);
    try {
		//Step 1: Fetch chatbot charateristics
		const { data } = await serverClient.query<GetChatbotByIdResponse>({
			query: GET_CHATBOT_BY_ID,
			variables: { id: chatbot_id},
		}); 
		const chatbot = data.chatbots;
		if (!chatbot) {
			return NextResponse.json({ err: "Chatbot not found"}, { status: 404 });
		}
    // Step 2:  Fetch previous messages

	const { data: messageData } = 
	await serverClient.query<MessagesByChatSessionIdResponse>({
		query: GET_MESSAGES_BY_CHAT_SESSION_ID,
		variables: { chat_session_id }
		fetchPolicy: "no-cache"
	});

	const previousMessages = messageData.chat_session_messages;

	const formattedPreviousMessages: ChatCompletionMessageParam[] =
	previousMessages.map((message) => ({
		role: message.sender === "ai" ? "system" : "user",
		name: message.sender === "ai" ? "system" : name,
		content: message.content
	}));

	//Combine charateristics into a system prompt
	const systemPrompt = chatbot.chat_characteristics
	.map((c) => c.content)
	.join(" + ");

	console.log(systemPrompt)

	const messages: ChatCompletionMessageParam[] = [
		{
			role: "system",
			name: "system",
			content: `Your are a helpful assisstant talking to  ${name}. If a generic question is asked which is not relevant or in the same scope 
			or domain as the points in mentioned in the key information section, kindly inform the user thetre only  allowed to search for the 
			specified content, Use Emoji's where possible. Here is some key information that you need to be aware of ,these are elements you may be asked
			about ${systemPrompt}`,
		},
		...formattedPreviousMessages,
		{
			role: "user",
			name: name,
			content: content,
		};
	]
    
	// Step 3: Send the message to OpenAI's Completions API

	const openaiResponse = await openai.chat.completions.create({
		messages: messages,
		model: "gpt-4o",
	});

	const aiResponse = openaiResponse?.choices?.[0]?.message?.content?.trim();

	} catch (error) {
		console.error("Erro sending message:", error);
		return NextResponse.json({ error }, { status: 500 });
	}

}

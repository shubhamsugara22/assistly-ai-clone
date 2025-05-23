import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai =new OpenAI ({
	apikey: process.env.OPENAI_API_KEY,
});
export async function POST(req: NextRequest) {

	const { chat_session_id, chatbot_id, content, name } = await req.json();

	console.log(
		`Received message from chat session ${chat_session_id}: ${content} {chatbot: ${chatbot_id}}`
	);
	

}

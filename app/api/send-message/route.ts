import { INSERT_MESSAGE } from "@/graphql/mutations/mutations";
import { GET_CHATBOT_BY_ID, GET_MESSAGES_BY_CHAT_SESSION_ID } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import { GetChatbotByIdResponse, MessagesByChatSessionIdResponse } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import {GoogleGenAI} from '@google/genai';

// const openai =new OpenAI ({
// 	apiKey: process.env.OPENAI_API_KEY,
// });
const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
});

// ...existing imports...

export async function POST(req: NextRequest) {

    const { chat_session_id, chatbot_id, content, name, created_at } = await req.json();

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

    const { data: messagesData } = 
    await serverClient.query<MessagesByChatSessionIdResponse>({
        query: GET_MESSAGES_BY_CHAT_SESSION_ID,
        variables: { chat_session_id },
        fetchPolicy: "no-cache"
    });
    console.log("messageData:", messagesData);

    // Defensive: handle possible array structure
    const previousMessages = Array.isArray(messagesData?.chat_sessions)
      ? messagesData.chat_sessions[0]?.messages || []
      : messagesData?.chat_sessions?.messages || [];

    const formattedPreviousMessages: ChatCompletionMessageParam[] =
    previousMessages.map((message) => ({
        role: message.sender === "ai" ? "system" : "user",
        name: message.sender === "ai" ? "system" : name,
        content: message.content
    }));

    //Combine charateristics into a system prompt
    const systemPrompt = chatbot.chatbot_characteristics
    .map((c) => c.content)
    .join(" + ");

    console.log(systemPrompt)
    // Initialize a chat model

       const messages: ChatCompletionMessageParam[] = [
        {
            role: "system",
            name: "system",
            content: `Your are a helpful assistant talking to ${name}. If a generic question is asked which is not relevant or in the same scope 
            or domain as the points in mentioned in the key information section, kindly inform the user they're only allowed to search for the 
            specified content. Use Emoji's where possible. Here is some key information that you need to be aware of, these are elements you may be asked
            about: ${systemPrompt}`,
        },
        ...formattedPreviousMessages,
        {
            role: "user",
            name: name,
            content: content,
        },
    ];
    
    // Gemini expects: [{role, parts: [{text}]}]
    const geminiMessages = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
    }));

    const geminiResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: geminiMessages,
    });

    const aiResponse = geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if(!aiResponse) {
        return NextResponse.json(
            { error: "Failed to generate AI response" },
            { status: 500 }
        );
    }

    // Step 4 : Save the user message in the database

    await serverClient.mutate({
        mutation: INSERT_MESSAGE,
        variables: { chat_session_id, content, sender: "user", created_at },
    });

    // Step 5: Save the AI response in the database

    const aiMessageResult = await serverClient.mutate({
        mutation: INSERT_MESSAGE,
        variables: { chat_session_id, content: aiResponse, sender: "ai", created_at },
    });
    return NextResponse.json({
        id: aiMessageResult.data.insertMessages.id,
        content: aiResponse
    });

    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json({ error }, { status: 500 });
    }

}
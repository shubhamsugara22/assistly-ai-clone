export interface Chatbot {
    chatbot_characteristics : ChatbotCharecteristics[];
    clerk_user_id: string;
    created_at: string;
    id: number;
    name: string;
    chat_sessions: ChatSession[];
  }
  export interface ChatbotCharecteristics {
    id: number;
    chatbot_id: string;
    content: string;
    created_at: string;
  }
  export interface Guest {
    id: number;
    name: string;
    email: string;
    created_at: string;
  }
  export interface ChatSession {
    id: number;
    chatbot_id: number;
    guest_id: number | null;
    created_at: string;
    message: Message[];
    guests: Guest;
  }
  export interface Message {
    id: number;
    chat_session_id: number;
    content: string;
    created_at: string;
    sender:  "ai" | "user";
  }
  export interface GetChatbotByIdResponse {
    chatbots: Chatbot;
  }
  export interface GetChatbotByIdVariables {
    id: string;
  }
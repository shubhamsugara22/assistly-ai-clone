export interface Chatbot {
    chatbot_characteristics : ChatbotCharecteristics[];
    clerk_user_id: string;
    created_at: string;
    id: number;
    name: string;
    chat_sessions: ChatSession[];
  }
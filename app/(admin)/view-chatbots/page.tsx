import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";

import { GET_CHATBOT_BY_USER } from "@/graphql/queries/queries";
import { serverClient  } from "@/lib/server/serverClient";

import {
	Chatbot,
	GetChatbotByUserData,
	GetChatbotByUserDataVariables
}
 from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function ViewChatbots() {
	const { userId } = await auth();
	if (!userId) return;

	// get the chatbots for user

	const {
		data: { chatbotsByUser },
	} = await serverClient.query<
	GetChatbotByUserData,
	GetChatbotByUserDataVariables
	>({
		query: GET_CHATBOT_BY_USER,
		variables : {
			clerk_user_id: userId,
		},
	});
    const sortedChatbotsByUser: Chatbot[] = [...chatbotsByUser].sort(
		(a, b) =>
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	);	
	console.log(sortedChatbotsByUser);
  return (
	<div className="flex-1 pb-20 p-10">
		<h1 className="text-xl lg:text-3xl font-semibold mb-5">
			Active Chatbots
		</h1>

		{sortedChatbotsByUser.length === 0 && (
			<div>
				<p>
					You have not created any chatbots yet, Click on button
					below to create one.
				</p>
				<Link href="/create-chatbot">
				    <Button className="bg-[#64b5F5] text-white p-3 rounded-md
					mt-5">
					    Create Chatbot
					</Button>
				</Link>
			</div>
		)}
		<ul>
			{sortedChatbotsByUser.map((chatbot) => (
				<Link key={chatbot.id} href={`/edit-chatbots/${chatbot.id}`}>
					<li>
						<div>
							
						</div>
					</li>
				</Link>
			))}
		</ul>
	</div>
  )
}

export default ViewChatbots

"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect , useState } from "react";
import { BASE_URL } from "@/graphql/apolloClient";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import Avatar from "@/components/Avatar";
import { useMutation , useQuery} from "@apollo/client";
import { GET_CHATBOT_BY_ID } from "@/graphql/queries/queries";
import { GetChatbotByIdResponse, GetChatbotByIdVariables } from "@/types/types";


function EditChatbot( { id } :  { id: string } ) {
	const [url ,setUrl] = useState<string>("");
	const [chatbotName, setChatbotName] = useState<string>("");

	const {data, loading, error } = 
	useQuery<GetChatbotByIdResponse, GetChatbotByIdVariables>(
		GET_CHATBOT_BY_ID,
		{ variables: { id } }
	);
	useEffect(() => {
		if (data) {
			setChatbotName(data.chatbots.name);
		}
	}, [data]);

	useEffect(() => {
		const url = `${BASE_URL}/chatbot/${id}`;

		setUrl(url);
	}, [id]);
  return (
	<div className="px-10 md:p-10">
		<div className="md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-[#2991EE]">
			<h2 className="text-white text-sm font-bold">Link to Chat</h2>
			<p className="text-sm italic text-white"> 
				Share this link with your customers to start conversations with your chatbot</p>
		<div className="flex flex-center space-x-2">
            <Link href={url} className="w-full cursor-pointer hover:opacity-50">
			<Input value={url} readOnly className="cursor-pointer" />
			</Link>
			<Button
			  size="sm"
			  className="px-3"
			  onClick={() => {
				navigator.clipboard.writeText(url);
				toast.success("Copied to clipboard");
			  }}
			>
				<span className="sr-only">Copy</span>
				<Copy className="h-4 w-4" />
			</Button>
		</div>
	</div>
	<section className="relative mt-5 bg-white p-5 md:p-10 rounded-lg">
		<Button
		 variant="destructive" 
		 className="absolute top-2 right-2 h-8 w-2"
		 // onClick={ () => handleDelete(id)}
		>X</Button>

		<div className="flex space-x-4">
			<Avatar seed={chatbotName}/>
			<form 
			      //onSubmit={handleUpdateChatbot}
			      className="flex flex-l space-x-2 items-center"
			>
				<Input 
				value={chatbotName}
				onChange={(e) => setChatbotName(e.target.value)}
				placeholder={chatbotName}
				className="max-w-lg" 
				required
				/>
				<Button type="submit" disabled={!chatbotName}>
					Update</Button>
			</form>
		</div> 
	</section>
</div>
  )
}

export default EditChatbot

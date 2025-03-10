import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Nextrequest){
	const { query, variables } = await request.json();

	try {
        if (query.trim().startsWith("mutation")) {
			// Handle mutation
		} else {
         // Handle Queries
		}
	} catch (error)  {

	}

}
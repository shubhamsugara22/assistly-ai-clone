import { serverClient } from "@/lib/server/serverClient";
import { NextRequest, NextResponse } from "next/server";
import { gql } from "@apollo/client";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET,POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest){
	const { query, variables } = await request.json();

	try {
		let result;

        if (query.trim().startsWith("mutation")) {
			// Handle mutation
			result = await serverClient.mutate({
				mutation: gql`
				${query}
				`,
				variables,
			});
		} else {
			result = await serverClient.query({
				query: gql`
				${query}
				`,
				variables,
			}); 
		}

		const data = result.data;
		return NextResponse.json({
			data,
		}, {
			headers: corsHeaders,
		}
		);
	} catch (error)  {
		console.log(error);
		return NextResponse.json(error, {
			status: 500,
		});
	}
}
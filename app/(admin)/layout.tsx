import React from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar';
import { redirect } from 'next/navigation';
import  { auth } from "@clerk/nextjs/server";

async function AdminLayout({
	children,
  }: Readonly<{
	children: React.ReactNode;
  }>) {
	const { userId } =  await auth();
	if (!userId) {
		return redirect("/login");
	}

  return (
	<div className='flex flex-col flex-1'>
		<Header />
		<div className='flex flex-col flex-1 lg:flex-row bg-gray-100'>
			<Sidebar />
			<div className='flex-1 flex justify-center lg:justify-start items-start max-w-5xl mx-auto w-full'>
				{children}
			</div>
		</div>
	</div>
  )
}

export default AdminLayout

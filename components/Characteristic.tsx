'use client'
import { REMOVE_CHARACTERISTIC } from '@/graphql/mutations/mutations';
import { ChatbotCharacteristics } from '@/types/types'
import { useMutation } from '@apollo/client';
import { OctagonX } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

function Characteristic({
	characteristic,
} : {
	characteristic: ChatbotCharacteristics;
 }) {

	const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC, {
		refetchQueries: ["GetChatbotById"],
	});
	
	const handleRemoveCharacteristic = async (characteristicId: number) => {
		try {
			await removeCharacteristic({
				variables: {
					characteristicId : characteristic.id,
				},
			});
		} catch (err) {
			console.error("Failed to remove characteristic:", err);
		}
	}
  return (
  <li 
  key={characteristic.id} 
  className='relative p-10 bg-white border rounded-md'>

	{characteristic.content}
	<OctagonX 
	className="w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50"
	onClick={() => {
		const promise = handleRemoveCharacteristic(characteristic.id);
		toast.promise(promise, {
			loading: "Removing..",
			success: "Characteristic removed",
			error: "Failed to remove characteristic",
		});
	}}
	/>
  </li>
  );
}

export default Characteristic

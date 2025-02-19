import Image from "next/image";
import { createAvatar } from "@dicebear/core";
import { rings } from '@dicebear/collection';

function Avatar({ seed, className }: { seed: string, className: string }) {
  const  avatar = createAvatar(rings, {
	seed,
	// ... other options
  });

  const svg = avatar.toString();
	return (
	<Image
	
	/>
  )
}

export default Avatar

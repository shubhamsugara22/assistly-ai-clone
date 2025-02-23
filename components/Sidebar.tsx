import Link from "next/link";

function Sidebar() {
  return (
	<div>
		<ul>
			<li>
				<Link href='/create-chatbot'>Link</Link>
			</li>
			<li>
				<Link href='/view-chatbots'>link</Link>
			</li>
			<li>
				<Link href='/review-sessions'>link</Link>
			</li>
		</ul>
	  
	</div>
  )
}

export default Sidebar

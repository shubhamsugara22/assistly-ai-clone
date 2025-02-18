import Link from 'next/link'

function Header() {
  return (
	<header>
		<Link href="/">
		{/* Avatar */}
		<div>
		    <h1>Assistly</h1>
		    <h2 className='text-sm'>Your Customisable AI Chat Agent</h2>
		</div>
		    </Link>
	  
	</header>
  )
}

export default Header

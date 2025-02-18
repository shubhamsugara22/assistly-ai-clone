import React from 'react'

function AdminLayout({
	children,
  }: Readonly<{
	children: React.ReactNode;
  }>) {
  return (
	<div>
		{/* Header */}
		<div>
			{/* SideBar */}
			<div>
				{children}
			</div>
		</div>
	</div>
  )
}

export default AdminLayout

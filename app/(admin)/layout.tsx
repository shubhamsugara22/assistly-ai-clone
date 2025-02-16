import React, { Children } from 'react'

function AdminLayout() {
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

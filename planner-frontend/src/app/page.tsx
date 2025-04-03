'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Home = () => {
	const { push } = useRouter()

	useEffect(() => {
		push('/i/tasks')
	}, [])

	return <div></div>
}

export default Home

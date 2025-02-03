"use client";

import { useRouter } from "next/navigation";

const Home = () => {
	const { push } = useRouter();
	push("/i/tasks");
	return <div></div>;
};

export default Home;

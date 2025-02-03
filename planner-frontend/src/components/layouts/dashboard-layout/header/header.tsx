"use client";

import { useProfile } from "@/hooks/useProfile";
import GlobalLoader from "./global-loader";
import s from "./header.module.scss";

type HeaderProps = {
	title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
	const { data, isLoading } = useProfile();

	return (
		<header className={s.header}>
			<GlobalLoader />
			{isLoading ? (
				""
			) : (
				<>
					<h1 className="text-2xl font-bold text-white ml-4">
						{title}
					</h1>
					<div className="text-white mr-4">
						<p>{data ? data.user.email : "Email"}</p>
						<p>{data ? data.user.name : "Name"}</p>
					</div>
				</>
			)}
		</header>
	);
};

export default Header;

"use client";

import { AuthService } from "@/services/auth.service";
import { LogOut, NotepadText } from "lucide-react";
import { useRouter } from "next/navigation";
import Menu from "./menu/menu";
import s from "./sidebar.module.scss";

const Sidebar = () => {
	const router = useRouter();

	const handleLogout = async () => {
		const response = await AuthService.logout();

		if (response.data === true) {
			router.replace("/auth");
		}
	};

	return (
		<div className={s.sidebar}>
			<div className={s.sidebar_title_container}>
				<NotepadText />
				<h1 className="text-3xl font-bold text-black ml-2">
					MY PLANNER
				</h1>
			</div>
			<div className="h-0.5 bg-black w-full mb-12 mt-2"></div>
			<Menu />
			<LogOut className={s.logout_icon} onClick={() => handleLogout()} />
		</div>
	);
};

export default Sidebar;

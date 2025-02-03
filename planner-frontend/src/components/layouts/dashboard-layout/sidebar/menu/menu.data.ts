import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { AlarmClockCheck, BookCheck, Settings } from "lucide-react";
import { IMenuItem } from "./menu.interface";

export const MENU: IMenuItem[] = [
	{
		name: "Tasks",
		link: DASHBOARD_PAGES.TASKS,
		icon: BookCheck,
	},
	{
		name: "Pomodoro",
		link: DASHBOARD_PAGES.POMODORO,
		icon: AlarmClockCheck,
	},
	{
		name: "Settings",
		link: DASHBOARD_PAGES.SETTINGS,
		icon: Settings,
	},
];

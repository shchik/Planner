import PomodoroView from "@/app/i/pomodoro/pomodoro";
import Header from "@/components/layouts/dashboard-layout/header/header";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Pomodoro",
};

const Pomodoro: React.FC = () => {
	return (
		<>
			<Header title="Pomodoro" />
			<PomodoroView />
		</>
	);
};

export default Pomodoro;

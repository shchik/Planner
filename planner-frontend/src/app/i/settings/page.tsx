import Header from "@/components/layouts/dashboard-layout/header/header";
import { Metadata } from "next";
import SettingsView from "./settings";

export const metadata: Metadata = {
	title: "Settings",
};

const SettingsPage: React.FC = () => {
	return (
		<>
			<Header title="Settings" />
			<SettingsView />
		</>
	);
};

export default SettingsPage;

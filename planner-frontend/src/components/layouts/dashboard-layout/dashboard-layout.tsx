import Sidebar from "@/components/layouts/dashboard-layout/sidebar/sidebar";
import { PropsWithChildren } from "react";
import s from "./dashboard-layout.module.scss";

const DashBoardLayout: React.FC<PropsWithChildren<unknown>> = ({
	children,
}) => {
	return (
		<>
			<Sidebar />
			<main className={s.dashboard_layout}>{children}</main>
		</>
	);
};

export default DashBoardLayout;

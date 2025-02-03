import DashBoardLayout from "@/components/layouts/dashboard-layout/dashboard-layout";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <DashBoardLayout>{children}</DashBoardLayout>;
};

export default Layout;

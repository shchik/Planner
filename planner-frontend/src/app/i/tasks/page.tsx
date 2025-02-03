import TasksView from "@/app/i/tasks/tasks";
import Header from "@/components/layouts/dashboard-layout/header/header";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Tasks",
};

const TaskPage: React.FC = () => {
	return (
		<>
			<Header title="Tasks"></Header>
			<TasksView></TasksView>
		</>
	);
};

export default TaskPage;

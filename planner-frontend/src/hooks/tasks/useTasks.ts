import { TaskService } from "@/services/task-service";
import { ITaskResponse } from "@/types/task.types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function useTasks() {
	const taskService = new TaskService();

	const { data } = useQuery({
		queryKey: ["getTasks"],
		queryFn: () => taskService.getAllTasks(),
	});

	const [tasks, setTasks] = React.useState<ITaskResponse[]>();
	React.useEffect(() => {
		if (data?.data) {
			setTasks(data.data.filter(task => !task.isCompleted));
		}
	}, [data]);

	return { tasks, setTasks };
}

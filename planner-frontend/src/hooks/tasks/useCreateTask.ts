import { TaskService } from "@/services/task-service";
import { ITaskCreateData } from "@/types/task.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTask() {
	const taskService = new TaskService();
	const queryClient = useQueryClient();

	const { mutate: createTask } = useMutation({
		mutationKey: ["createTask"],
		mutationFn: (data: ITaskCreateData) => taskService.addTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["getTasks"],
			});
		},
	});

	return createTask;
}

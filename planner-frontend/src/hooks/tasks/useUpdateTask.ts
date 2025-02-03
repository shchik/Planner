import { TaskService } from "@/services/task-service";
import { ITaskUpdateData } from "@/types/task.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTask() {
	const taskService = new TaskService();
	const queryClient = useQueryClient();

	const { mutate: updateTask } = useMutation({
		mutationKey: ["updateTask"],
		mutationFn: (data: ITaskUpdateData) => taskService.updateTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["getTasks"],
			});
		},
	});

	return updateTask;
}

import { TaskService } from "@/services/task-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTask() {
	const taskService = new TaskService();
	const queryClient = useQueryClient();

	const { mutate: deleteTask } = useMutation({
		mutationKey: ["deleteTask"],
		mutationFn: (id: number) => taskService.deleteTask(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["getTasks"],
			});
		},
	});

	return deleteTask;
}

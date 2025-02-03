import { PomodoroTimerService } from "@/services/pomodoro-timer-service";
import { IPomodoroTimerUpdateData } from "@/types/pomodoro-timer.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTimer() {
	const pomodoroTimerService = new PomodoroTimerService();
	const queryClient = useQueryClient();

	const { mutate: updateTimer } = useMutation({
		mutationKey: ["update timer"],
		mutationFn: (data: IPomodoroTimerUpdateData) =>
			pomodoroTimerService.updatePomodoroTimer(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["get timer"],
			});
		},
	});

	return { updateTimer };
}

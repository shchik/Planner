import { PomodoroSettingsService } from "@/services/pomodoro-settings-service";
import { IPomodoroSettingsUpdateData } from "@/types/pomodoro-settings.types";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUpdateSettings() {
	const pomodoroSettingsService = new PomodoroSettingsService();
	const queryClient = new QueryClient();

	const { mutate, isLoading } = useMutation({
		mutationKey: ["updateSettings"],
		mutationFn: (data: IPomodoroSettingsUpdateData) =>
			pomodoroSettingsService.updatePomodoroSettings(data),
		onSuccess() {
			toast.success("Successfully updated pomodoro settings!");
			queryClient.invalidateQueries({ queryKey: ["refreshTimer"] });
		},
	});

	return { mutate, isLoading };
}

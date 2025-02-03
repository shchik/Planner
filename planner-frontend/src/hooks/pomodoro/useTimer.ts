import { PomodoroTimerType } from "@/app/i/pomodoro/pomodoro";
import { PomodoroTimerService } from "@/services/pomodoro-timer-service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function useTimer() {
	const pomodoroTimerService = new PomodoroTimerService();

	const { data } = useQuery({
		queryKey: ["get timer"],
		queryFn: () => pomodoroTimerService.getPomodoroTimer(),
	});

	const [pomodoroTimer, setPomodoroTimer] =
		React.useState<PomodoroTimerType>();

	React.useEffect(() => {
		if (data) {
			setPomodoroTimer({
				cyclesCount: data.cyclesCount,
				timeLeft: data.timeLeft,
			});
		}
	}, [data]);

	return { pomodoroTimer };
}

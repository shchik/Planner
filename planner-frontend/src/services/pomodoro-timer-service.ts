"use client";

import { axiosWithAuth } from "@/api/interceptors";
import {
	IPomodoroTimerCreateData,
	IPomodoroTimerResponse,
	IPomodoroTimerUpdateData,
} from "@/types/pomodoro-timer.types";

export class PomodoroTimerService {
	private BASE_URL = "/pomodoro-timer";

	getPomodoroTimer = async () => {
		const response = await axiosWithAuth.get<IPomodoroTimerResponse>(
			`${this.BASE_URL}/get`
		);

		return response.data;
	};

	createPomodoroTimer = async (data: IPomodoroTimerCreateData) => {
		const response = await axiosWithAuth.post<IPomodoroTimerResponse>(
			`${this.BASE_URL}/create`,
			data
		);

		return response;
	};

	updatePomodoroTimer = async (data: IPomodoroTimerUpdateData) => {
		const response = await axiosWithAuth.patch<IPomodoroTimerUpdateData>(
			`${this.BASE_URL}/update`,
			data
		);

		return response;
	};
}

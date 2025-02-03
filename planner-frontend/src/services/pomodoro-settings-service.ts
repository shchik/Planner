import { axiosWithAuth } from "@/api/interceptors";
import {
	IPomodoroSettingsResponse,
	IPomodoroSettingsUpdateData,
} from "@/types/pomodoro-settings.types";

export class PomodoroSettingsService {
	private BASE_URL = "/pomodoro";

	getPomodoroSettings = async (): Promise<IPomodoroSettingsResponse> => {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/get`);

		return response.data;
	};

	createPomodoroSettings = async (): Promise<IPomodoroSettingsResponse> => {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/create`);

		return response.data;
	};

	updatePomodoroSettings = async (
		data: IPomodoroSettingsUpdateData
	): Promise<IPomodoroSettingsResponse> => {
		const response = await axiosWithAuth.patch(
			`${this.BASE_URL}/update`,
			data
		);

		return response.data;
	};
}

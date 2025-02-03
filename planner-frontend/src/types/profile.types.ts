import { IUserResponse } from "./auth.types";
import { IPomodoroSettingsResponse } from "./pomodoro-settings.types";

export interface IProfileResponse {
	user: IUserResponse;
	pomodoroSettings: IPomodoroSettingsResponse;
}

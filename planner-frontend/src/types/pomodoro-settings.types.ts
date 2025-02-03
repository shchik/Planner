export interface IPomodoroSettingsResponse {
	id: number;
	workInterval: number;
	breakInterval: number;
	intervalsCount: number;
}

export interface IPomodoroSettingsUpdateData {
	workInterval?: number;
	breakInterval?: number;
	intervalsCount?: number;
}

export type PomodoroSettingsType = {
	workInterval: number;
	breakInterval: number;
	intervalsCount: number;
};

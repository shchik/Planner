export interface IPomodoroTimerResponse {
	id: number;
	timeLeft: number;
	cyclesCount: number;
}

export interface IPomodoroTimerUpdateData {
	timeLeft?: number;
	cyclesCount?: number;
}

export interface IPomodoroTimerCreateData {
	timeLeft: number;
	cyclesCount: number;
}

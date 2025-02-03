export enum EnumTaskPriority {
	low = "LOW",
	medium = "MEDIUM",
	high = "HIGH",
}

export enum EnumTaskDate {
	today = "Today",
	tomorrow = "Tomorrow",
	week = "Week",
	month = "Month",
}

export interface ITaskResponse {
	id: number;
	name: string;
	priority: EnumTaskPriority;
	taskDate: EnumTaskDate;
	isCompleted: boolean;
}

export interface ITaskCreateData {
	name: string;
	priority: EnumTaskPriority;
	taskDate: EnumTaskDate;
}

export interface ITaskUpdateData {
	id: number;
	name?: string;
	priority?: EnumTaskPriority;
	taskDate?: EnumTaskDate;
	isCompleted?: boolean;
}

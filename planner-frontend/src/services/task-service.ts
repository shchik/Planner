import { axiosWithAuth } from "@/api/interceptors";
import {
	ITaskCreateData,
	ITaskResponse,
	ITaskUpdateData,
} from "@/types/task.types";
import dayjs from "dayjs";

export class TaskService {
	private BASE_URL = "/task";
	constructor() {}

	getAllTasks = async () => {
		const response = await axiosWithAuth.get<ITaskResponse[]>(
			`${this.BASE_URL}/all-tasks`
		);
		return response;
	};

	addTask = async (data: ITaskCreateData) => {
		const response = await axiosWithAuth.post<ITaskResponse>(
			`${this.BASE_URL}/create`,
			data
		);

		return response;
	};

	deleteTask = async (taskId: number) => {
		await axiosWithAuth.post<ITaskResponse>(`${this.BASE_URL}/delete`, {
			taskId: taskId,
		});
	};

	updateTask = async (data: ITaskUpdateData) => {
		const response = await axiosWithAuth.patch<ITaskResponse>(
			`${this.BASE_URL}/update`,
			data
		);

		return response;
	};

	fillDate = (day: "Today" | "Tomorrow" | "Week" | "Month"): string => {
		const today = dayjs();
		if (day === "Today") return today.format("MMMM DD");
		if (day === "Tomorrow") return today.add(1, "day").format("MMMM DD");
		if (day === "Week") return today.endOf("week").format("MMMM DD");
		else return today.endOf("month").format("MMMM DD");
	};
}

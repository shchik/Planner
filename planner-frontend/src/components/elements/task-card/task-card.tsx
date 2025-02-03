"use client";

import { useDeleteTask } from "@/hooks/tasks/useDeleteTask";
import { useUpdateTask } from "@/hooks/tasks/useUpdateTask";
import { TaskService } from "@/services/task-service";
import { EnumTaskPriority, ITaskResponse } from "@/types/task.types";
import { ArchiveX, Grip } from "lucide-react";
import React from "react";
import s from "./task-card.module.scss";

type TaskCardProps = {
	task: ITaskResponse;
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
	const taskService = new TaskService();
	const updateTask = useUpdateTask();
	const deleteTask = useDeleteTask();

	const handlePriorityChange = async (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		try {
			updateTask({
				id: task.id,
				priority: e.target.value as EnumTaskPriority,
			});
		} catch (error) {
			console.error("Error updating task priority:", error);
		}
	};

	const handleDeleteTask = async () => {
		try {
			deleteTask(task.id);
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	const handleCompleteTask = async () => {
		try {
			updateTask({
				id: task.id,
				isCompleted: true,
			});
		} catch (error) {
			console.error("Error completing task:", error);
		}
	};

	return (
		<div className={s.task} key={task.id}>
			<div className={s.task_container}>
				<p>{task.name}</p>
				<select
					className={`${s.priority} ${
						s[task.priority.toLowerCase()]
					}`}
					value={task.priority}
					onChange={handlePriorityChange}
				>
					<option value={EnumTaskPriority.low}>LOW</option>
					<option value={EnumTaskPriority.medium}>MEDIUM</option>
					<option value={EnumTaskPriority.high}>HIGH</option>
				</select>
				<p>{taskService.fillDate(task.taskDate)}</p>
			</div>
			<ArchiveX className={s.close_icon} onClick={handleDeleteTask} />
			<Grip className={s.drag_icon} />

			<div>
				<button
					className={s.complete_button}
					onClick={handleCompleteTask}
				>
					Complete
				</button>
			</div>
		</div>
	);
};

export default TaskCard;

"use client";

import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import {
	EnumTaskDate,
	EnumTaskPriority,
	ITaskCreateData,
} from "@/types/task.types";
import { CircleX } from "lucide-react";
import React, { SetStateAction } from "react";
import s from "./add-task-card.module.scss";

type AddTaskCardProps = {
	addedTask: ITaskCreateData;
	setAddedTask: React.Dispatch<SetStateAction<ITaskCreateData | undefined>>;
};

const AddTaskCard: React.FC<AddTaskCardProps> = ({
	addedTask,
	setAddedTask,
}) => {
	const createTask = useCreateTask();

	const handleAddTask = async () => {
		try {
			createTask(addedTask);

			setAddedTask(undefined);
		} catch (error) {
			console.error("Error adding new task:", error);
		}
	};

	return (
		<div className={s.task_container}>
			<CircleX
				className={s.close_icon}
				onClick={() => {
					setAddedTask(undefined);
				}}
			/>
			<div className="flex items-center justify-between">
				<input
					type="text"
					placeholder="Enter task description"
					value={addedTask.name}
					onChange={e => {
						setAddedTask(prev =>
							prev
								? {
										...prev,
										name: e.target.value,
								  }
								: prev
						);
					}}
				/>
			</div>
			<select
				className={`${s.priority} ${
					s[addedTask.priority.toLowerCase()]
				}`}
				value={addedTask.priority}
				onChange={e => {
					setAddedTask(prev =>
						prev
							? {
									...prev,
									priority: e.target
										.value as EnumTaskPriority,
							  }
							: prev
					);
				}}
			>
				<option value={EnumTaskPriority.low}>LOW</option>
				<option value={EnumTaskPriority.medium}>MEDIUM</option>
				<option value={EnumTaskPriority.high}>HIGH</option>
			</select>
			<select
				className={s.task_date}
				value={addedTask.taskDate}
				onChange={e => {
					setAddedTask(prev =>
						prev
							? {
									...prev,
									taskDate: e.target.value as EnumTaskDate,
							  }
							: prev
					);
				}}
			>
				<option value={EnumTaskDate.today}>Today</option>
				<option value={EnumTaskDate.tomorrow}>Tomorrow</option>
				<option value={EnumTaskDate.week}>Week</option>
				<option value={EnumTaskDate.month}>Month</option>
			</select>
			<div className={s.actions}>
				<button className={s.add_button} onClick={handleAddTask}>
					Add
				</button>
			</div>
		</div>
	);
};

export default AddTaskCard;

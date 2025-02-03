"use client";

import AddTaskCard from "@/components/elements/add-task-card/add-task-card";
import TaskCard from "@/components/elements/task-card/task-card";
import { useTasks } from "@/hooks/tasks/useTasks";
import { useTasksDnd } from "@/hooks/tasks/useTasksDnd";
import {
	EnumTaskDate,
	EnumTaskPriority,
	ITaskCreateData,
} from "@/types/task.types";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import s from "./tasks.module.scss";

const TasksView: React.FC = () => {
	const { tasks } = useTasks();
	const [addedTask, setAddedTask] = React.useState<ITaskCreateData>();
	const onDragEnd = useTasksDnd();

	const addNewTask = async (category: EnumTaskDate) => {
		setAddedTask({
			name: "New Task",
			priority: EnumTaskPriority.low,
			taskDate: category,
		});
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={s.tasks}>
				{Object.values(EnumTaskDate).map(category => (
					<Droppable
						key={category}
						droppableId={category}
						isDropDisabled={false}
						isCombineEnabled={false}
						ignoreContainerClipping={false}
					>
						{provided => (
							<div
								className={s.task}
								key={category}
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								<h1>{category}</h1>
								{tasks && tasks.length > 0
									? tasks.map((task, index) =>
											task.taskDate === category ? (
												<Draggable
													key={task.id}
													draggableId={task.id.toString()}
													index={index}
												>
													{provided => (
														<div
															ref={
																provided.innerRef
															}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															<TaskCard
																task={task}
															/>
														</div>
													)}
												</Draggable>
											) : (
												""
											)
									  )
									: ""}
								{provided.placeholder}

								{category === addedTask?.taskDate ? (
									<AddTaskCard
										addedTask={addedTask}
										setAddedTask={setAddedTask}
									/>
								) : (
									""
								)}

								<div>
									<button
										className={s.add_task_button}
										onClick={() => addNewTask(category)}
									>
										Add new task
									</button>
								</div>
							</div>
						)}
					</Droppable>
				))}
			</div>
		</DragDropContext>
	);
};

export default TasksView;

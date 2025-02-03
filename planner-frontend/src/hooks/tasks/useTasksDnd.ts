import { EnumTaskDate } from "@/types/task.types";
import { DropResult } from "react-beautiful-dnd";
import { useTasks } from "./useTasks";
import { useUpdateTask } from "./useUpdateTask";

export function useTasksDnd() {
	const updateTask = useUpdateTask();
	const { tasks } = useTasks();

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const destinationColumnId = result.destination.droppableId;
		if (destinationColumnId === result.source.droppableId) return;

		const [task] = tasks!.splice(result.source.index, 1);

		updateTask({
			id: task.id,
			taskDate: result.destination.droppableId as EnumTaskDate,
		});
	};
	return onDragEnd;
}

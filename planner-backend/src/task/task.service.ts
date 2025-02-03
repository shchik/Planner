import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateTaskDto } from "./task-dto/create-task.dto";
import { UpdateTaskDto } from "./task-dto/update-task.dto";

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async createTask(createTaskDto: CreateTaskDto) {
		const task = {
			name: createTaskDto.name,
			priority: createTaskDto.priority,
			user: { connect: { id: createTaskDto.userId } },
			taskDate: createTaskDto.taskDate,
		};

		return this.prisma.task.create({
			data: task,
		});
	}

	async deleteTask(taskId: number) {
		return this.prisma.task.delete({
			where: {
				id: taskId,
			},
		});
	}

	async updateTask(updateTaskDto: UpdateTaskDto) {
		const { id, ...data } = updateTaskDto;
		return this.prisma.task.update({
			where: { id: id },
			data,
		});
	}

	async getAllTasks(userId: number) {
		return this.prisma.task.findMany({
			where: { userId: userId },
			select: {
				id: true,
				name: true,
				isCompleted: true,
				priority: true,
				taskDate: true,
			},
		});
	}
}

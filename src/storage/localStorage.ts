import { Task } from "../interface/types";

export const saveTasksToLocalStorage = (tasks: Task[]): void => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const loadTasksFromLocalStorage = (): Task[] => {
	const tasks = localStorage.getItem("tasks");
	return tasks ? JSON.parse(tasks) : [];
};

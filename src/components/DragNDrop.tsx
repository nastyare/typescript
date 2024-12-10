import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TasksList from "./TasksList";

interface Task {
	id: string;
	title: string;
	description: string;
}

interface DragNDropProps {
	tasks: Task[];
	openedTaskId: string | null;
	taskMenu: (taskId: string) => void;
	openShareModal: (task: Task) => void;
	openEditModal: (task: Task) => void;
	openDeleteWindow: (taskId: string) => void;
	onDragEnd: (result: DropResult) => void;
}

const DragNDrop: React.FC<DragNDropProps> = ({
	tasks,
	openedTaskId,
	taskMenu,
	openShareModal,
	openEditModal,
	openDeleteWindow,
	onDragEnd,
}) => (
	<DragDropContext onDragEnd={onDragEnd}>
		<TasksList
			tasks={tasks}
			openedTaskId={openedTaskId}
			taskMenu={taskMenu}
			openShareModal={openShareModal}
			openEditModal={openEditModal}
			openDeleteWindow={openDeleteWindow}
		/>
	</DragDropContext>
);

export default DragNDrop;

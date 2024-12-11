import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import TaskItem from './TaskItem'
import { Task } from '../interface/types'

interface TasksListProps {
  tasks: Task[]
  openedTaskId: string | null
  taskMenu: (taskId: string) => void
  openShareModal: (task: Task) => void
  openEditModal: (task: Task) => void
  openDeleteWindow: (taskId: string) => void
}

const TasksList: React.FC<TasksListProps> = ({
  tasks,
  openedTaskId,
  taskMenu,
  openShareModal,
  openEditModal,
  openDeleteWindow,
}) => (
  <Droppable droppableId='taskList'>
    {(provided) => (
      <ul className='tasks-list' {...provided.droppableProps} ref={provided.innerRef}>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            openedTaskId={openedTaskId}
            taskMenu={taskMenu}
            openShareModal={openShareModal}
            openEditModal={openEditModal}
            openDeleteWindow={openDeleteWindow}
          />
        ))}
        {provided.placeholder}
      </ul>
    )}
  </Droppable>
)

export default TasksList

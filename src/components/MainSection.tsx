import React, { useState } from 'react'
import Modal from 'react-modal'
import ShareModal from '../modals/ShareModal'
import EditTaskModal from '../modals/EditTaskModal'
import InputSection from './InputSection'
import AddButton from './AddButton'
import NoTasks from './NoTasks'
import DragNDrop from './DragNDrop'
import ConfirmModal from '../modals/ConfirmModal'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, deleteTask, editTask, reorderTask } from '../redux/tasksSlice'
import { toast } from 'react-toastify'
import { Task } from '../interface/types'
import { DropResult } from 'react-beautiful-dnd'

Modal.setAppElement('#root')

const MainSection: React.FC = () => {
  const dispatch = useDispatch()

  const tasks: Task[] = useSelector((state: { tasks: { tasks: Task[] } }) => state.tasks.tasks)
  const noTasksVisible: boolean = useSelector(
    (state: { tasks: { noTasksVisible: boolean } }) => state.tasks.noTasksVisible,
  )

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isDeleteWindowOpen, setDeleteWindowOpen] = useState<boolean>(false)
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null)
  const [openedTaskId, setOpenedTaskId] = useState<string | null>(null)
  const [isShareModalOpen, setShowShareModal] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<Partial<Task>>({})
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [currentTask, setCurrentTask] = useState<Partial<Task>>({
    title: '',
    description: '',
  })

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask()
    }
  }

  const handleAddTask = () => {
    if (title.trim() && description.trim()) {
      dispatch(addTask({ title, description }))
      setTitle('')
      setDescription('')
    } else {
      toast.error('Title and description must be filled')
    }
  }

  const openDeleteWindow = (taskId: string) => {
    setTaskIdToDelete(taskId)
    setDeleteWindowOpen(true)
  }

  const deleteTaskHandler = () => {
    if (taskIdToDelete) {
      dispatch(deleteTask(taskIdToDelete))
      setDeleteWindowOpen(false)
    }
  }

  const taskMenu = (taskId: string) => {
    if (openedTaskId === taskId) {
      setOpenedTaskId(null)
    } else {
      setOpenedTaskId(taskId)
      const task = tasks.find((task) => task.id === taskId)
      if (task) setSelectedTask(task)
    }
  }

  const openShareModal = (task: Task) => {
    setSelectedTask(task)
    setShowShareModal(true)
    setOpenedTaskId(null)
  }

  const openEditModal = (task: Task) => {
    setCurrentTask(task)
    setEditModalOpen(true)
    setOpenedTaskId(null)
  }

  const handleEditTask = (newTitle: string, newDescription: string) => {
    if (currentTask.id) {
      dispatch(editTask({ id: currentTask.id, newTitle, newDescription }))
      setEditModalOpen(false)
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    dispatch(
      reorderTask({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      }),
    )
  }

  return (
    <div className='main-section'>
      <div className='base-form'>
        <InputSection
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          handleKeyPress={handleKeyPress}
        />
        <AddButton onClick={handleAddTask} />
      </div>

      {noTasksVisible ? (
        <NoTasks />
      ) : (
        <DragNDrop
          tasks={tasks}
          openedTaskId={openedTaskId}
          taskMenu={taskMenu}
          openShareModal={openShareModal}
          openEditModal={openEditModal}
          openDeleteWindow={openDeleteWindow}
          onDragEnd={onDragEnd}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteWindowOpen}
        onRequestClose={() => setDeleteWindowOpen(false)}
        onConfirm={deleteTaskHandler}
      />

      {isShareModalOpen && selectedTask.title && selectedTask.description && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          title={selectedTask.title}
          fullDescription={selectedTask.description}
        />
      )}

      {isEditModalOpen && (
        <EditTaskModal
          onClose={() => setEditModalOpen(false)}
          taskTitle={currentTask.title || ''}
          taskDescription={currentTask.description || ''}
          onSave={handleEditTask}
        />
      )}
    </div>
  )
}

export default MainSection

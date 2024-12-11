import React from 'react'
import Modal from 'react-modal'

interface ConfirmModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onConfirm: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className='delete-window' overlayClassName='background'>
      <p>Delete this task?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onRequestClose}>No</button>
    </Modal>
  )
}

export default ConfirmModal

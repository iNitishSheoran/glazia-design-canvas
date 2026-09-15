import { useState } from 'react';

export const useModal = () => {
  const [modal, setModal] = useState({ 
    isOpen: false, 
    title: '', 
    message: '', 
    onConfirm: null, 
    onCancel: null, 
    confirmText: 'OK' 
  });

  const showModal = (title, message, onConfirm, onCancel = null, confirmText = "OK") => {
    setModal({
      isOpen: true, 
      title, 
      message,
      onConfirm: () => { 
        onConfirm(); 
        setModal(m => ({ ...m, isOpen: false })); 
      },
      onCancel: onCancel ? () => { 
        onCancel(); 
        setModal(m => ({ ...m, isOpen: false })); 
      } : null,
      confirmText
    });
  };

  return { modal, showModal, setModal };
};
import Modal from 'react-modal';
import { useEffect } from 'react';
import css from "./ImageModal.module.css"

Modal.setAppElement('#root'); 

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} 
      contentLabel="Selected Image"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button onClick={onClose}>Закрити</button>
      <img src={imageUrl} alt="Selected" className={css.img} />
    </Modal>
  );
};

export default ImageModal;

import Modal from 'react-modal';
import css from './ModalImage.module.css';

Modal.setAppElement('#root'); // Встановлюємо кореневий елемент для доступності

function ModalImage({ isOpen, closeModal, image }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Перегляд зображення"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button onClick={closeModal} className={css.closeModalBtn}>✖</button>
      {image && (
        <div className={css.modalContent}>
          <img src={image.urls.regular} alt={image.alt_description} />
        </div>
      )}
    </Modal>
  );
}

export default ModalImage;

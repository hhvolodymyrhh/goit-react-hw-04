import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root'); // Встановлюємо кореневий елемент для доступності

function ModalImage({ isOpen, closeModal, selectedImage }) {
  const customStyles = {
     
       overlay: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          padding: '0',
          margin: '0',
          zIndex: "999",
          backgroundColor: "rgba(45, 45, 45, 0.3)",
          backdropFilter: "blur(5px)",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0",
          padding: 0,
          width: "800px",
          height: "fit-content",
          opacity: 1,
          backgroundColor: "black",
          color: "white",
          inset: 0,
        },
  };  

  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Перегляд зображення"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button onClick={closeModal} className={css.closeModalBtn}>✖</button>
        {selectedImage && (
          <div className="modal-content">
            <img src={selectedImage} alt="Перегляд зображення" />
          </div>
        )}
    </Modal>
  );
}

export default ModalImage;

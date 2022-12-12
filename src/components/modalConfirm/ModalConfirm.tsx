import "./style.css";

import Modal from "../modal/Modal";

interface ModalConfirmProps {
  onClose: () => void;
  onConfirm: () => void;
  text?: string;
}

const ModalConfirm = ({ onClose, text = "", onConfirm }: ModalConfirmProps) => {
  return (
    <Modal onClose={onClose}>
      <div className="modal__content">
        <h4>{text}</h4>
      </div>
      <div className="modal__footer">
        <button className="modal__btn" onClick={onClose}>
          Cancelar
        </button>
        <button className="modal__btn" onClick={onConfirm}>
          Confirmar
        </button>
      </div>
    </Modal>
  );
};

export default ModalConfirm;

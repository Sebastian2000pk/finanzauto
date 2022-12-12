import "./modal.css";

const Modal = ({ children, onClose }: any) => {
  return (
    <div className="modal__container">
      <div className="modal">
        <header className="modal__header">
          <button className="modal__button--close" onClick={onClose}>
            <i className="bx bx-x"></i>
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;

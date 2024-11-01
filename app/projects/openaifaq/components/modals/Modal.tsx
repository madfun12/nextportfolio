interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className={`modal-holder`}>
      <div className={`modal-container`}>{children}</div>
    </div>
  );
};

export default Modal;

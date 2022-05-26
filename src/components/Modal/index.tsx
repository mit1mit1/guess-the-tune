import React from "react";
import modalStyles from "./Modal.module.scss";
import appStyles from "src/App.module.scss";

interface ModalProps {
  title: string;
  children?: React.ReactNode;
  visible: boolean;
  toggleVisible: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  visible,
  toggleVisible,
}) => {
  return (
    <>
      {visible && <div className={modalStyles.greyBackground} onClick={toggleVisible} />}
      <div className={visible ? modalStyles.visibleModal : modalStyles.invisibleModal}>
        <div className={modalStyles.modalContent}>
          <div className={modalStyles.modalHeader}>
            <h3 className={modalStyles.modalTitle}>{title}</h3>
          </div>
          <div className={modalStyles.modalBody}>{children}</div>
          <div className={modalStyles.modalFooter}>
            <button className={[modalStyles.modalButton, appStyles.button].join(' ')} onClick={toggleVisible}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useEffect } from "react";
import modalStyles from "./Modal.module.scss";
import appStyles from "src/components/App.module.scss";

interface ModalProps {
  title: string;
  children?: React.ReactNode;
  visible: boolean;
  toggleVisible: () => void;
  closeText?: string;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  visible,
  toggleVisible,
  closeText = "Close"
}) => {
  useEffect(() => {
    if (!visible) {
      return;
    }
    const close = (e: { key: string; }) => {
      if (e.key === 'Escape') {
        toggleVisible()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [toggleVisible, visible])
  return (
    <>
      {visible && (
        <div className={modalStyles.greyBackground} onClick={toggleVisible} />
      )}
      <div
        className={
          visible ? modalStyles.visibleModal : modalStyles.invisibleModal
        }
      >
        <div className={modalStyles.modalContent}>
          <div className={modalStyles.modalHeader}>
            <h2 className={modalStyles.modalTitle}>{title}</h2>
          </div>
          <div className={modalStyles.modalBody}>{children}</div>
          <div className={modalStyles.modalFooter}>
            <button
              className={[
                modalStyles.modalButton,
                appStyles.button,
                appStyles.buttonPrimary,
              ].join(" ")}
              onClick={toggleVisible}
            >
              {closeText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

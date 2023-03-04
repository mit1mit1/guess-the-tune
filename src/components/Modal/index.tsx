import React, { useEffect } from "react";
import modalStyles from "./Modal.module.scss";

interface ModalProps {
  title: string;
  size?: string;
  children?: React.ReactNode;
  visible: boolean;
  toggleVisible: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  size,
  children,
  visible,
  toggleVisible,
}) => {
  useEffect(() => {
    if (!visible) {
      return;
    }
    const close = (e: { key: string }) => {
      if (e.key === "Escape") {
        toggleVisible();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [toggleVisible, visible]);
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
        <button
          className={modalStyles.modalCloseButton}
          onClick={toggleVisible}
        >
          x
        </button>
        <div
          className={[
            modalStyles.modalContent,
            size === "medium" ? modalStyles.modalContentMedium : "",
          ].join(" ")}
        >
          <div className={modalStyles.modalHeader}>
            <h2 className={modalStyles.modalTitle}>{title}</h2>
          </div>
          <div className={modalStyles.modalBody}>{children}</div>
        </div>
      </div>
    </>
  );
};

import React from "react";
import "./Modal.css";

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
      {visible && <div className="grey-background" onClick={toggleVisible} />}
      <div className={visible ? "visible-modal" : "invisible-modal"}>
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button className="modal-button button" onClick={toggleVisible}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

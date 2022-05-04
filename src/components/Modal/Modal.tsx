import React from 'react';
import { useStore } from 'src/gameStore';
import "./Modal.css";

interface ModalProps {
    title: string;
    children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, children }) => {
    const { showInstructions, toggleInstructions } = useStore();
    console.log(showInstructions)
    return (
        <div className={showInstructions ? "visible-modal" : "invisible-modal"} >
            <div className="modal-content" >
                <div className="modal-header" >
                    <h3 className="modal-title">{title}</h3>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={() => toggleInstructions()}>Close</button>
                </div>
            </div>
        </div>
    )
}
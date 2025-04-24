'use client';
import * as bootstrap from 'bootstrap';
import { useEffect, useRef, useState } from "react";

type ToastsConfirmationProps = {
    onClose?: (result:boolean) => void;
}
export default function ToastsConfirmation({ onClose }: ToastsConfirmationProps) {
    const [show, setShow] = useState(true);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window !== "undefined" && modalRef.current) {
        const modal = new bootstrap.Modal(modalRef.current, {
          backdrop: "static",
          keyboard: false,
        });
        modal.show();
  
        const handleHide = () => {
          setShow(false);
          onClose?.(false);
        };
  
        modalRef.current.addEventListener("hidden.bs.modal", handleHide);
  
        return () => {
          modalRef.current?.removeEventListener("hidden.bs.modal", handleHide);
          modal.dispose();
        };
      }
    }, []);

    if (!show) return null;

    return (
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Você tem certeza que deseja continuar?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setShow(false);
                  onClose?.(false);
                }}
              >
                Fechar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onClose?.(true);
                  bootstrap.Modal.getInstance(modalRef.current!)?.hide();
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

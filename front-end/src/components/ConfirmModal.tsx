'use client';
import { useEffect, useRef } from 'react';
import './../styles/confirm-modal.css';
import { MetadataProps } from '@/types/metadataProps';


type ConfirmModalProps = {
  id: string;
  metadata?: MetadataProps;
  onConfirm: (id: string) => void;
  onCancel: () => void;
};

export default function ConfirmModal({ id,metadata, onConfirm, onCancel }: ConfirmModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (dialog) {
      dialog.showModal();

      const handleCancel = (e: Event) => {
        e.preventDefault(); // previne o fechamento automático
        onCancel();
        dialog.close();
      };

      dialog.addEventListener('cancel', handleCancel);
      return () => {
        dialog.removeEventListener('cancel', handleCancel);
      };
    }
  }, [onCancel]);

  const handleConfirm = () => {
    modalRef.current?.close();
    onConfirm(id);
  };

  const handleClose = () => {
    modalRef.current?.close();
    onCancel();
  };

  return (
    <dialog ref={modalRef}>
  <div className="modal-header">{metadata?.title}</div>
  <div className="modal-body">
    {metadata?.description}
  </div>
  <div className="modal-footer">
    <button onClick={handleClose} className="modal-btn cancel">Cancelar</button>
    <button onClick={handleConfirm} className="modal-btn confirm">Confirmar</button>
  </div>
</dialog>
  );
}

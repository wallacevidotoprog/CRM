import { useEffect, useState } from "react";
import "./../styles/alert-modal.css";

type AlertModalProps = {
  message: string;
  onClose?: () => void;
  duration?: number; // milissegundos
};

export default function AlertModal({ message, onClose, duration = 3000 }: AlertModalProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  if (!show) return null;

  return (
    <div className="alert-modal">
      <div className="alert-content">
        <p>{message}</p>
        <button onClick={() => { setShow(false); onClose?.(); }}>Fechar</button>
      </div>
    </div>
  );
}

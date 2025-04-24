'use client';
import { Client } from "@/types/client";
import { useEffect, useState } from "react";

type Props = {
  client?: Client;
  onSave: (client: Client) => void;
  onClear: () => void;
  onClose: () => void;
};

export default function ClienteForm({ client, onSave, onClear: onClear, onClose }: Props) {
  const [form, setForm] = useState<Client>({ name: "", email: "", phone: "", address: "" });
  const [show, setShow] = useState(true);

  useEffect(() => {
    setForm(client || { name: "", email: "", phone: "", address: "" });
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form) {
      onSave(form);
    }
  };

  onClear = () => {
    setForm({ name: "", email: "", phone: "", address: "" });
  };

  if (!show) return null;

  return (
    <>
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        style={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent" }}
        tabIndex={-1}
        aria-labelledby="clienteModalLabel"
        aria-hidden={!show}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="clienteModalLabel">
                {form?.id ? "Editar Cliente" : "Novo Cliente"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label">
                    Nome:
                  </label>
                  <input id="nameInput" name="name" placeholder="Nome" value={form?.name} onChange={handleChange} required className="form-control" />
                </div>

                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">
                    Email:
                  </label>
                  <input
                    id="emailInput"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form?.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneInput" className="form-label">
                    Telefone:
                  </label>
                  <input
                    id="phoneInput"
                    name="phone"
                    placeholder="Telefone"
                    value={form?.phone}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="addressInput" className="form-label">
                    Endereço:
                  </label>
                  <input
                    id="addressInput"
                    name="address"
                    placeholder="Endereço"
                    value={form?.address}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClear}>
                  Limpar
                </button>

                <button type="submit" className="btn btn-primary">
                  {form?.id ? "Atualizar" : "Cadastrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

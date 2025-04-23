import { Client } from "@/types/client";
import { useEffect, useState } from "react";

type Props = {
  client?: Client;
  onSave: (client: Client) => void;
  onClear: () => void;
};

export default function ClienteForm({ client, onSave, onClear: onClear }: Props) {
  const [form, setForm] = useState<Client>({ name: "", email: "", phone: "", address: "" });

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

  return (
    <form className="cliente-form" onSubmit={handleSubmit}>
      <h2>{form?.id ? "Editar Cliente" : "Novo Cliente"}</h2>
      <input name="name" placeholder="Nome" value={form?.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form?.email} onChange={handleChange} required />
      <input name="phone" placeholder="Telefone" value={form?.phone} onChange={handleChange} required />
      <input name="address" placeholder="Endereço" value={form?.address} onChange={handleChange} required />
      <button type="submit">{form?.id ? "Atualizar" : "Cadastrar"}</button>
      <button type="button" onClick={onClear} className="clear">
        Limpar
      </button>
    </form>
  );
}

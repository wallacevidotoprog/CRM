"use client";

import { createClient, deleteClient, GetAll, updateClient } from "@/api/service/client.service";
import AlertModal from "@/components/AlertModal";
import ClienteForm from "@/components/client/ClienteForm";
import ClienteList from "@/components/client/ClienteList";
import "@/styles/client.css";
import type { Client } from "@/types/client";
import { ApiResponse } from "@/types/response.api";
import { useEffect, useState } from "react";

export default function Client() {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientSelected, setClientSelected] = useState<Client | undefined>();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const res = await GetAll();
    setClients(res);
  };

  const salvarCliente = async (client: Client) => {
    let result: ApiResponse;
    if (client.id) {
      result = await updateClient(client);
    } else {
      result = await createClient(client);
    }
    if (result.ok) {
      await fetchClients();
      setClientSelected(undefined);
      return;
    }

    setAlertMessage(result.message||"Erro ao salvar cliente");
    setShowAlert(true);
  };

  const editarCliente = (client: Client) => {   
    setClientSelected(client);
  };

  const excluirCliente = async (id: string) => {

    if (!confirm("Deseja realmente excluir o cliente?")) return;


    const result: ApiResponse = await deleteClient(id);
    if (result.ok) {
      await fetchClients();
      return;
    }
    setAlertMessage(result.message||"Erro ao excluir cliente");
    setShowAlert(true);

  };

    function clearForm(): void {
        //throw new Error("Function not implemented.");
    }

  return (<>
    <div className="clientes-container">
      <h1>Gerenciamento de Clientes</h1>
      <div className="clientes-content">
        <ClienteForm client={clientSelected} onSave={salvarCliente} onClear={clearForm} />
        <ClienteList clients={clients} onEdit={editarCliente} onDelete={excluirCliente} />
      </div>
    </div>
    {showAlert && (
        <AlertModal
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
  </>
  );
}

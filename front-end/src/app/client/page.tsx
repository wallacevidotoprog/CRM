'use client';
import { createClient, deleteClient, GetAll, updateClient } from "@/api/service/client.service";
import AlertModal from "@/components/AlertModal";
import ClienteForm from "@/components/client/ClienteForm";
import ClienteList from "@/components/client/ClienteList";
import { showToastConfirmation } from "@/components/Toasts/toastHelper";
//import "@/styles/client.css";
import type { Client } from "@/types/client";
import { ApiResponse } from "@/types/response.api";
import { useEffect, useState } from "react";

export default function Client() {
  const [clientSelected, setClientSelected] = useState<Client | undefined>();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
    searchTerm: ''
  });

  useEffect(() => {
    fetchClients();
  }, [pagination.currentPage, pagination.pageSize, pagination.searchTerm]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const result = await GetAll({
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
        name: pagination.searchTerm
      });

      if (result.success) {
        setClients(result.data);
        setPagination(prev => ({
          ...prev,
          totalItems: result.pagination.totalItems,
          totalPages: result.pagination.totalPages
        }));
      }
    } catch (error) {
      setAlertMessage(error instanceof Error ? error.message : "Erro ao buscar clientes");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  const handlePageSizeChange = (newSize: number) => {
    setPagination(prev => ({ ...prev, pageSize: newSize, currentPage: 1 }));
  };

  const handleSearch = (term: string) => {
    setPagination(prev => ({ ...prev, searchTerm: term, currentPage: 1 }));
  };

  const salvarCliente = async (client: Client) => {
    let result: ApiResponse;
    try {
      if (client.id) {
        result = await updateClient(client);
      } else {
        result = await createClient(client);
      }
      
      if (result.ok) {
        await fetchClients();
        setClientSelected(undefined);
        setShowForm(false);
      } else {
        throw new Error(result.message || "Erro ao salvar cliente");
      }
    } catch (error) {
      setAlertMessage(error instanceof Error ? error.message : "Erro desconhecido");
      setShowAlert(true);
    }
  };

  const editarCliente = (client: Client) => {
    setClientSelected(client);
    setShowForm(true);
  };

  const excluirCliente = async (id: string) => {
    

    const result = await showToastConfirmation();
    if (!result) return;
    try {
      const result: ApiResponse = await deleteClient(id);
      if (result.ok) {
        
        const itemsLeft = pagination.totalItems - 1;
        const itemsPerPage = pagination.pageSize;
        const newTotalPages = Math.ceil(itemsLeft / itemsPerPage);
        
        setPagination(prev => ({
          ...prev,
          totalItems: itemsLeft,
          totalPages: newTotalPages,
          currentPage: prev.currentPage > newTotalPages ? newTotalPages : prev.currentPage
        }));
        
        await fetchClients();
      } else {
        throw new Error(result.message || "Erro ao excluir cliente");
      }
    } catch (error) {
      setAlertMessage(error instanceof Error ? error.message : "Erro desconhecido");
      setShowAlert(true);
    }
  };

  return (
    <>    
      {showForm && (
        <ClienteForm 
          client={clientSelected} 
          onSave={salvarCliente} 
          onClose={() => {
            setClientSelected(undefined);
            setShowForm(false);
          }} 
          onClear={() => setClientSelected(undefined)}
        />
      )}
      
      <div className="clientes-container">
        <h1>Gerenciamento de Clientes</h1>
        <button 
          type="button" 
          onClick={() => setShowForm(true)}
          disabled={loading}
          className="btn btn-primary"
        >
          Cadastrar Novo Cliente
        </button>
        
        <div className="clientes-content">
          <ClienteList 
            clients={clients}
            onEdit={editarCliente} 
            onDelete={excluirCliente}
            currentPage={pagination.currentPage}
            pageSize={pagination.pageSize}
            totalItems={pagination.totalItems}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onSearch={handleSearch}
            loading={loading}
          />
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
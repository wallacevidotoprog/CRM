'use client';
import { Client } from "@/types/client";
import { useState } from "react";

type Props = {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSearch: (term: string) => void;
  loading: boolean;
};

export default function ClienteList({
  clients,
  onEdit,
  onDelete,
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
  onPageSizeChange,
  onSearch,
  loading,
}: Props) {
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm("");
    onSearch("");
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Clientes Cadastrados</h2>
        </div>

        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-8">
              <form onSubmit={handleSearchSubmit} className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nome..."
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                  disabled={loading}
                />
                <button className="btn btn-outline-secondary" type="submit" disabled={loading}>
                  <i className="bi bi-search"></i> Buscar
                </button>
                <button className="btn btn-outline-danger" type="button" onClick={handleClearSearch} disabled={loading || !localSearchTerm}>
                  <i className="bi bi-x-lg"></i> Limpar
                </button>
              </form>
            </div>

            <div className="col-md-4">
              <div className="input-group">
                <label className="input-group-text">Itens por página:</label>
                <select className="form-select" value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))} disabled={loading}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-2">Carregando clientes...</p>
            </div>
          )}


          {!loading && clients.length === 0 && (
            <div className="alert alert-info text-center">{localSearchTerm ? "Nenhum cliente encontrado" : "Nenhum cliente cadastrado"}</div>
          )}


          {!loading && clients.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Endereço</th>
                      <th className="text-end">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((cliente) => (
                      <tr key={cliente.id}>
                        <td>{cliente.name}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.phone}</td>
                        <td>{cliente.address}</td>
                        <td className="flex-column flex-md-row justify-content-end align-items-center">
                          <button className="btn btn-sm btn-outline-primary py-2 px-3 me-md-2 mb-2 mb-md-0" style={{minWidth:"80px"}} onClick={() => onEdit(cliente)} disabled={loading}>
                            <i className="bi bi-pencil"></i> Editar
                          </button>
                          <button className="btn btn-sm btn-outline-danger py-2 px-3 me-md-2 mb-2 mb-md-0" style={{minWidth:"80px"}} onClick={() => onDelete(cliente.id ?? "")} disabled={loading}>
                            <i className="bi bi-trash"></i> Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


              <div className="d-flex justify-content-between align-items-center mt-4">
                <div>
                  Mostrando {(currentPage - 1) * pageSize + 1} a {Math.min(currentPage * pageSize, totalItems)} de {totalItems} clientes
                </div>

                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                  >
                    <i className="bi bi-chevron-left"></i> Anterior
                  </button>

                  <span className="mx-2">
                    Página {currentPage} de {totalPages}
                  </span>

                  <button
                    className="btn btn-outline-primary ms-2"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages || loading}
                  >
                    Próxima <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

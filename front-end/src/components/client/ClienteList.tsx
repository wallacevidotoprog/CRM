import { Client } from '@/types/client';

type Props = {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
};

export default function ClienteList({ clients, onEdit, onDelete }: Props) {
  return (
    <div className="cliente-list">
      <h2>Clientes Cadastrados</h2>
      {clients.length === 0 ? (
        <p>Nenhum cliente cadastrado ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.name}</td>
                <td>{cliente.email}</td>
                <td>{cliente.phone}</td>
                <td>{cliente.address}</td>
                <td>
                  <button onClick={() => onEdit(cliente)}>Editar</button>
                  {cliente.id !== undefined && (
                    <button onClick={() => onDelete(cliente?.id ??'')} className="delete">Excluir</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

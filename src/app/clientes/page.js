"use client";

import Pagina from "@/Components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function PaginaInicialClientesPage() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const clientesLocalStorage =
      JSON.parse(localStorage.getItem("clientes")) || [];
    setClientes(clientesLocalStorage);
    console.log(clientesLocalStorage);
  }, []);

  function excluir(cliente) {
    if (window.confirm(`Deseja mesmo excluir o cliente ${cliente.nome}?`)) {
      const novaLista = clientes.filter((item) => item.id !== cliente.id);
      localStorage.setItem("clientes", JSON.stringify(novaLista));
      setClientes(novaLista);
      alert("Cliente excluído com sucesso!!");
    }
  }
  return (
    <Pagina titulo={"Lista de Clientes"}>
      <div className="text-end mb-2">
        <Button href="/clientes/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os clientes */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome Completo:</th>
            <th>CPF:</th>
            <th>Telefone:</th>
            <th>Email:</th>
            <th>Cidade:</th>
            <th>Renda Anual:</th>
            <th>Ações:</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((clientes) => {
            return (
              <tr>
                <td>{clientes.nome}</td>
                <td>{clientes.cpf}</td>
                <td>{clientes.telefone}</td>
                <td>{clientes.email}</td>
                <td>{clientes.estado}</td>
                <td>{clientes.renda}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/clientes/form?id=${clientes.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(clientes)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Pagina>
  );
}

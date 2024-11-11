"use client";

import Pagina from "@/Components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function PaginaInicialClientesPage() {
  const [clientes, setClientes] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const clienteLocalStorage =
      JSON.parse(localStorage.getItem("cliente")) || [];
    // guarda a lista no estado faculdades
    setClientes(clienteLocalStorage);
    console.log(clienteLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(cliente) {
    // Confirma com o usuário a exclusão
    if (
      window.confirm(
        `Deseja realmente excluir o cliente ${cliente.nomeCompleto}?`
      )
    ) {
      // filtra a lista antiga removando o cliente recebido
      const novaLista = clientes.filter((item) => item.id !== cliente.id);
      // grava no localStorage a nova lista
      localStorage.setItem("cliente", JSON.stringify(novaLista));
      // grava a nova lista no estado para renderizar na tela
      setClientes(novaLista);
      alert("Cliente excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Clientes"}>
      <div className="text-end mb-2">
        <Button href="/cliente/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os cliente */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome Completo</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Endereço Completo</th>
            <th>Cidade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => {
            return (
              <tr>
                <td>{cliente.nomeCompleto}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>{cliente.enderecoCompleto}</td>
                <td>{cliente.cidade}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/cliente/form?id=${cliente.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(cliente)}>
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

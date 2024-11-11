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
  function excluir(curso) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o curso ${curso.nome}?`)) {
      // filtra a lista antiga removando o curso recebido
      const novaLista = cliente.filter((item) => item.id !== curso.id);
      // grava no localStorage a nova lista
      localStorage.setItem("cliente", JSON.stringify(novaLista));
      // grava a nova lista no estado para renderizar na tela
      setClientes(novaLista);
      alert("Curso excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Filiais"}>
      <div className="text-end mb-2">
        <Button href="/filial/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os cliente */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome da Filial</th>
            <th>Código da Filial</th>
            <th>Endereço Completo</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Gerente Responsável</th>
            <th>Data de Abertura</th>
            <th>Status </th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => {
            return (
              <tr>
                <td>{cliente.nome}</td>
                <td>{cliente.area}</td>
                <td>{cliente.nota}</td>
                <td>{cliente.status}</td>
                <td>{cliente.faculdade}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/filial/form?id=${cliente.id}`}
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

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
      JSON.parse(localStorage.getItem("entregador")) || [];
    // guarda a lista no estado faculdades
    setClientes(clienteLocalStorage);
    console.log(clienteLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(curso) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o curso ${curso.nome}?`)) {
      // filtra a lista antiga removando o curso recebido
      const novaLista = entregador.filter((item) => item.id !== curso.id);
      // grava no localStorage a nova lista
      localStorage.setItem("entregador", JSON.stringify(novaLista));
      // grava a nova lista no estado para renderizar na tela
      setClientes(novaLista);
      alert("Entregador excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Entregadores"}>
      <div className="text-end mb-2">
        <Button href="/entregador/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os entregador */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Veículo</th>
            <th>Placa do Veículo</th>
            <th>Data de Admissão</th>
            <th>Região de Entrega</th>
            <th>Disponibilidade</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((entregador) => {
            return (
              <tr>
                <td>{entregador.nome}</td>
                <td>{entregador.area}</td>
                <td>{entregador.nota}</td>
                <td>{entregador.status}</td>
                <td>{entregador.faculdade}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/entregador/form?id=${entregador.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(entregador)}>
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

"use client";

import Pagina from "@/Components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function PaginaInicialvendasPage() {
  const [vendas, setVendas] = useState([]);

  
  useEffect(() => {
    
    const clienteLocalStorage =
      JSON.parse(localStorage.getItem("vendas")) || [];
    // guarda a lista no estado faculdades
    setVendas(clienteLocalStorage);
    console.log(clienteLocalStorage);
  }, []);

  
  function excluir(venda) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir a venda ${venda.nome}?`)) {
      // filtra a lista antiga removando o venda recebido
      const novaLista = cliente.filter((item) => item.id !== venda.id);
      // grava no localStorage a nova lista
      localStorage.setItem("cliente", JSON.stringify(novaLista));
      // grava a nova lista no estado para renderizar na tela
      setVendas(novaLista);
      alert("Venda excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Vendas"}>
      <div className="text-end mb-2">
        <Button href="/vendas/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Funcionário Atribuído</th>
            <th>Data da Venda</th>
            <th>Forma de Pagamento</th>
            <th>Local da Entrega</th>
            <th>Parcelas </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => {
            return (
              <tr>
                <td>{venda.cliente}</td>
                <td>{venda.produtoAdquirido}</td>
                <td>{venda.quantidade}</td>
                <td>{venda.funcionarioAtribuido}</td>
                <td>{venda.dataDaVenda}</td>
                <td>{venda.formaPagamento}</td>
                <td>{venda.localEntrega}</td>
                <td>{venda.parcelas}</td>
                <td className="text-center">
                 
                  <Button className="me-2" href={`/filial/form?id=${venda.id}`}>
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(venda)}>
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

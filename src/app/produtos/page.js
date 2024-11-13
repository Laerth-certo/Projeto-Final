"use client";

import Pagina from "@/Components/Pagina";
import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";

export default function ProdutosInicialPage() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const produtosLocalStorage =
      JSON.parse(localStorage.getItem("produtos")) || [];
    setProdutos(produtosLocalStorage);
    console.log(produtosLocalStorage);
  }, []);

  function apagar(produto) {
    if (window.confirm(`Deseja mesmo excluir o produto ${produtos.nome}?`)) {
      const novaLista = produtos.filter((item) => item.id !== produtos.id);
      localStorage.setItem("produtos", JSON.stringify(novaLista));
      setProdutos(novaLista);
      alert("Produto excluído com sucesso!!");
    }
  }

  return (
    <Pagina titulo="Produtos">
      <div className="text-end mb-2">
        <Button href="/produtos/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome:</th>
            <th>Categoria:</th>
            <th>Entregador:</th>
            <th>Material:</th>
            <th>Dimensões:</th>
            <th>Peso:</th>
            <th>Preço</th>
            <th>Quantidade em Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => {
            return (
              <tr key={produto.id} className="text-center">
                <td>{produto.nome}</td>
                <td>{produto.categoria}</td>
                <td>{produto.entregador}</td>
                <td>{produto.material}</td>

                <td>{produto.dimensoes}</td>
                <td>{produto.peso}</td>
                <td>{produto.preco}</td>
                <td>{produto.estoque}</td>
                <td className="text-center">
                  <Button
                    className="me-2"
                    href={`/produtos/form?id=${produto.id}`}
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => apagar(produto)}>
                    <FaTrashAlt />
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

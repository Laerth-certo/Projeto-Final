"use client";

import Pagina from "@/Components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function PaginaInicialProdutosPage() {
  const [produtos, setProdutos] = useState([]);

  // Executa ao carregar a página
  useEffect(() => {
    // Busca a lista de produtos no localStorage, ou inicia uma lista vazia
    const produtosLocalStorage =
      JSON.parse(localStorage.getItem("produto")) || [];
    // Guarda a lista no estado
    setProdutos(produtosLocalStorage);
    console.log(produtosLocalStorage);
  }, []);

  // Função para excluir um produto
  function excluir(produto) {
    if (window.confirm(`Deseja realmente excluir o produto ${produto.nome}?`)) {
      // Filtra a lista removendo o produto recebido
      const novaLista = produtos.filter((item) => item.id !== produto.id);
      // Salva a nova lista no localStorage
      localStorage.setItem("produto", JSON.stringify(novaLista));
      // Atualiza o estado para renderizar a lista atualizada na tela
      setProdutos(novaLista);
      alert("Produto excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Produtos"}>
      <div className="text-end mb-2">
        <Button href="/produto/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os produtos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Código do Produto</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Quantidade em Estoque</th>
            <th>Fornecedor</th>
            <th>Entregador</th>
            <th>Data do Cadastro</th>
            
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => {
            return (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.codigo}</td>
                <td>{produto.descricao}</td>
                <td>{produto.preco}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.fornecedor}</td>
                <td>{produto.entregador}</td>
                <td>{produto.dataCadastro}</td>
                <td className="text-center">
                  {/* Botões de ação */}
                  <Button
                    className="me-2"
                    href={`/produto/form?id=${produto.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(produto)}>
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

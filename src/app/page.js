"use client";

import Pagina from "@/Components/Pagina";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function HomePage() {
  const cliente = JSON.parse(localStorage.getItem("cliente")) || [];
  const entregador = JSON.parse(localStorage.getItem("entregador")) || [];
  const filial = JSON.parse(localStorage.getItem("filial")) || [];
  const funcionario = JSON.parse(localStorage.getItem("funcionario")) || [];
  const produto = JSON.parse(localStorage.getItem("produto")) || [];

  const lista = [
    {
      nome: "Clientes",
      imagem:
        "https://tse4.mm.bing.net/th?id=OIP.uRvzD-e-1BXO_iHBquau7AHaEI&pid=Api&P=0&h=180.jpg",
      quantidade: cliente.length,
      link: "/cliente",
    },
    {
      nome: "Entregador",
      imagem:
        "https://tse2.mm.bing.net/th?id=OIP.mb8osnJHNLJeFksfhCWDcwHaEm&pid=Api&P=0&h=180.jpg",
      quantidade: entregador.length,
      link: "/entregador",
    },
    {
      nome: "Filial",
      imagem:
        "https://tse2.mm.bing.net/th?id=OIP.C-j2CRERfwB3RVt93u6qHwHaFY&pid=Api&P=0&h=180.jpg",
      quantidade: filial.length,
      link: "/filial",
    },
    {
      nome: "Funcionários",
      imagem:
        "https://tse4.mm.bing.net/th?id=OIP._PGkhZJqzkjQac10NuuDSgHaE8&pid=Api&P=0&h=180.jpg",
      quantidade: funcionario.length,
      link: "/funcionario",
    },
    {
      nome: "Produto",
      imagem:
        "https://tse1.mm.bing.net/th?id=OIP.v9Gz_0pf1ug6TT_1gXdvbAHaEd&pid=Api&P=0&h=180.jpg",
      quantidade: produto.length,
      link: "/produto",
    },
  ];

  return (
    <Pagina titulo={"OPÇÃO MOVÉIS"}>
      <Row md={3}>
        {lista.map((item) => (
          <Col className="py-2">
            <Card style={{ height: "100%", textAlign: "center" }}>
              <Card.Img src={item.imagem} style={{ height: "100%" }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className="text-end">
                <Button
                  style={{
                    backgroundColor: "rgba(53, 247, 47, 0.8)",
                    color: "rgb(16, 108, 13)",
                  }}
                  href={item.link}
                >
                  Clique Aqui
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}

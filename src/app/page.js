"use client";

import Pagina from "@/Components/Pagina";
import { Button, Card, Col, Row } from "react-bootstrap";
import styles from "../app/page.module.css";

export default function HomePage() {
  const cliente = JSON.parse(localStorage.getItem("cliente")) || [];
  const entregador = JSON.parse(localStorage.getItem("entregador")) || [];
  const vendas = JSON.parse(localStorage.getItem("vendas")) || [];
  const funcionario = JSON.parse(localStorage.getItem("funcionario")) || [];
  const produto = JSON.parse(localStorage.getItem("produto")) || [];

  const lista = [
    {
      nome: "Clientes",
      imagem:
        "https://tse4.mm.bing.net/th?id=OIP.uRvzD-e-1BXO_iHBquau7AHaEI&pid=Api&P=0&h=180.jpg",
      quantidade: cliente.length,
      link: "/clientes",
    },
    {
      nome: "Entregadores",
      imagem:
        "https://tse2.mm.bing.net/th?id=OIP.mb8osnJHNLJeFksfhCWDcwHaEm&pid=Api&P=0&h=180.jpg",
      quantidade: entregador.length,
      link: "/entregadores",
    },
    {
      nome: "Vendas",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRshaAFlMj0tXlLZylAPTme6KiUYJJTdaC47w&s.jpg",
      quantidade: vendas.length,
      link: "/vendas",
    },
    {
      nome: "Funcionários",
      imagem:
        "https://tse4.mm.bing.net/th?id=OIP._PGkhZJqzkjQac10NuuDSgHaE8&pid=Api&P=0&h=180.jpg",
      quantidade: funcionario.length,
      link: "/funcionarios",
    },
    {
      nome: "Produtos",
      imagem:
        "https://tse1.mm.bing.net/th?id=OIP.v9Gz_0pf1ug6TT_1gXdvbAHaEd&pid=Api&P=0&h=180.jpg",
      quantidade: produto.length,
      link: "/produtos",
    },
  ];

  return (
    <Pagina titulo={"OPÇÃO MOVÉIS"}>
      <Row md={3}>
        {lista.map((item) => (
          <Col className="py-2" key={item.nome}>
            <Card
              className={styles.card}
              style={{ height: "100%", textAlign: "center" }}
            >
              <Card.Img
                src={item.imagem}
                className={styles.cardImg}
                style={{ height: "100%" }}
              />
              <Card.Body>
                <Card.Title className={styles.cardTitle}>
                  {item.nome}
                </Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer>
                <Button className={styles.btnCustom} href={item.link}>
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

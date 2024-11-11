"use client";

import { Container, Nav, Navbar } from "react-bootstrap";

export default function Pagina({ titulo, children }) {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar style={{ backgroundColor: "rgba(185, 128, 29, 0.7)" }}>
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/cliente">Cliente</Nav.Link>
            <Nav.Link href="/entregador">Entregador</Nav.Link>
            <Nav.Link href="/filial">Filiais</Nav.Link>
            <Nav.Link href="/funcionario">Funcionários</Nav.Link>
            <Nav.Link href="/produto">Produtos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div
        style={{
          backgroundColor: "rgba(185, 128,29,0.85)",
          textAlign: "center",
          padding: "4px",
        }}
      >
        <h1>{titulo}</h1>
      </div>

      {/* Conteudo da Página */}
      <Container className="mt-2">{children}</Container>
    </>
  );
}

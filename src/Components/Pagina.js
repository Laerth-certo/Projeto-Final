"use client";

import { Container, Nav, Navbar } from "react-bootstrap";
import styles from "../app/Pagina.module.css";

export default function Pagina({ titulo, children }) {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar className={styles.navbar}>
        <Container>
          <Navbar.Brand href="/" className={styles.brand}>
            Home
          </Navbar.Brand>
          <Nav className="me-end">
            <Nav.Link href="/clientes" className={styles.navLink}>
              Clientes
            </Nav.Link>
            <Nav.Link href="/entregadores" className={styles.navLink}>
              Entregadores
            </Nav.Link>
            <Nav.Link href="/vendas" className={styles.navLink}>
              Vendas
            </Nav.Link>
            <Nav.Link href="/funcionarios" className={styles.navLink}>
              Funcionários
            </Nav.Link>
            <Nav.Link href="/produtos" className={styles.navLink}>
              Produtos
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div className={styles.titleBar}>
        <h1 className={styles.pageTitle}>{titulo}</h1>
      </div>

      {/* Conteudo da Página */}
      <Container className={`${styles.containerContent} mt-2`}>
        {children}
      </Container>
    </>
  );
}

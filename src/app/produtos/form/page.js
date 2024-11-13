"use client";

import Pagina from "@/Components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function ProdutoFormPage(props) {
  const [entregadorFiltrado, setEntregadorFiltrado] = useState([]);

  // router -> hook para navegação de telas
  const router = useRouter();
  const entregadores = JSON.parse(localStorage.getItem("entregadores")) || [];

  // Recuperando id para edição
  const id = props.searchParams.id;
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const produtoEditado = produtos.find((item) => item.id == id);

  // função para salvar os dados do form
  function salvar(dados) {
    if (produtoEditado) {
      Object.assign(produtoEditado, dados);
      localStorage.setItem("produtos", JSON.stringify(produtos));
    } else {
      dados.id = v4();
      produtos.push(dados);
      localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    alert("Produto salvo com sucesso!");
    router.push("/produtos");
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: "",
    categoria: "",
    entregador: "",
    material: "",
    dimensoes: "",
    peso: "",
    preco: "",
    estoque: "",
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    categoria: Yup.string().required("Campo obrigatório"),
    entregador: Yup.string().required("Campo obrigatório"),
    material: Yup.string().required("Campo obrigatório"),
    dimensoes: Yup.string().required("Campo obrigatório"),
    peso: Yup.string().required("Campo obrigatório"),
    preco: Yup.string().required("Campo obrigatório"),
    estoque: Yup.string().required("Campo obrigatório"),
  });

  useEffect(() => {
    if (entregadores.length > 0) setEntregadorFiltrado(entregadores);
  }, [entregadores]);

  return (
    <Pagina titulo={"Cadastro de Produto"}>
      <Formik
        initialValues={produtoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Nome do Produto:</Form.Label>
                <Form.Control
                  name="nome"
                  type="text"
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && errors.nome}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Categoria do Produto:</Form.Label>
                <Form.Control
                  name="categoria"
                  type="text"
                  value={values.categoria}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.categoria && !errors.categoria}
                  isInvalid={touched.categoria && errors.categoria}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.categoria}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Entregador:</Form.Label>
                <Form.Select
                  name="entregador"
                  value={values.entregador}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.entregador && !errors.entregador}
                  isInvalid={touched.entregador && errors.entregador}
                >
                  <option value="">Selecione</option>
                  {entregadorFiltrado.map((entregador) => (
                    <option key={entregador.nome} value={entregador.nome}>
                      {entregador.nome}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.entregador}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Material:</Form.Label>
                <Form.Control
                  name="material"
                  type="text"
                  value={values.material}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.material && !errors.material}
                  isInvalid={touched.material && errors.material}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.material}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Dimensões:</Form.Label>
                <Form.Control
                  name="dimensoes"
                  type="text"
                  value={values.dimensoes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dimensoes && !errors.dimensoes}
                  isInvalid={touched.dimensoes && errors.dimensoes}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dimensoes}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Peso:</Form.Label>
                <InputMask
                  mask="999kg"
                  value={values.peso}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="peso"
                      isValid={touched.peso && !errors.peso}
                      isInvalid={touched.peso && errors.peso}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.peso}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Preço:</Form.Label>
                <InputMask
                  mask="R$ 999,99"
                  value={values.preco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="preco"
                      isValid={touched.preco && !errors.preco}
                      isInvalid={touched.preco && errors.preco}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.preco}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Quantidade em estoque:</Form.Label>
                <Form.Control
                  name="estoque"
                  value={values.estoque}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.estoque && !errors.estoque}
                  isInvalid={touched.estoque && errors.estoque}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.estoque}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/produtos">
                <FaArrowLeft /> Voltar
              </Button>
              <Button type="submit" variant="success">
                <FaCheck /> Enviar
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}

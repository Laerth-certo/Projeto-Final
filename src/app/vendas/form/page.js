"use client";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import Pagina from "@/Components/Pagina";

export default function VendasFormPage(props) {
  const router = useRouter();

  const [funcionarioFiltrado, setFuncionarioFiltrado] = useState([]);
  const [produtoFiltrado, setProdutoFiltrado] = useState({});
  const [clienteFiltrado, setClienteFiltrado] = useState([]);

  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];

  const vendas = JSON.parse(localStorage.getItem("vendas")) || [];
  const id = props.searchParams.id;
  const vendaEditada = vendas.find((item) => item.id == id);

  function salvar(dados) {
    if (vendaEditada) {
      Object.assign(vendaEditada, dados);
      localStorage.setItem("vendas", JSON.stringify(vendas));
    } else {
      dados.id = v4();
      vendas.push(dados);
      localStorage.setItem("vendas", JSON.stringify(vendas));
    }
    alert("Venda cadastrada com sucesso!");
    router.push("/vendas");
  }

  const initialValues = {
    cliente: "",
    produtoAdquirido: "",
    quantidade: "",
    funcionarioAtribuido: "",
    dataDaVenda: "",
    formaPagamento: "",
    localEntrega: "",
    parcelas: "",
  };

  const validationSchema = Yup.object().shape({
    cliente: Yup.string().required("Campo obrigatório"),
    produtoAdquirido: Yup.string().required("Campo Obrigatório"),
    quantidade: Yup.number().required("Campo obrigatório"),
    funcionarioAtribuido: Yup.string().required("Campo Obrigatório"),
    dataDaVenda: Yup.date().required("Campo Obrigatório"),
    formaPagamento: Yup.string().required("Campo Obrigatório"),
    localEntrega: Yup.string().required("Campo obrigatório"),
    parcelas: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo="Cadastro de Vendas">
      <Formik
        initialValues={vendaEditada || initialValues}
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
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              {/* Cliente */}
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Cliente:</Form.Label>
                  <Form.Select
                    name="cliente"
                    value={values.cliente}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cliente && !errors.cliente}
                    isInvalid={touched.cliente && errors.cliente}
                  >
                    <option value="">Selecione</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.nome}>
                        {cliente.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.cliente}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Produto Adquirido:</Form.Label>
                  <Form.Select
                    name="produtoAdquirido"
                    value={values.produtoAdquirido}
                    onChange={(e) => {
                      setFieldValue("produtoAdquirido", e.target.value);
                      const produtoSelecionado = produtos.find(
                        (produto) => produto.nome === e.target.value
                      );
                      setProdutoFiltrado(produtoSelecionado || {});
                    }}
                    onBlur={handleBlur}
                    isValid={
                      touched.produtoAdquirido && !errors.produtoAdquirido
                    }
                    isInvalid={
                      touched.produtoAdquirido && errors.produtoAdquirido
                    }
                  >
                    <option value="">Selecione</option>
                    {produtos.map((produto) => (
                      <option key={produto.id} value={produto.nome}>
                        {produto.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.produtoAdquirido}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Quantidade:</Form.Label>
                  <Form.Control
                    name="quantidade"
                    type="number"
                    value={values.quantidade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.quantidade && !errors.quantidade}
                    isInvalid={touched.quantidade && errors.quantidade}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.quantidade}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Funcionário Atribuído:</Form.Label>
                  <Form.Select
                    name="funcionarioAtribuido"
                    value={values.funcionarioAtribuido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={
                      touched.funcionarioAtribuido &&
                      !errors.funcionarioAtribuido
                    }
                    isInvalid={
                      touched.funcionarioAtribuido &&
                      errors.funcionarioAtribuido
                    }
                  >
                    <option value="">Selecione</option>
                    {funcionarios.map((funcionario) => (
                      <option key={funcionario.id} value={funcionario.nome}>
                        {funcionario.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.funcionarioAtribuido}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Data da Venda:</Form.Label>
                  <Form.Control
                    type="date"
                    name="dataDaVenda"
                    value={values.dataDaVenda}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.dataDaVenda && !errors.dataDaVenda}
                    isInvalid={touched.dataDaVenda && errors.dataDaVenda}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dataDaVenda}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

             
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Forma de Pagamento:</Form.Label>
                  <Form.Select
                    name="formaPagamento"
                    value={values.formaPagamento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.formaPagamento && !errors.formaPagamento}
                    isInvalid={touched.formaPagamento && errors.formaPagamento}
                  >
                    <option value="">Selecione</option>
                    <option value="PIX">PIX</option>
                    <option value="Débito">Débito</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Crédito">Crédito</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.formaPagamento}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Número de Parcelas:</Form.Label>
                  <InputMask
                    mask="99x"
                    value={values.parcelas}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {(inputProps) => (
                      <Form.Control
                        {...inputProps}
                        name="parcelas"
                        isValid={touched.parcelas && !errors.parcelas}
                        isInvalid={touched.parcelas && errors.parcelas}
                      />
                    )}
                  </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.parcelas}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Local da Entrega:</Form.Label>
                  <Form.Control
                    name="localEntrega"
                    value={values.localEntrega}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.localEntrega && !errors.localEntrega}
                    isInvalid={touched.localEntrega && errors.localEntrega}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.localEntrega}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="secondary"
                  onClick={() => router.push("/vendas")}
                >
                  <FaArrowLeft /> Voltar
                </Button>
                <Button type="submit" variant="success">
                  <FaCheck /> Enviar
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Pagina>
  );
}

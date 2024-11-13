"use client";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import apiLocalidades from "@/app/services/apiLocalidades";
import Pagina from "@/Components/Pagina";

export default function ClientesFormPage(props) {
  const router = useRouter();
  const [paises, setPaises] = useState([]);
  const [estados, setEstados] = useState([]);

  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const id = props.searchParams.id;
  const clienteEditado = clientes.find((item) => item.id == id);

  useEffect(() => {
    apiLocalidades.get("/paises").then((response) => setPaises(response.data));
    apiLocalidades
      .get("estados?orderBy=nome")
      .then((response) => setEstados(response.data));
  }, []);

  function salvar(dados) {
    if (clienteEditado) {
      Object.assign(clienteEditado, dados);
      localStorage.setItem("clientes", JSON.stringify(clientes));
    } else {
      dados.id = v4();
      clientes.push(dados);
      localStorage.setItem("clientes", JSON.stringify(clientes));
    }
    alert("Cliente criado com sucesso!");
    router.push("/clientes");
  }

  const initialValues = {
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    pais: "Brasil",
    estado: "",
    renda: "",
    data: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo Obrigatório"),
    telefone: Yup.string().required("Campo Obrigatório"),
    email: Yup.string().email().required("Campo Obrigatório"),
    pais: Yup.string().required("Campo obrigatório"),
    estado: Yup.string().required("Campo Obrigatório"),
    renda: Yup.string().required("Campo obrigatório"),
    data: Yup.date().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo="Cadastro de Clientes">
      <Formik
        initialValues={clienteEditado || initialValues}
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Nome:</Form.Label>
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
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>CPF:</Form.Label>
                <InputMask
                  mask="999.999.999-99" // Use values.tipoPessoa aqui
                  value={values.cpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="cpf"
                      isValid={touched.cpf && !errors.cpf}
                      isInvalid={touched.cpf && errors.cpf}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.cpf}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Data do Cadastro</Form.Label>
                <Form.Control
                  name="data"
                  type="date"
                  value={values.data}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.data && !errors.data}
                  isInvalid={touched.data && errors.data}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.data}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>País:</Form.Label>
                <Form.Select
                  name="pais"
                  value={values.pais}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.pais && !errors.pais}
                  isInvalid={touched.pais && errors.pais}
                >
                  <option value="">Selecione</option>
                  {paises.map((pais) => (
                    <option key={pais.nome} value={pais.nome}>
                      {pais.nome}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.pais}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Estado:</Form.Label>
                <Form.Select
                  name="estado"
                  value={values.estado}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={values.pais !== "Brasil"}
                  isValid={touched.estado && !errors.estado}
                  isInvalid={touched.estado && errors.estado}
                >
                  <option value="">Selecione</option>
                  {estados.map((estado) => (
                    <option key={estado.sigla} value={estado.sigla}>
                      {estado.sigla}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.estado}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Telefone:</Form.Label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="telefone"
                      isValid={touched.telefone && !errors.telefone}
                      isInvalid={touched.telefone && errors.telefone}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.telefone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Renda Anual</Form.Label>
                <InputMask
                  mask="R$ 99999,99"
                  value={values.renda}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="renda"
                      isValid={touched.renda && !errors.renda}
                      isInvalid={touched.renda && errors.renda}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.renda}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="d-flex justify-content-between mt-4">
              <Button href="/clientes">
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

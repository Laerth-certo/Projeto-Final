"use client";

import Pagina from "@/Components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function EntregadoresFormPage(props) {
  // router -> hook para navegação de telas
  const router = useRouter();

  // Recuperando id para edição
  const id = props.searchParams.id;
  const entregadores = JSON.parse(localStorage.getItem("entregadores")) || [];
  const entregadoresEditado = entregadores.find((item) => item.id == id);

  // função para salvar os dados do form
  function salvar(dados) {
    if (entregadoresEditado) {
      Object.assign(entregadoresEditado, dados);
      localStorage.setItem("entregadores", JSON.stringify(entregadores));
    } else {
      dados.id = v4();
      entregadores.push(dados);
      localStorage.setItem("entregadores", JSON.stringify(entregadores));
    }

    alert("Entregador salvo com sucesso!");
    router.push("/entregadores");
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: "",
    cpf: "",
    veiculo: "",
    telefone: "",
    placa: "",
    regiao: "",
    disponibilidade: "",
    data: "",
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    veiculo: Yup.string().required("veiculo inválido"),
    telefone: Yup.string().required("Campo obrigatório"),
    placa: Yup.string().required("Campo obrigatório"),
    regiao: Yup.string().required("Campo obrigatório"),
    disponibilidade: Yup.string().required("Campo obrigatório"),
    data: Yup.date().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Entregadores"}>
      <Formik
        initialValues={entregadoresEditado || initialValues}
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
                <Form.Label>Nome Completo:</Form.Label>
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
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Veículo:</Form.Label>
                <Form.Control
                  name="veiculo"
                  type="text"
                  value={values.veiculo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.veiculo && !errors.veiculo}
                  isInvalid={touched.veiculo && errors.veiculo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.veiculo}
                </Form.Control.Feedback>
              </Form.Group>

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
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Placa do Veículo:</Form.Label>
                <Form.Control
                  name="placa"
                  type="text"
                  value={values.placa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.placa && !errors.placa}
                  isInvalid={touched.placa && errors.placa}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.placa}
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
                <Form.Label>Região de Entrega:</Form.Label>
                <Form.Control
                  name="regiao"
                  type="text"
                  value={values.regiao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.regiao && !errors.regiao}
                  isInvalid={touched.regiao && errors.regiao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.regiao}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Disponibilidade:</Form.Label>
                <Form.Control
                  name="disponibilidade"
                  type="text"
                  value={values.disponibilidade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.disponibilidade && !errors.disponibilidade}
                  isInvalid={touched.disponibilidade && errors.disponibilidade}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.disponibilidade}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/entregadores">
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

'use client'

import Pagina from '@/Components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function FuncionarioFormPage(props) {

  // router -> hook para navegação de telas
  const router = useRouter()

  // Recuperando id para edição
  const id = props.searchParams.id
  const funcionarios = JSON.parse(localStorage.getItem('clientes')) || []
  const clienteEditado = clientes.find(item => item.id == id)

  // função para salvar os dados do form
  function salvar(dados) {
    if (clienteEditado) {
      Object.assign(clienteEditado, dados)
      localStorage.setItem('clientes', JSON.stringify(clientes))
    } else {
      dados.id = v4()
      clientes.push(dados)
      localStorage.setItem('clientes', JSON.stringify(clientes))
    }

    alert("Cliente salvo com sucesso!")
    router.push("/clientes")
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: '',
    pais: '',
    estado: '',
    data: ''
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    pais: Yup.string().required("Campo obrigatório"),
    estado: Yup.string().required("Campo obrigatório"),
    data: Yup.date().required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro do Produto"}>
      <Formik
        initialValues={clienteEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Nome do Produto:</Form.Label>
                <Form.Control
                  name='nome'
                  type='text'
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && errors.nome}
                />
                <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Código do Produto:</Form.Label>
                <Form.Control
                  name='cpf'
                  type='text'
                  value={values.cpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.cpf && !errors.cpf}
                  isInvalid={touched.cpf && errors.cpf}
                />
                <Form.Control.Feedback type='invalid'>{errors.cpf}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Preço:</Form.Label>
                <Form.Control
                  name='telefone'
                  type='text'
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.telefone && !errors.telefone}
                  isInvalid={touched.telefone && errors.telefone}
                />
                <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  name='endereco'
                  type='text'
                  value={values.endereco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.endereco && !errors.endereco}
                  isInvalid={touched.endereco && errors.endereco}
                />
                <Form.Control.Feedback type='invalid'>{errors.endereco}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>País:</Form.Label>
                <Form.Control
                  name='pais'
                  type='text'
                  value={values.pais}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.pais && !errors.pais}
                  isInvalid={touched.pais && errors.pais}
                />
                <Form.Control.Feedback type='invalid'>{errors.pais}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Estado:</Form.Label>
                <Form.Control
                  name='estado'
                  type='text'
                  value={values.estado}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.estado && !errors.estado}
                  isInvalid={touched.estado && errors.estado}
                />
                <Form.Control.Feedback type='invalid'>{errors.estado}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Data do Cadastro:</Form.Label>
                <Form.Control
                  name='data'
                  type='date'
                  value={values.data}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.data && !errors.data}
                  isInvalid={touched.data && errors.data}
                />
                <Form.Control.Feedback type='invalid'>{errors.data}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className='text-end'>
              <Button className='me-2' href='/clientes'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
            </Form.Group>

          </Form>
        )}
      </Formik>
    </Pagina>
  )
}


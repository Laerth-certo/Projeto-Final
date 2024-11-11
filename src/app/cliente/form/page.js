'use client'

import Pagina from '@/Components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ClienteFormPage(props) {

  // router -> hook para navegação de telas
  const router = useRouter()

  // Busca a lista de cliente para usar no select
  const cliente = JSON.parse(localStorage.getItem('cliente')) || []

  
  

  // Recuperando id para edição
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  // Buscar na lista a faculdade com o ID recebido no parametro
  const clienteEditado = cliente.find(item => item.id == id)
  console.log(clienteEditado)


  // função para salvar os dados do form
  function salvar(dados) {
    // Se clienteEditado existe, mudar os dados e gravar no localStorage
    if (clienteEditado) {
      Object.assign(clienteEditado, dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('cliente', JSON.stringify(cliente))
    } else {
      // se clienteEditado não existe, é criação de uma nova
      // gerar um ID (Identificador unico)
      dados.id = v4()
      // Adiciona a nova faculdade na lista de cliente
      cliente.push(dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('cliente', JSON.stringify(cliente))
    }

    alert("Cliente criado com sucesso!")
    router.push("/cliente")
  }

  

  // Campos do form e valores iniciais(default)
  const initialValues = {
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    email: '',
    enderecoCompleto: '',
    cidade: ''
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nomeCompleto: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email().required("Campo Obrigatório!"),
    enderecoCompleto: Yup.string().required("Campo obrigatório"),
    cidade: Yup.string().required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Cliente"}>

      {/* Formulário */}

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de clienteEditado
        // Se for nova, colocar o initialValues com os valores vazios
        initialValues={clienteEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
          // os valores e funções do formik
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset}) => {

            // ações do formulário
            // debug
            // console.log("DEBUG >>>")
            // console.log({values, errors, touched})


            // retorno com o template jsx do formulário
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do form */}
                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Nome Completo:</Form.Label>
                    <Form.Control
                      name='nomeCompleto'
                      type='text'
                      value={values.nomeCompleto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nomeCompleto && !errors.nomeCompleto}
                      isInvalid={touched.nomeCompleto && errors.nomeCompleto}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.nomeCompleto}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>CPF:</Form.Label>
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
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                      name='telefone'
                      value={values.telefone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.telefone && !errors.telefone}
                      isInvalid={touched.telefone && errors.telefone}
                    />
                      
                    <Form.Control.Feedback type='invalid'>{errors.area}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Email:</Form.Label>
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
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Endereço Completo:</Form.Label>
                    <Form.Control
                      name='enderecoCompleto'
                      value={values.enderecoCompleto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.enderecoCompleto && !errors.enderecoCompleto}
                      isInvalid={touched.enderecoCompleto && errors.enderecoCompleto}
                    />
                      
                    
                    <Form.Control.Feedback type='invalid'>{errors.enderecoCompleto}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Cidade:</Form.Label>
                    <Form.Control
                      name='cidade'
                      value={values.cidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.cidade && !errors.cidade}
                      isInvalid={touched.cidade && errors.cidade}
                    />
                      
                    
                    <Form.Control.Feedback type='invalid'>{errors.cidade}</Form.Control.Feedback>
                  </Form.Group>
                </Row>


                {/* botões */}
                <Form.Group className='text-end'>
                  <Button className='me-2' href='/cliente'><FaArrowLeft /> Voltar</Button>
                  <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                  <Button onClick={handleReset}> Limpar </Button>
                </Form.Group>



              </Form>
            )

          }
        }
      </Formik>

    </Pagina>
  )
}
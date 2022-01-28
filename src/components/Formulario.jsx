import { Formik, Form, Field } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import Error from './Error';

const Formulario = ( { cliente, cargando } ) => {

  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
                        .min(3, 'El nombre es muy corto')
                        .max(30, 'El nombre es muy largo')
                        .required('El nombre del cliente es obligatorio'),
    empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),
    email: Yup.string()
                        .email('El email debe de ser válido')
                        .required('El email es obligatorio'),
    telefono: Yup.number()
                        .integer('Número no válido')
                        .positive('Número no válido')
                        .typeError('El número no es válido')
  })

  const handleSubmit = async( valores ) => {
    try {
        let respuesta;
        if(cliente.id) {
            // Editando Registro
            const url = `http://localhost:4000/clientes/${ cliente.id }`;

            respuesta = await fetch( url, {
                method: 'PUT',
                body: JSON.stringify( valores ),
                headers: {
                    'Content-Type': 'application/json'
                }
            } );
        } else {
            //Nuevo Registro
            const url = 'http://localhost:4000/clientes';

            respuesta = await fetch( url, {
                method: 'POST',
                body: JSON.stringify( valores ),
                headers: {
                    'Content-Type': 'application/json'
                }
            } );
        }

        await respuesta.json();
        navigate('/clientes');
    } catch (error) {
        console.log(error);
    }
  }

  return (
      cargando ? <p>Cargando</p> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold font-xl uppercase text-center'>{ cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

                <Formik
                    initialValues={ {
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? ''
                    } }
                    enableReinitialize = { true }
                    onSubmit={ async( values, { resetForm} ) => {
                        await handleSubmit( values )

                        resetForm();
                    } }
                    validationSchema={ nuevoClienteSchema }
                
                
                >
                    {( { errors, touched } ) => {
                        // console.log( touched );
                        return (
                            <Form className='mt-10'>
                                
                            <div className='mb-4 '>
                                    <label htmlFor="nombre" className='text-gray-800'>
                                        Nombre:
                                    </label>
                                    <Field 
                                        className = "mt-2 block w-full p-3 bg-gray-50"
                                        id = "nombre"
                                        name = "nombre"
                                        placeholder = "Nombre del cliente"
                                        type = "text"
                                    />

                                    {errors.nombre && touched.nombre ? (
                                        <Error>{errors.nombre}</Error>
                                    ) : null}
                                </div> 
                                
                                <div className='mb-4 '>
                                    <label htmlFor="empresa" className='text-gray-800'>
                                        Empresa:
                                    </label>
                                    <Field 
                                        className = "mt-2 block w-full p-3 bg-gray-50"
                                        id = "empresa"
                                        name = "empresa"
                                        placeholder = "Empresa del cliente"
                                        type = "text"
                                    />
                                    {errors.empresa && touched.empresa ? (
                                        <Error>{errors.empresa}</Error>
                                    ) : null}
                                </div> 
                                
                                <div className='mb-4 '>
                                    <label htmlFor="email" className='text-gray-800'>
                                        Email:
                                    </label>
                                    <Field 
                                        className = "mt-2 block w-full p-3 bg-gray-50"
                                        id = "email"
                                        name = "email"
                                        placeholder = "Email del cliente"
                                        type = "email"
                                    />
                                    {errors.email && touched.email ? (
                                        <Error>{errors.email}</Error>
                                    ) : null}
                                </div> 
                                
                                <div className='mb-4 '>
                                    <label htmlFor="telefono" className='text-gray-800'>
                                        Teléfono:
                                    </label>
                                    <Field 
                                        className = "mt-2 block w-full p-3 bg-gray-50"
                                        id = "telefono"
                                        name = "telefono"
                                        placeholder = "Teléfono del cliente"
                                        type = "tel"
                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <Error>{errors.telefono}</Error>
                                    ) : null}
                                </div> 
                                
                                <div className='mb-4 '>
                                    <label htmlFor="notas" className='text-gray-800'>
                                        Notas:
                                    </label>
                                    <Field 
                                        as="textarea"
                                        className = "mt-2 block w-full p-3 bg-gray-50 h-40"
                                        id = "notas"
                                        name = "notas"
                                        placeholder = "Notas del cliente"
                                        type = "text"
                                    />
                                </div> 

                                <input className='mt-5 w-full -p-3 text-white uppercase font-bold bg-blue-900 text-lg rounded-md' type="submit" value={ cliente?.nombre ? 'Editar Cliente' : "Agregar Cliente"} />
                            </Form>
                    )}}
                </Formik>
            </div>
      )
    );
};

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario;

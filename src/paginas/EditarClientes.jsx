import Formulario from "../components/Formulario";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const EditarClientes = () => {
  const [cliente, setCliente] = useState([]);
  const [cargando, setCargando] = useState( false );
  const { id } = useParams();
  
  
  useEffect(() => {
    setCargando( !cargando );
    const obtenerClienteApi = async() => {
        try {
            const respuesta = await fetch(`http://127.0.0.1:4000/clientes/${ id }`);
            const resultado = await respuesta.json();

            setCliente( resultado );
        } catch (error) {
            console.log( error );
        }
        setCargando( false );
    }
    obtenerClienteApi();
  }, []);
  
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3'>Llena los siguientes campos para editar un cliente</p>

        { cliente?.nombre ? (
          <Formulario 
            cliente = { cliente }
            cargando = { cargando }
          />
        ) : <p className="text-red-500">Cliente ID no válido</p>}
    </>
    );
};

export default EditarClientes;

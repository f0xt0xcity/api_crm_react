import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import EditarClientes from './paginas/EditarClientes'
import VerCliente from './paginas/VerCliente'
import Inicio from './paginas/Inicio'
import NuevoCliente from './paginas/NuevoCliente'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/clientes" element = { <Layout /> }>
          <Route index element = { <Inicio /> }/>
          <Route path="nuevo" element = { <NuevoCliente /> }/>
          <Route path="editar/:id" element = { <EditarClientes /> }/>
          <Route path=":id" element = { <VerCliente /> }/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

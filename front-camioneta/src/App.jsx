import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Pages/Layout/Layout'
import Camionetas from './Pages/Camionetas/Camionetas'
import Clientes from './Pages/Clientes/Clientes'
import Pedidos from './Pages/Pedidos/Pedidos'
import NuevoPedido from './Pages/NuevoPedido/NuevoPedido'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="camionetas" element={<Camionetas />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="/nuevo-pedido" element={<NuevoPedido />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

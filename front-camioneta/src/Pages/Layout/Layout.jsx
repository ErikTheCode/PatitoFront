import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css";
const Layout = () => {
  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/camionetas">Camionetas</Link>
          </li>
          <li>
            <Link to="/clientes">Clientes</Link>
          </li>
          <li>
            <Link to="/pedidos">Pedidos</Link>
          </li>
        </ul>
      </nav>
      <hr />

      <Outlet />

      
    </div>
  );
};

export default Layout;

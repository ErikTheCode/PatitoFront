import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import TablaPedidos from "../../components/TablaPedidos/TablaPedidos";
import ModalPedidos from "../../components/ModalPedidos/ModalPedidos";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8082/api/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const safeData = Array.isArray(data) ? data : [data];
        setPedidos(safeData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [openModal]);
  return (
    <div className="panel">
      <h2>Pedidos</h2>
      <div className="div-button">
        <Link to="/nuevo-pedido">
          <Button type="primary">Nuevo pedido</Button>
        </Link>
      </div>
      <div className="div-table">
        <TablaPedidos dataPedidos={pedidos} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Pedidos;

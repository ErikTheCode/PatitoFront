import { useEffect, useState } from "react";
import { Button } from "antd";
import TablaClientes from "../../components/TablaClientes/TablaClientes";
import ModalCliente from "../../components/ModalCliente/ModalCliente";

const Clientes = () => {
  const [clientes, setClietes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8082/api/customers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const safeData = Array.isArray(data) ? data : [data];
        setClietes(safeData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [openModal]);
  return (
    <div className="panel">
      <h2>Clientes</h2>
      <div className="div-button">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Agregar Cliente
        </Button>
      </div>
      <div className="div-table">
        <TablaClientes dataClientes={clientes} isLoading={isLoading} />
      </div>
      <ModalCliente openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Clientes;

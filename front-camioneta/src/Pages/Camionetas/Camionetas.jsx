import { useEffect, useState } from "react";
import { Button, Col } from "antd";
import TablaCamionetas from "../../components/TablaCamionetas/TablaCamionetas";
import ModalCamioneta from "../../components/ModalCamioneta/ModalCamioneta";
import "./Camioneta.css";

const Camionetas = () => {
  const [camionetas, setCamionetas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8082/api/trucks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const safeData = Array.isArray(data) ? data : [data];
        setCamionetas(safeData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="panel">
      <h2>Camionetas</h2>
      <div className="div-button">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Agregar Camioneta
        </Button>
      </div>
      <div className="div-table">
        <TablaCamionetas dataCamionetas={camionetas} isLoading={isLoading} />
      </div>

      <ModalCamioneta openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Camionetas;

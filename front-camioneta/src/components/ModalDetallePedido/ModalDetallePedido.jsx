import React from "react";
import { Table, Modal } from "antd";

const columns = [
    {
      title: "Marca",
      dataIndex: "marca",
      key: "marca",
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      key: "modelo",
    },
    {
      title: "Precio bruto",
      dataIndex: "bruto",
      key: "bruto",
    },
    {
        title: "Procentaje de descuento",
        key: "descuento",
        dataIndex: "descuento"
      },
    {
      title: "Decuento",
      key: "descuento_aplicado",
      dataIndex: "descuento_aplicado",
    },

    {
      title: "Precio final",
      key: "precio_final",
      dataIndex: "precio_final",
    },
    
   
  ];

const ModalDetallePedido = ({ openModal, setOpenModal, dataDetallesPedido, isLoading }) => {

const handleCerrarModal = () =>{
    setOpenModal(false)
}

  return (
    <Modal
      title="Nueva camioneta"
      centered
      open={openModal}
      onCancel={handleCerrarModal}
      footer={null} 
      width={1000}
    >
      <Table  columns={columns}
       dataSource={dataDetallesPedido}
       isLoading={isLoading}/>
    </Modal>
  );
};

export default ModalDetallePedido;
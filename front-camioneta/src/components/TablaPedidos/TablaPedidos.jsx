import React from "react";
import { useState } from "react";
import { Space, Table, Button } from "antd";
import { InfoCircleOutlined, SyncOutlined } from "@ant-design/icons";
import ModalDetallePedido from "../ModalDetallePedido/ModalDetallePedido";
import ModalPedidos from "../ModalPedidos/ModalPedidos";
const TablaPedidos = ({ dataPedidos, isLoading }) => {
  const [isLoadingDetalle, setIsLoadingDetalle] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [dataDetallesPedido, setDataDetallesPedido] = useState([]);
  const [openModalModalEstatus, setOpenModalEstatus] = useState(false);
  const [idPedido, setIdPedido] = useState(0);
  const handlerAbrirModal = (idPedido) => {
    fetch("http://localhost:8082/api/orders/orden-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idPedido,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const safeData = Array.isArray(data) ? data : [data];
        setDataDetallesPedido(safeData);
        console.log(data);
        setIsLoadingDetalle(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoadingDetalle(false);
      });

    setOpenModal(true);
  };

  const handlerAbrirModalEstatus = (idPedido) => {
    setIdPedido(idPedido)
    setOpenModalEstatus(true);
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Cliente",
      dataIndex: "nombre_completo",
      key: "nombre_completo",
    },
    {
      title: "Estatus",
      dataIndex: "estatus",
      key: "estatus",
    },
    {
      title: "Fecha creación",
      dataIndex: "fecha_creacion",
      key: "fecha_creacion",
    },
    {
      title: "No. Camionetas",
      dataIndex: "numero_de_camionetas",
      key: "numero_de_camionetas",
    },
    {
      title: "Total",
      key: "total",
      dataIndex: "total",
      render: (text) => {
        return <p>{`$${text}`}</p>;
      },
    },

    {
      title: "Vendedor",
      key: "vendedor",
      dataIndex: "vendedor",
    },
    {
      title: "Tienda",
      key: "cuidad",
      dataIndex: "cuidad",
    },
    {
      title: "Acciones",
      render: (_, record) => {
        return (
          <>
            <Space size="middle">
              <Button
                type="default"
                icon={<InfoCircleOutlined />}
                onClick={() => handlerAbrirModal(record.id)}
              />
            </Space>
            {record.estatus === "PENDIENTE" ? (
              <Space size="middle">
                <Button
                  type="default"
                  icon={<SyncOutlined />}
                  onClick={() => handlerAbrirModalEstatus(record.id)}
                />
              </Space>
            ) : null}
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={dataPedidos} isLoading={isLoading} />

      <ModalDetallePedido
        openModal={openModal}
        setOpenModal={setOpenModal}
        dataDetallesPedido={dataDetallesPedido}
        isLoading={isLoadingDetalle}
      />

      <ModalPedidos
        openModal={openModalModalEstatus}
        setOpenModal={setOpenModalEstatus}
        idPedido={idPedido}
        setIdPedido={setIdPedido}
      />
    </>
  );
};
export default TablaPedidos;

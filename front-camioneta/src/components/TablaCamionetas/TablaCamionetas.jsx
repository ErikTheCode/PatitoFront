import React from "react";
import { Table } from "antd";

const TablaCamionetas = ({ dataCamionetas, isLoading }) => {
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
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
      title: "Precio",
      key: "precio",
      dataIndex: "precio",
      render: (text) => {
        var number = Number(text)
        return <p>{`$${number.toLocaleString("en-US")}`}</p>  
      },
    },

    {
      title: "Existencia",
      key: "disponibilidad",
      dataIndex: "disponibilidad",
    },
    {
      title: "Descuento",
      key: "descuento",
      dataIndex: "descuento",
      render: (text) => <p>{`${text === null ? '0' : text}%`}</p>,
    },
   
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataCamionetas}
      isLoading={isLoading}
    />
  );
};
export default TablaCamionetas;

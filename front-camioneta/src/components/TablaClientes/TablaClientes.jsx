import React from "react";
import { Table } from "antd";

const TablaClientes = ({ dataClientes, isLoading }) => {
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Nombre completo",
      dataIndex: "nombreCompleto",
      key: "nombreCompleto",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataClientes}
      isLoading={isLoading}
    />
  );
};
export default TablaClientes;

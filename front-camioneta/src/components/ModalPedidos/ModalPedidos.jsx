import React, { useState } from "react";
import { Button, Form, Modal, Select, notification } from "antd";

const ModalPedidos = ({ openModal, setOpenModal, idPedido, setIdPedido }) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const { Option } = Select;

  const openNotificationWithIcon = (type) => {
    var mensaje
    var descrip
    switch (type) {
      case 'success':
        mensaje = 'Modifico correctamente'
        descrip = 'El estatus ha sido modificado'

        break;
      case 'warning':
        mensaje = 'No se modifico'
        descrip = 'El estatus no ha sido modificado debido a que han pasado 10 min.'
        break;
      default:
        mensaje = 'Error'
        descrip = 'Error'
    }
    api[type]({
      message: mensaje,
      description: descrip,
    });
  };

  const handleSubmit = (values) => {
    const json = {
      estatus: values.estatus,
      id: idPedido,
    };

    console.log(json);

    fetch("http://localhost:8082/api/orders/order-update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:  JSON.stringify(json),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
       
      })
      .then((data) => {
      
        console.log(data.estatus )
        if ( data.estatus === 'true'){
          openNotificationWithIcon("success")
        }else if (data.estatus === 'false') {
          openNotificationWithIcon("warning")
        }
        else {
          openNotificationWithIcon("error")
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      })

    handleCerrarModal();
  };

  const handleCerrarModal = () => {
    setOpenModal(false);
    setIdPedido(0);
    form.resetFields();
  };

  return (
    <Modal
      title="Actualizar estatus"
      centered
      open={openModal}
      onCancel={handleCerrarModal}
      footer={null}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          estatus: "ENTREGADO",
        }}
        onFinish={handleSubmit}
      >
        <Form.Item label="Nuevo estatus" name="estatus" required>
          <Select defaultValue="1">
            <Option value="ENTREGADO">ENTREGADO</Option>
            <Option value="CANCELADO">CANCELADO</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default ModalPedidos;

import React, { useState } from "react";
import { Button, Form, Input, Modal, Tag, notification } from "antd";

const ModalCliente = ({ openModal, setOpenModal }) => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const [api, contextHolder] = notification.useNotification();

  const customizeRequiredMark = (label, { required }) => (
    <>
      {required ? (
        <Tag color="error">Obligatorio</Tag>
      ) : (
        <Tag color="warning">optional</Tag>
      )}
      {label}
    </>
  );

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const jsonData = JSON.stringify(values);

        fetch("http://localhost:8082/api/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        })
          .then((response) => {
            if (response.ok) {
              form.resetFields();
              openNotificationWithIcon("success");
            } else {
              form.resetFields();
            }
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
          });
      })
      .catch((errorInfo) => {
        console.error("Failed to submit form:", errorInfo);
      });
  };

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: type === "success" ? "Cliente guardado " : "Ocurrio un problema",
      description:
        type === "success"
          ? "El dato se ha guardado correctamente"
          : "No se ha guardado, huno un problema   ",
    });
  };
  const handleCerrarModal = () => {
    setOpenModal(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Nuevo cliente"
      centered
      open={openModal}
      onCancel={handleCerrarModal}
      footer={null}
      width={1000}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        requiredMark={customizeRequiredMark}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Nombre Completo"
          name="nombreCompleto"
          required
          tooltip="Ingrese su nombre completo"
          rules={[{ required: true, message: "Por favor ingrese su nombre" }]}
        >
          <Input placeholder="José Antonio Perez Madrigal" />
        </Form.Item>
        <Form.Item
          label="Correo"
          name="email"
          required
          tooltip="Ingrese su correo"
          rules={[{ required: true, message: "Por favor ingrese su correo" }]}
        >
          <Input placeholder="pago@gmail.com" />
        </Form.Item>

        <Form.Item
          label="Telefóno"
          name="tel"
          required
          tooltip="Ingrese su numero telefonicó"
          rules={[
            { required: true, message: "Por favor ingrese su telefonicó" },
          ]}
        >
          <Input placeholder="pago@gmail.com" />
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

export default ModalCliente;

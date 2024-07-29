import React, { useState } from "react";
import { Button, Form, Input, Modal, Tag, InputNumber, Row, Col } from "antd";

const ModalCamioneta = ({ openModal, setOpenModal }) => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");

  
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
    form.validateFields()
        .then(values => {
            const jsonData = JSON.stringify(values);

            fetch('http://localhost:8082/api/trucks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            })
            .then(response => {
                if (response.ok) {
                    form.resetFields();
                } else {
                    form.resetFields();
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
        })
        .catch(errorInfo => {
            console.error('Failed to submit form:', errorInfo);
        });
};
const handleCerrarModal = () =>{
    setOpenModal(false)
    form.resetFields();
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
          label="Marca"
          name="marca"
          required
          tooltip="La marca a la que corresponde la camioneta"
          rules={[{ required: true, message: 'Por favor ingrese la marca' }]}
          
        >
          <Input placeholder="Volkswagen" />
        </Form.Item>
        <Form.Item
          label="Modelo"
          name="modelo"
          required
          tooltip="Modelo al que corresponde la camioneta"
          rules={[{ required: true, message: 'Por favor ingrese el modelo' }]}
        >
          <Input placeholder="Volkswagen Saveiro" />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item label="Precio" name="precio" required tooltip="Precio al publico" rules={[{ required: true, message: 'Por favor ingrese el precio' }]}>
              <InputNumber placeholder="100,000" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Disponibles"
              name="disponibilidad"
              required
              tooltip="Num de piezas disponibles"
              rules={[{ required: true, message: 'Por favor ingrese el numero de disponibilidad' }]}
            >
              <InputNumber placeholder="10" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Descuento" name="descuento" tooltip="Porcentaje de descuento">
              <InputNumber placeholder="10" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCamioneta;

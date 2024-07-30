import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Steps,
  theme,
  Select,
  Form,
  Tag,
  notification,
  Card,
  Col,
  Row,
  List,
  Descriptions,
} from "antd";
import "./NuevoPedido.css";
const NuevoPedido = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [vista, setVista] = useState(0);
  const [clientes, setClientes] = useState([]);
  const [camionetas, setCamionetas] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [selectedCamionetas, setSelectedCamionetas] = useState([]);
  const [formData, setFormData] = useState({
    clienteId: null,
    vendedorId: null,
    camionetasIds: [],
    isDecuento: 0,
  });
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const { Option } = Select;

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
        setClientes(safeData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch("http://localhost:8082/api/salesperson")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const safeData = Array.isArray(data) ? data : [data];
        setVendedores(safeData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChange = (value) => {
    // `value` contiene los IDs de las camionetas seleccionadas
    setSelectedCamionetas(value);
  };

  const aplicarDescuento = (precioBruto, porcentaje) => {
    const descuento = (precioBruto * porcentaje) / 100;
    return Number(precioBruto - descuento);
  };

  const detalleVentaCamioneta = (item) => {
    return (
      <>
        <p>Modelo: {item?.modelo}</p>
        <p>Precio bruto: { `$${Number(item?.precio ).toLocaleString("en-US")}`}</p>
        <p>Descuento: { formData?.isDecuento === 1 ?  `${Number(item?.descuento ).toLocaleString("en-US")}%`: "No"}</p>
        <p>
          Precio final:{" "}
          {formData?.isDecuento === 1
            ? `$${aplicarDescuento(item?.precio, item?.descuento).toLocaleString("en-US")}`
            : Number(item?.precio).toLocaleString("en-US")}
        </p>
      </>
    );
  };
  const seletedCliente = clientes.find((c) => c.id === formData?.clienteId);
  const seletedVendedor = vendedores.find((c) => c.id === formData?.vendedorId);
  const pasos = [
    {
      title: "Cliente",
      content: (
        <>
          <Row gutter={16}>
            <Col xs={24} sm={10}>
              <Form.Item
                label="Cliente"
                name="clienteId"
                required
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione un cliente",
                  },
                ]}
              >
                <Select placeholder="Selecciona un cliente">
                  {clientes.map((cliente) => (
                    <Option key={cliente.id} value={cliente.id}>
                      {cliente.nombreCompleto}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={10}>
              <Form.Item
                label="Vendedor"
                name="vendedorId"
                required
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione un vendedor",
                  },
                ]}
              >
                <Select placeholder="Selecciona un vendedor">
                  {vendedores.map((vendedor) => (
                    <Option key={vendedor.id} value={vendedor.id}>
                      {vendedor.nombreCompleto}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={10}>
              <Form.Item label="Aplica descuento" name="isDecuento">
                <Select placeholder="Selecciona">
                  <Option key={1} value={1}>
                    Descuento
                  </Option>
                  <Option key={2} value={0}>
                    Sin descuento
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: "Camioneta",
      content: (
        <>
          <Form.Item
            label="Camioneta"
            name="camionetasIds"
            rules={[
              { required: true, message: "Selecciona una o mas camionetas" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Selecciona una o mas camionetas"
              allowClear
              onChange={handleChange}
              value={selectedCamionetas}
            >
              {camionetas.map((camioneta) => (
                <Option
                  key={camioneta.id}
                  value={camioneta.nombreCompleto}
                  disabled={camioneta.disponibilidad === 0}
                >
                  {`${camioneta.marca}-${
                    camioneta.modelo
                  } $${camioneta.precio.toLocaleString("en-US")}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      ),
    },
    {
      title: "Confirmar",
      content: (
        <>
          <div>
            <Descriptions title="Detalles del Cliente" bordered>
              <Descriptions.Item label="Nombre">
                {seletedCliente
                  ? seletedCliente.nombreCompleto
                  : "Cliente no encontrado"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {seletedCliente ? seletedCliente.email : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Teléfono">
                {seletedCliente ? seletedCliente.telefono : "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              title="Detalles del Vendedor"
              bordered
              style={{ marginTop: "20px" }}
            >
              <Descriptions.Item label="Nombre">
                {seletedVendedor
                  ? seletedVendedor.nombreCompleto
                  : "Vendedor no encontrado"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {seletedVendedor ? seletedVendedor.email : "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </div>

          <List
            style={{ marginTop: "20px" }}
            grid={{ gutter: 16, column: 4 }}
            dataSource={camionetas.filter((item) =>
              selectedCamionetas.includes(item.id.toString())
            )}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.marca}> {detalleVentaCamioneta (item) }</Card>
              </List.Item>
            )}
          />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Confirmar
            </Button>
          </Form.Item>
        </>
      ),
    },
  ];

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

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: type === "success" ? "Pedido guardado " : "Ocurrio un problema",
      description:
        type === "success"
          ? "El dato se ha guardado correctamente"
          : "No se ha guardado, huno un problema   ",
      onClose: () => {
        // Redirigir al cerrar la notificación
        navigate("/pedidos");
      },
    });
  };
  const next = () => {
    form
      .validateFields()
      .then((values) => {
        setFormData((prevData) => ({
          ...prevData,
          ...values,
        }));
        setVista(vista + 1);
        console.log("Camionetas seleccionadas:", selectedCamionetas);
      })
      .catch((info) => {
        console.log("Validación fallida:", info);
      });
    setVista(vista + 1);
  };
  const prev = () => {
    setVista(vista - 1);
  };
  const items = pasos.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const onFinish = (values) => {
    const finalData = { ...formData, ...values };

    const jsonData = JSON.stringify(finalData);
    console.log(jsonData);

    fetch("http://localhost:8082/api/orders", {
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
  };
  return (
    <div className="panel">
      <div className="sub-panel">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
          requiredMark={customizeRequiredMark}
          onFinish={onFinish}
        >
          <Steps current={vista} items={items} />
          <div style={contentStyle}>{pasos[vista].content}</div>
          <div
            style={{
              marginTop: 24,
            }}
          >
            {vista < pasos.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Siguiente
              </Button>
            )}

            {vista > 0 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Volver
              </Button>
            )}
          </div>
        </Form>
      </div>

      {contextHolder}
    </div>
  );
};

export default NuevoPedido;

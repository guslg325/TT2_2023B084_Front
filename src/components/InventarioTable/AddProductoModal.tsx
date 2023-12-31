import { Modal, Input, Form, Select, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { getAllMarcas, addProducto } from '../../services';
const { Option } = Select;
type addProductFormType = {
  codigo: string;
  nombre: string;
  marca: string;
  stock: number;
  precio: number;
};
type AddProductoModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reloader?: () => void;
};

export default function AddProductoModal({
  isOpen,
  setIsOpen,
  reloader
}: AddProductoModalProps) {
  const [listaMarcas, setListaMarcas] = useState<Marca[]>([]);
  const [confirmloading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const addProduct = (values: addProductFormType) => {
    const input: Producto = {
      key: values.codigo,
      codigo: values.codigo,
      nombre: values.nombre,
      marca: values.marca,
      existencias: values.stock,
      precio_unitario: values.precio,
    }
    setConfirmLoading(true);
    addProducto(input)
    .then((_response) => {
      setConfirmLoading(false)
      form.resetFields();
      setIsOpen(false);
      if (reloader){
        reloader()
      }
    })
    .catch((error) => {
      console.log(error)
      setConfirmLoading(false)
    })
    // console.log(values);
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setIsOpen(false);
    //   setConfirmLoading(false);
    //   form.resetFields();
    //   setIsOpen(false);
    // }, 2000);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };
  useEffect(() => {
    getAllMarcas().then((response) => {
      setListaMarcas(response);
    })
  }, [isOpen]);
  return (
    <Modal
      confirmLoading={confirmloading}
      title="Agregar Producto"
      open={isOpen}
      onOk={form.submit}
      okType="default"
      cancelText="Cancelar"
      okText="Subir"
      onCancel={handleCancel}>
      <Form form={form} onFinish={addProduct}>
        <Form.Item<addProductFormType>
          label="Codigo"
          name="codigo"
          rules={[
            {
              required: true,
              message: 'por favor ingresa el codigo de barras del producto',
            },
            {
              max: 20,
              message: 'El maximo de caracteres que puede ingresar son 20',
            },
          ]}>
          <Input placeholder="codigo de barras o identificador" />
        </Form.Item>
        <Form.Item<addProductFormType>
          label="Nombre"
          name="nombre"
          rules={[
            {
              required: true,
              message: 'por favor ingresa el nombre del producto.',
            },
          ]}>
          <Input placeholder="nombre del producto" />
        </Form.Item>
        <Form.Item<addProductFormType>
          label="Marca"
          name="marca"
          rules={[
            {
              required: true,
              message: 'por favor ingresa el nombre del producto.',
            },
          ]}>
          <Select placeholder="seleccione la marca relacionada al producto.">
            {listaMarcas.map((item: Marca) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.marca}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item<addProductFormType>
          label="Stock"
          name="stock"
          rules={[
            {
              required: true,
              message: 'por favor ingresa la cantidad actual del producto.',
            },
          ]}
          initialValue={0}>
          <InputNumber placeholder="cantidad actual de productos" min={0} />
        </Form.Item>
        <Form.Item<addProductFormType>
          label="Precio"
          name="precio"
          rules={[
            {
              required: true,
              message: 'por favor ingresa el precio del producto.',
            },
          ]}
          initialValue={0}>
          <InputNumber prefix="$" placeholder="Precio del producto" min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

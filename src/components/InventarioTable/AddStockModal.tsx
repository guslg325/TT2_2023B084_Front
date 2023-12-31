import { Form, InputNumber, Modal } from 'antd';
import { useState } from 'react';
import { addStockProduct } from '../../services';

type AddStockModalProps = {
  currentProducto: Producto;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reloader?: () => void;
};
type addProductFormType = {
  codigo: string;
  nombre: string;
  marca: string;
  stock: number;
  precio: number;
};
export default function AddStockModal({
  isOpen,
  setIsOpen,
  currentProducto,
  reloader
}: AddStockModalProps) {
  const [confirmloading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };
  const addStock = (values: addProductFormType) => {
    setConfirmLoading(true);
    addStockProduct({
      codigo: currentProducto.codigo,
      newstock: values.stock,
    }).then((_response) => {
      setConfirmLoading(false);
      form.resetFields();
      if (reloader) {
        reloader();
      }
      setIsOpen(false);
    })
    // setTimeout(() => {
    //   setIsOpen(false);
    //   setConfirmLoading(false);
    //   form.resetFields();
    //   setIsOpen(false);
    // }, 2000);
  };
  const { existencias } = currentProducto;
  return (
    <Modal
      confirmLoading={confirmloading}
      title={`Agregar Cantidad (actual: ${existencias})`}
      open={isOpen}
      onOk={form.submit}
      okType="default"
      cancelText="Cancelar"
      okText="Subir"
      onCancel={handleCancel}>
      <Form form={form} onFinish={addStock}>
        <Form.Item label="Nueva cantidad" name="stock" initialValue={1}>
          <InputNumber prefix="+" style={{ width: '100%' }} min={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
}


import { Form,  Modal, Input } from 'antd';
import React from 'react';
import { useState } from 'react';

type AddMarcaModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type addProductFormType = {
  codigo: string;
  nombre: string;
  marca: string;
  stock: number;
  precio: number;
};
export default function AddMarcaModal({
  isOpen,
  setIsOpen,
}: AddMarcaModalProps) {
  const [confirmloading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };
  const addMarca = (values: addProductFormType) => {
    console.log(values);
    setConfirmLoading(true);
    setTimeout(() => {
      setIsOpen(false);
      setConfirmLoading(false);
      form.resetFields();
      setIsOpen(false);
    }, 2000);
  };
  return (
    <Modal
      confirmLoading={confirmloading}
      title={`Crear Marca`}
      open={isOpen}
      onOk={form.submit}
      okType="default"
      cancelText="Cancelar"
      okText="Subir"
      onCancel={handleCancel}>
      <Form form={form} onFinish={addMarca}>
        <div>
          <p>
            Añade una marca que necesites para tus productos
          </p>
        </div>
        <Form.Item label="Marca" name="merma" initialValue={1}>
          <Input placeholder="nombre del producto" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
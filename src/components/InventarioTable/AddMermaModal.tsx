import { Form, InputNumber, Modal } from 'antd';
import { useState } from 'react';
import { removeStock } from '../../services';

type AddMermaModalProps = {
  currentProducto: Producto;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reloader?: () => void;
};
// type addProductFormType = {
//   codigo: string;
//   nombre: string;
//   marca: string;
//   stock: number;
//   precio: number;
// };
export default function AddMermaModal({
  isOpen,
  setIsOpen,
  currentProducto,
  reloader
}: AddMermaModalProps) {
  const [confirmloading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };
  const addMerma = (values: { merma: number }) => {
    console.log(values);
    setConfirmLoading(true);
    // setTimeout(() => {
    //   setIsOpen(false);
    //   setConfirmLoading(false);
    //   form.resetFields();
    //   setIsOpen(false);
    // }, 2000);
    removeStock({ codigo: currentProducto.codigo, merma: values.merma }).then(
      (response) => {
        console.log(response);
        setConfirmLoading(false);
        setIsOpen(false);
        if(reloader){
          reloader()
        }
      }
    );
  };
  const { existencias } = currentProducto;
  return (
    <Modal
      confirmLoading={confirmloading}
      title={`Agregar Merma  (cantidad actual: ${existencias})`}
      open={isOpen}
      onOk={form.submit}
      okType="default"
      cancelText="Cancelar"
      okText="Subir"
      onCancel={handleCancel}>
      <Form form={form} onFinish={addMerma}>
        <div>
          <p>
            La merma es una forma de reportar perdidas en el inventario no
            relacionadas con las ventas ya sea por caducidad, robo, extravio o
            mal conteo
          </p>
        </div>
        <Form.Item label="Merma" name="merma" initialValue={1}>
          <InputNumber
            prefix="-"
            style={{ width: '100%' }}
            min={1}
            max={existencias}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

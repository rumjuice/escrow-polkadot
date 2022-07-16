import { useFormik } from "formik";
import { FC } from "react";
import { Button, Input } from ".";
import { Transaction } from "../Model";

interface Props {
  onSubmit(values: Omit<Transaction, "seller">): void;
}

const CreateTransaction: FC<Props> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      productId: "",
      buyer: "",
      price: "",
    },
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      setTimeout(() => resetForm(), 2000);
    },
    validateOnChange: true,
    enableReinitialize: true,
  });

  return (
    <div className="divide-y rounded-xl shadow-md bg-white">
      <header className="font-medium text-gray-900 p-4">
        Create New Transaction
      </header>
      <div className="flex flex-col gap-2 p-4 text-sm">
        <Input
          title="Product ID"
          name="productId"
          value={formik.values.productId}
          placeholder="Input product id"
          onChange={formik.handleChange}
        />
        <Input
          title="Buyer Address"
          name="buyer"
          value={formik.values.buyer}
          placeholder="Input buyer address"
          onChange={formik.handleChange}
        />
        <Input
          title="Product Price"
          name="price"
          value={formik.values.price}
          placeholder="Input product price"
          onChange={formik.handleChange}
        />
        <Button title="Create" onSubmit={() => formik.handleSubmit()} />
      </div>
    </div>
  );
};

export default CreateTransaction;

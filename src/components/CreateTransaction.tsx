import { useFormik } from "formik";
import { FC } from "react";
import { Transaction } from "../Model";
import Input from "./Input";

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
    <div className="rounded-xl shadow-md bg-white">
      <header className="font-medium text-gray-900 p-4 border-b-2">
        Create New Transaction
      </header>
      <div className="flex flex-col gap-2 p-4 text-sm">
        <Input
          title="Product ID"
          name="productId"
          value={formik.values.productId}
          onChange={formik.handleChange}
        />
        <Input
          title="Buyer Address"
          name="buyer"
          value={formik.values.buyer}
          onChange={formik.handleChange}
        />
        <Input
          title="Product Price"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
        />
        <button
          type="submit"
          onClick={() => formik.handleSubmit()}
          className="max-w-fit inline-flex justify-center px-4 py-1 mt-2 ml-auto text-sm font-medium text-gray-100 bg-gray-900 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateTransaction;

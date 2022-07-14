import { useFormik } from "formik";
import { FC } from "react";
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
    <div className="rounded-xl shadow-md bg-white">
      <header className="font-medium text-gray-900 p-4 border-b-2">
        Create New Transaction
      </header>
      <div className="flex flex-col gap-2 p-4 text-sm">
        <div className="flex items-center">
          <span className="w-1/3">Product ID:</span>
          <input
            name="productId"
            className="flex-1 rounded-md p-1 flex-row justify-start items-center inline-flex border border-gray-200 text-sm focus:bg-slate-50 focus:border-gray-500 outline-none"
            placeholder="Input product id"
            value={formik.values.productId}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex items-center">
          <span className="w-1/3">Buyer Address:</span>
          <input
            name="buyer"
            className="flex-1 rounded-md p-1 flex-row justify-start items-center inline-flex border border-gray-200 text-sm focus:bg-slate-50 focus:border-gray-500 outline-none"
            placeholder="Input buyer address"
            value={formik.values.buyer}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex items-center">
          <span className="w-1/3">Product Price:</span>
          <input
            name="price"
            className="flex-1 rounded-md p-1 flex-row justify-start items-center inline-flex border border-gray-200 text-sm focus:bg-slate-50 focus:border-gray-500 outline-none"
            placeholder="Input product price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
        </div>
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

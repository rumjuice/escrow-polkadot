import { useFormik } from "formik";
import { FC } from "react";
import Button from "./Button";
import Input from "./Input";

interface Props {
  onSubmit(productId: string): void;
}

const CheckTransaction: FC<Props> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      productId: "",
    },
    onSubmit: (values, { resetForm }) => {
      onSubmit(values.productId);
      setTimeout(() => resetForm(), 2000);
    },
    validateOnChange: true,
    enableReinitialize: true,
  });

  return (
    <div className="divide-y rounded-xl shadow-md bg-white">
      <header className="font-medium text-gray-900 p-4">
        Check a Transaction
      </header>
      <div className="flex flex-col gap-2 p-4 text-sm">
        <Input
          title="Product ID"
          name="productId"
          placeholder="Input product id"
          value={formik.values.productId}
          onChange={formik.handleChange}
        />
        <div className="ml-auto mt-2">
          <Button title="Check" onSubmit={() => formik.handleSubmit()} />
        </div>
      </div>
    </div>
  );
};

export default CheckTransaction;

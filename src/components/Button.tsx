import { FC } from "react";

interface Props {
  title: string;
  onSubmit(): void;
}

const Button: FC<Props> = ({ title, onSubmit }) => {
  return (
    <button
      type="submit"
      onClick={onSubmit}
      className="max-w-fit inline-flex justify-center px-4 py-1 mt-2 ml-auto text-sm font-medium text-gray-100 bg-gray-900 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
    >
      {title}
    </button>
  );
};

export default Button;

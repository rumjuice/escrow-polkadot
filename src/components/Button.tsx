import { FC } from "react";

interface Props {
  title: string;
  type?: "pay" | "confirm";
  onSubmit(): void;
}

const Button: FC<Props> = ({ title, onSubmit, type }) => {
  const renderButton = () => {
    switch (type) {
      case "pay":
        return (
          <button
            type="submit"
            onClick={onSubmit}
            className={`max-w-fit inline-flex justify-center px-4 py-1 text-sm font-medium text-white bg-amber-900 border border-transparent rounded-md hover:bg-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500`}
          >
            {title}
          </button>
        );
      case "confirm":
        return (
          <button
            type="submit"
            onClick={onSubmit}
            className={`max-w-fit inline-flex justify-center px-4 py-1 text-sm font-medium text-white bg-emerald-900 border border-transparent rounded-md hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500`}
          >
            {title}
          </button>
        );
      default:
        return (
          <button
            type="submit"
            onClick={onSubmit}
            className={`max-w-fit inline-flex justify-center px-4 py-1 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500`}
          >
            {title}
          </button>
        );
        break;
    }
  };

  return renderButton();
};

export default Button;

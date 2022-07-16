import { ChangeEvent, FC } from "react";

interface Props {
  title: string;
  value: string;
  name: string;
  placeholder: string;
  onChange(e: ChangeEvent): void;
}

const Input: FC<Props> = ({ title, value, name, placeholder, onChange }) => {
  return (
    <div className="flex items-center">
      <span className="w-1/3">{title}:</span>
      <input
        name={name}
        className="flex-1 rounded-md p-1 flex-row justify-start items-center inline-flex border border-gray-200 text-sm focus:bg-slate-50 focus:border-gray-500 outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;

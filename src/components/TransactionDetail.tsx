import { FC, memo } from "react";
import { State, Transaction } from "../Model";
import Button from "./Button";

interface Props {
  transaction: Transaction;
  onPay(): void;
  onConfirm(): void;
}

const TransactionDetail: FC<Props> = ({ transaction, onPay, onConfirm }) => {
  const renderState = () => {
    switch (transaction.state) {
      case State.AWAITING_DELIVERY:
        return (
          <span className="font-medium text-emerald-700">
            Awaiting Delivery
          </span>
        );
      case State.AWAITING_PAYMENT:
        return (
          <span className="font-medium text-amber-700">Awaiting Payment</span>
        );
      default:
        return (
          <span className="font-medium text-sky-700">
            Transaction Completed
          </span>
        );
    }
  };

  const renderButton = () => {
    switch (transaction.state) {
      case State.AWAITING_DELIVERY:
        return (
          <Button
            title="Confirm Delivery"
            type="confirm"
            onSubmit={onConfirm}
          />
        );
      case State.AWAITING_PAYMENT:
        return <Button title="Pay" type="pay" onSubmit={onPay} />;
      default:
        break;
    }
  };

  return (
    <div className="divide-y rounded-xl shadow-md bg-white">
      <header className="font-medium text-gray-900 p-4">
        {`Product ID: ${transaction.productId}`}
      </header>
      <div className="flex flex-col gap-2 p-4 text-sm">
        <span>Buyer: {transaction.buyer}</span>
        <span>Seller: {transaction.seller}</span>
        <span>Price: {transaction.price}</span>
        <span>Status: {renderState()}</span>
        {transaction.state !== State.COMPLETE && (
          <div className="ml-auto">{renderButton()}</div>
        )}
      </div>
    </div>
  );
};

export default memo(TransactionDetail);

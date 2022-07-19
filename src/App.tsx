import { constants, utils } from "ethers";
import { ReactElement, useCallback, useState } from "react";
import {
  CheckTransaction,
  CreateTransaction as Create,
  TransactionDetail,
} from "./components";
import { CreateTransaction, Transaction } from "./Model";
import { checkTransaction, createTransaction } from "./repos";

function App(): ReactElement {
  const [transaction, setTransaction] = useState<Transaction>();

  const handleCreate = useCallback(async (values: CreateTransaction) => {
    try {
      const tx = await createTransaction(values);
      alert(`Create transaction success! Tx hash: ${tx.hash}`);
    } catch (error) {
      alert(`Failed! ${error}`);
    }
  }, []);

  const handleCheck = useCallback(async (productId: string) => {
    try {
      const tx = await checkTransaction(productId);
      if (
        tx.buyer === constants.AddressZero ||
        tx.seller === constants.AddressZero
      ) {
        alert("Transaction not found!");
      } else {
        setTransaction({
          ...tx,
          productId: productId,
          price: utils.formatUnits(tx.price, "wei"),
        });
      }
    } catch (error) {
      alert(`Error fetching transaction, ${error}`);
    }
  }, []);

  return (
    <div className="h-full w-screen bg-slate-50 pb-4">
      <div className="flex flex-col items-center w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 m-auto gap-2">
        <header className="m-4 text-xl font-bold">Decentralized Escrow</header>
        <section className="w-full">
          <Create onSubmit={handleCreate} />
        </section>
        <section className="w-full">
          <CheckTransaction onSubmit={handleCheck} />
        </section>
        <section className="w-full">
          {transaction && (
            <TransactionDetail
              transaction={transaction}
              onPay={() => null}
              onConfirm={() => null}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;

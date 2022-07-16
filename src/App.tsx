import { constants } from "ethers";
import { ReactElement, useCallback, useState } from "react";
import { CheckTransaction, CreateTransaction as Create } from "./components";
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

  const handleCheck = useCallback(async (values: string) => {
    try {
      const tx = await checkTransaction(values);
      // console.log(utils.formatUnits(tx.price, "wei"));
      if (
        tx.buyer === constants.AddressZero ||
        tx.seller === constants.AddressZero
      ) {
        alert("Transaction not found!");
      } else {
        setTransaction(tx);
      }
    } catch (error) {
      alert(`Error fetching transaction, ${error}`);
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-50 pb-4">
      <div className="flex flex-col items-center w-full md:w-1/3 m-auto gap-2">
        <header className="m-4 text-xl font-bold">Decentralized Escrow</header>
        <section className="w-full">
          <Create onSubmit={handleCreate} />
        </section>
        <section className="w-full">
          <CheckTransaction onSubmit={handleCheck} />
        </section>
        <section className="w-full">
          {/* <CheckTransaction onSubmit={handleCheck} /> */}
        </section>
      </div>
    </div>
  );
}

export default App;

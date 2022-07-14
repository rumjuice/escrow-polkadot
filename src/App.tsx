import { ReactElement, useCallback } from "react";
import { CreateTransaction } from "./components";
import { Transaction } from "./Model";

function App(): ReactElement {
  const handleCreate = useCallback((values: Transaction) => {
    console.log(values);
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-50 pb-4">
      <div className="flex flex-col items-center w-full md:w-1/3 m-auto">
        <header className="m-4 text-xl font-bold">Decentralized Escrow</header>
        <section className="w-full">
          <CreateTransaction onSubmit={handleCreate} />
        </section>
      </div>
    </div>
  );
}

export default App;

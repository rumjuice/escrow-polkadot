import { ReactElement } from "react";

function App(): ReactElement {
  return (
    <div className="h-screen w-screen bg-slate-50 pb-4">
      <div className="flex flex-col items-center w-1/2 m-auto">
        <h1 className="m-4 text-xl font-bold">Decentralized Escrow</h1>
      </div>
    </div>
  );
}

export default App;

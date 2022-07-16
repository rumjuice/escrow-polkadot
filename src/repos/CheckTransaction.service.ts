import { Transaction } from "../Model";
import contract from "./Blockchain.provider";

async function checkTransaction(id: string): Promise<Transaction> {
  return await contract.getTransaction(id);
}

export default checkTransaction;

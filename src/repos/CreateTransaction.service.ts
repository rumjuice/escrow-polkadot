import { Transaction } from "../Model";
import contract from "./Blockchain.provider";

async function createTransaction(params: Transaction): Promise<any> {
  const execute = contract.createTransaction(
    params.productId,
    params.buyer,
    params.price
  );

  return execute;
}

export default createTransaction;

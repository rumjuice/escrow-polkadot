import { TransactionResponse } from "@ethersproject/abstract-provider";
import { Transaction } from "../Model";
import contract from "./Blockchain.provider";

async function createTransaction(
  params: Transaction
): Promise<TransactionResponse> {
  return await contract.createTransaction(
    params.productId,
    params.buyer,
    params.price
  );
}

export default createTransaction;

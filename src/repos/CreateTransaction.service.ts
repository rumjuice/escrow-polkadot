import { TransactionResponse } from "@ethersproject/abstract-provider";
import { CreateTransaction } from "../Model";
import contract from "./Blockchain.provider";

async function createTransaction(
  params: CreateTransaction
): Promise<TransactionResponse> {
  return await contract.createTransaction(
    params.productId,
    params.buyer,
    params.price
  );
}

export default createTransaction;

import contract from "./Blockchain.provider";

async function pay(id: string, price: string): Promise<any> {
  return await contract.pay(id, { value: price });
}

export default pay;

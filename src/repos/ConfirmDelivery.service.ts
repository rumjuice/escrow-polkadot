import contract from "./Blockchain.provider";

async function confirmDelivery(id: string): Promise<any> {
  return await contract.confirmDelivery(id);
}

export default confirmDelivery;

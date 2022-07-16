export enum State {
  AWAITING_PAYMENT,
  AWAITING_DELIVERY,
  COMPLETE,
}
export type CreateTransaction = {
  productId: string;
  buyer: string;
  price: string;
};
export type Transaction = CreateTransaction & {
  seller: string;
  state: State;
};

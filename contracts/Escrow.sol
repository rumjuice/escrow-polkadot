//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    enum State {
        AWAITING_PAYMENT,
        AWAITING_DELIVERY,
        COMPLETE
    }

    struct Transaction {
        address buyer;
        address seller;
        uint256 price;
        State state;
    }

    mapping(uint32 => Transaction) Transactions;

    modifier onlyBuyer(uint32 _productId) {
        require(
            msg.sender == Transactions[_productId].buyer,
            "Only the buyer can call this function!"
        );
        _;
    }

    function getTransaction(uint32 _productId)
        external
        view
        returns (Transaction memory)
    {
        return Transactions[_productId];
    }

    function createTransaction(
        uint32 _productId,
        address _buyer,
        uint256 _price
    ) external {
        require(
            Transactions[_productId].seller == address(0),
            "Transaction already exist!"
        );

        Transactions[_productId] = Transaction(
            _buyer,
            msg.sender,
            _price,
            State.AWAITING_PAYMENT
        );
    }

    function pay(uint32 _productId) external payable onlyBuyer(_productId) {
        require(
            Transactions[_productId].seller != address(0),
            "Transaction does not exist!"
        );
        require(
            Transactions[_productId].state == State.AWAITING_PAYMENT,
            "Payment has already been made!"
        );
        require(
            msg.value == Transactions[_productId].price,
            "The amount should match!"
        );

        Transactions[_productId].state = State.AWAITING_DELIVERY;
    }

    function confirmDelivery(uint32 _productId) external onlyBuyer(_productId) {
        require(
            Transactions[_productId].state == State.AWAITING_DELIVERY,
            "Transaction is not awaiting delivery!"
        );
        Transactions[_productId].state = State.COMPLETE;

        (bool sent, ) = Transactions[_productId].seller.call{
            value: Transactions[_productId].price
        }("");
        require(sent, "Delivery confirmed. Payment has been sent to seller");
    }

    function refund(uint32 _productId) external {
        require(
            msg.sender == Transactions[_productId].seller,
            "Only the seller can refund the transaction!"
        );
        require(
            Transactions[_productId].state == State.AWAITING_DELIVERY,
            "You can't refund completed transaction!"
        );

        Transactions[_productId].state = State.COMPLETE;

        (bool sent, ) = Transactions[_productId].buyer.call{
            value: Transactions[_productId].price
        }("");
        require(sent, "Refund complete");
    }
}

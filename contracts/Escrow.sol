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
        address payable seller;
        uint256 price;
        State state;
    }

    mapping(bytes32 => Transaction) Transactions;

    modifier onlyBuyer(bytes32 _productId) {
        require(
            msg.sender == Transactions[_productId].buyer,
            "Only the buyer can call this function!"
        );
        _;
    }

    function createTransaction(
        bytes32 _productId,
        address _buyer,
        address payable _seller,
        uint256 _price
    ) external {
        require(
            Transactions[_productId].seller == address(0),
            "Transaction already exist!"
        );

        Transactions[_productId] = Transaction(
            _buyer,
            _seller,
            _price,
            State.AWAITING_PAYMENT
        );
    }

    function deposit(bytes32 _productId)
        external
        payable
        onlyBuyer(_productId)
    {
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

    function confirmDelivery(bytes32 _productId)
        external
        onlyBuyer(_productId)
    {
        require(
            Transactions[_productId].state == State.AWAITING_DELIVERY,
            "You haven't paid the invoice!"
        );
        Transactions[_productId].state = State.COMPLETE;

        (bool sent, ) = Transactions[_productId].seller.call{
            value: Transactions[_productId].price
        }("");
        require(sent, "Delivery confirmed. Payment has been sent to seller");
    }

    function refund(bytes32 _productId) external onlyBuyer(_productId) {
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

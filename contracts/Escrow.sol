//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    enum State {
        AWAITING_PAYMENT,
        AWAITING_DELIVERY,
        COMPLETE
    }

    State public currState;

    address public buyer;
    address payable public seller;

    // MODIFIER

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only the buyer can call this function!");
        _;
    }

    // CONSTRUCTOR

    constructor(address _buyer, address payable _seller) {
        buyer = _buyer;
        seller = _seller;
    }

    // FUNCTIONS

    function deposit() external payable onlyBuyer {
        require(
            currState == State.AWAITING_PAYMENT,
            "Payment has already been made!"
        );
        currState = State.AWAITING_DELIVERY;
    }

    function confirmDelivery() external onlyBuyer {
        require(
            currState == State.AWAITING_DELIVERY,
            "You must be awaiting delivery in order to confirm delivery!"
        );
        seller.transfer(address(this).balance);
        currState = State.COMPLETE;
    }

    // function refund() onlyBuyer external {
    //      have a timer to set a time limit for confirming delivery
    //      if buyer calls this refund function, and the time limit has passed,
    //      the buyer can get their money refunded from the smart contract
    // }
}

var Escrow = artifacts.require("Escrow");

module.exports = function (deployer, network) {
  deployer
    .deploy(Escrow)
    .then(() =>
      console.log(
        `Escrow deployed at ${Escrow.address} in network: ${network}.`
      )
    );
};

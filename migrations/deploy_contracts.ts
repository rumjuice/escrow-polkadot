type Network = "dev" | "moonbase" | "moonbeam";

module.exports = (artifacts: Truffle.Artifacts) => {
  return async (deployer: Truffle.Deployer, network: Network) => {
    const Escrow = artifacts.require("Escrow");

    deployer.deploy(Escrow);

    const escrow = await Escrow.deployed();
    console.log(
      `Metacoin deployed at ${escrow.address} in network: ${network}.`
    );
  };
};

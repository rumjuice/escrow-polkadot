type Network = "dev" | "moonbase" | "moonbeam";

export function deploy(artifacts: Truffle.Artifacts) {
  return async (deployer: Truffle.Deployer, network: Network) => {
    const Escrow = artifacts.require("Escrow");

    deployer.deploy(Escrow);

    const escrow = await Escrow.deployed();
    console.log(`Escrow deployed at ${escrow.address} in network: ${network}.`);
  };
}

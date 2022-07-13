require("ts-node").register({
  files: true,
});

const HDWalletProvider = require("@truffle/hdwallet-provider");
const dotenv = require("dotenv");

dotenv.config();

// Moonbeam Development Node Private Key
const privateKeyDev =
  "99B3C12287537E38C90A9219D4CB074A89A16E9CDB20BF85728EBD97C343E342";
// Moonbase Alpha Private Key
const privateKeyMoonbase = process.env.MOONBASE_KEY;

module.exports = {
  networks: {
    // Moonbeam Development Network
    dev: {
      provider: () => {
        if (!privateKeyDev.trim()) {
          throw new Error(
            "Please enter a private key with funds, you can use the default one"
          );
        }
        return new HDWalletProvider(privateKeyDev, process.env.DEV_URL);
      },
      network_id: 1281,
    },
    // Moonbase Alpha TestNet
    moonbase: {
      provider: () => {
        if (!privateKeyMoonbase.trim()) {
          throw new Error(
            "Please enter a private key with funds to send transactions to TestNet"
          );
        }
        if (privateKeyDev == privateKeyMoonbase) {
          throw new Error(
            "Please change the private key used for Moonbase to your own with funds"
          );
        }
        return new HDWalletProvider(
          privateKeyMoonbase,
          process.env.MOONBASE_URL
        );
      },
      network_id: 1287,
    },
  },
  // Solidity 0.8.0 Compiler
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
  // Moonbeam Truffle Plugin & Truffle Plugin for Verifying Smart Contracts
  plugins: ["moonbeam-truffle-plugin", "truffle-plugin-verify"],
};

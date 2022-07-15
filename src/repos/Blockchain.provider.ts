import { Contract, providers } from "ethers";
import artifact from "../Escrow.json";

const provider = new providers.Web3Provider(window.ethereum);

provider
  .send("eth_requestAccounts", [])
  .then((res) => console.log("Metamask connected", res))
  .catch((err) => console.error("Error connecting to Metamask", err));

const signer = provider.getSigner();

const contract = new Contract(
  process.env.REACT_APP_CONTRACT_ADDRESS as string,
  artifact.abi,
  signer
);

export default contract;

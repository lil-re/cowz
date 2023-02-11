import { ethers } from "ethers";
import Cowz from "../artifacts/contracts/Cowz.sol/Cowz.json"
import ConnectionButton from "./ConnectionButton";
import MintButton from "./MintButton";

function MintBlock ({ cowzAddress, accounts, setAccounts, data, fetchData, setError }) {
    async function mint() {
      if(typeof window.ethereum !== 'undefined' && accounts[0]) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(cowzAddress, Cowz.abi, signer);
  
        try {
          const overrides = {
            from: accounts[0],
            value: data.cost
          }
          const transaction = await contract.mint(accounts[0], 1, overrides);
          await transaction.wait();
          fetchData();
        }
        catch(err) {
          setError(err.message);
        }
      }
    }

    async function connect () {
      if  (typeof window.ethereum !== 'undefined') {
        const availableAccounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        setAccounts(availableAccounts)
      }
    }

    return (
      <article className="card text-center">
        <img src="https://placedog.net/400/200/" alt="placeholder" />
        <h1 className="card-title">
          Mint Cowz !
        </h1>
        {
          accounts[0]
            ? <MintButton data={data} mint={mint} />
            : <ConnectionButton connect={connect} />
        }
      </article>
    );
}

export default MintBlock;

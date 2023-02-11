import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Cowz from "./artifacts/contracts/Cowz.sol/Cowz.json"
import MintBlock from "./components/MintBlock";
import IntroBlock from "./components/IntroBlock";

const cowzAddress = "0x1c94562F6F2DF5d2d5a68dFB60c6008A6226a210"

function App() {
  const [error, setError] = useState('');
  const [data, setData] = useState({})
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(cowzAddress, Cowz.abi, provider);
      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const values = {"cost": String(cost), "totalSupply": String(totalSupply)}
        setData(values);
      }
      catch(err) {
        setError(err.message);
      }
    }
  }

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
    <div className="App">
      <div className="container">
        <div className="row justify-center">
          <div className="column-6">
            <div className="row justify-center">
              <div className="column-12">
                <MintBlock data={data} accounts={accounts} connect={connect} mint={mint} />
              </div>
              <div className="column-12">
                <IntroBlock accounts={accounts} connect={connect} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Cowz from "./abis/Cowz.json"
import MintBlock from "./components/MintBlock";
import IntroBlock from "./components/IntroBlock";


function App() {
  const cowzAddress = "0x42Ad853222D025f28bEcb32CdF5ec91427543504"
  const [error, setError] = useState('');
  const [data, setData] = useState({})
  const [account, setAccount] = useState(null)

  useEffect(() => {
    fetchData();
  }, [account]);

  async function fetchData() {
    if(typeof window.ethereum !== 'undefined' && account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(cowzAddress, Cowz.abi, provider)

      try {
        const cost = await contract.cost()
        const totalSupply = await contract.totalSupply()
        const balance = await contract.balanceOf(account)
        const values = {
          cost: String(cost),
          totalSupply: String(totalSupply),
          balance: Number(balance)
        }
        setData(values);
      } catch(err) {
        setError(err.message);
      }
    }
  }

  async function mint() {
    if (typeof window.ethereum !== 'undefined' && account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(cowzAddress, Cowz.abi, signer);

      try {
        const overrides = {
          from: account,
          value: data.cost
        }
        const transaction = await contract.mint(account, 1, overrides);
        await transaction.wait();
        fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  }

  async function connect () {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      setAccount(accounts[0])
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row justify-center">
          <div className="column-6">
            <div className="row justify-center">
              <div className="column-12">
                <MintBlock data={data} account={account} connect={connect} mint={mint} />
              </div>
              <div className="column-12">
                <IntroBlock account={account} connect={connect} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

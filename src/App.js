import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Cowz from "./artifacts/contracts/Cowz.sol/Cowz.json"

const CowzAddress = "0x1c94562F6F2DF5d2d5a68dFB60c6008A6226a210"

function App() {
  const [error, setError] = useState('');
  const [data, setData] = useState({})

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CowzAddress, Cowz.abi, provider);
      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const object = {"cost": String(cost), "totalSupply": String(totalSupply)}
        setData(object);
      }
      catch(err) {
        setError(err.message);
      }
    }
  }

  async function mint() {
    if(typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CowzAddress, Cowz.abi, signer);
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

  return (
    <div className="App">
      <div className="container">
        <div className="row justify-center">
          <div className="column-6">
            <article className="card text-center">
              <img src="https://placedog.net/400/200/" alt="placeholder" />
              <h1 className="card-title">
                Mint Cowz !
              </h1>
              <p className="card-text count">
                {data.totalSupply} / 50
                </p>
              <p className="card-text cost">
                Each Cow NFT costs {data.cost / 10**18} eth (excluding gas fees)
                </p>
              <p className="card-text">
                <button className="button button-primary" onClick={mint}>Mint your Cow</button>
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

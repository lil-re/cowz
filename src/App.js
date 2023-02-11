import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Cowz from "./artifacts/contracts/Cowz.sol/Cowz.json"
import MintBlock from "./components/MintBlock";

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

  return (
    <div className="App">
      <div className="container">
        <div className="row justify-center">
          <div className="column-6">
            <MintBlock
              cowzAddress={cowzAddress}
              accounts={accounts}
              setAccounts={setAccounts}
              data={data}
              fetchData={fetchData}
              setError={setError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

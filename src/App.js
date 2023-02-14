import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Cowz from "./abis/Cowz.json"
import BabyCowz from "./abis/BabyCowz.json"
import MintBlock from "./components/MintBlock";
import IntroBlock from "./components/IntroBlock";


function App() {
  const cowzAddress = "0x42Ad853222D025f28bEcb32CdF5ec91427543504"
  const babyCowzAddress = "0x3d6d4460BD769235d8F80ca64B19348ee35b1acb"
  const [error, setError] = useState('');
  const [data, setData] = useState({})
  const [account, setAccount] = useState(null)

  useEffect(() => {
    fetchData();
  }, [account]);

  async function fetchData() {
    if(typeof window.ethereum !== 'undefined' && account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const cowzContract = new ethers.Contract(cowzAddress, Cowz.abi, provider)
      const babyCowzContract = new ethers.Contract(babyCowzAddress, BabyCowz.abi, provider)

      try {
        const cost = await cowzContract.cost()
        const totalSupply = await cowzContract.totalSupply()
        const balance = await cowzContract.balanceOf(account)
        const isApprovedForAll = await cowzContract.isApprovedForAll(account, babyCowzAddress)
        const wallet = await cowzContract.walletOfOwner(account)
        const stakedCowId = await babyCowzContract.ownersCow(account)
        const earned = await babyCowzContract.earningInfo(stakedCowId)

        const values = {
          cost: String(cost),
          totalSupply: String(totalSupply),
          balance: Number(balance),
          isApprovedForAll,
          cowId: Number(wallet[0]),
          stakedCowId: Number(stakedCowId),
          earned: Number(earned),
        }
        console.log(values)
        setData(values);
      } catch (err) {
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

  async function claim() {
    if (typeof window.ethereum !== 'undefined' && account && data.stakedCowId) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(babyCowzAddress, BabyCowz.abi, signer);
      
      try {
        await contract.claim(data.stakedCowId);
        fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  }

  async function unstake() {
    if (typeof window.ethereum !== 'undefined' && account && data.stakedCowId) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(babyCowzAddress, BabyCowz.abi, signer);
      
      try {
        await contract.unstake(data.stakedCowId);
        fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  }

  async function stake() {
    if (typeof window.ethereum !== 'undefined' && account && data.cowId) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const cowzContract = new ethers.Contract(cowzAddress, Cowz.abi, signer);
      const babyCowzContract = new ethers.Contract(babyCowzAddress, BabyCowz.abi, signer);
      
      try {
        if (!data.isApprovedForAll) {
          await cowzContract.setApprovalForAll(babyCowzAddress, true);
        }
        await babyCowzContract.stake(data.cowId);
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
                <MintBlock data={data} account={account} connect={connect} mint={mint} stake={stake} unstake={unstake} />
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

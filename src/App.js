import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios"
import Cowz from "./abis/Cowz.json"
import BabyCowz from "./abis/BabyCowz.json"
import MintBlock from "./components/blocks/MintBlock";
import IntroBlock from "./components/blocks/IntroBlock";
import StakeBlock from "./components/blocks/StakeBlock";
import SocialBlock from "./components/blocks/SocialBlock";


function App() {
  const cowzAddress = "0x42Ad853222D025f28bEcb32CdF5ec91427543504"
  const babyCowzAddress = "0x3d6d4460BD769235d8F80ca64B19348ee35b1acb"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({})
  const [account, setAccount] = useState(null)

  useEffect(() => {
    fetchContractData();
  }, [account]);

  async function fetchContractData() {
    if(typeof window.ethereum !== 'undefined' && account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const cowzContract = new ethers.Contract(cowzAddress, Cowz.abi, provider)
      const babyCowzContract = new ethers.Contract(babyCowzAddress, BabyCowz.abi, provider)
      setLoading(true)

      try {
        const cost = await cowzContract.cost()
        const totalSupply = await cowzContract.totalSupply()
        const balance = await cowzContract.balanceOf(account)
        const isApprovedForAll = await cowzContract.isApprovedForAll(account, babyCowzAddress)
        const wallet = await cowzContract.walletOfOwner(account)
        const stakedCowId = await babyCowzContract.ownersCow(account)
        const earned = await babyCowzContract.earningInfo(stakedCowId)
        const cow = await fetchCowData(cowzContract, wallet, stakedCowId)
        
        const values = {
          cost: String(cost),
          totalSupply: String(totalSupply),
          balance: Number(balance),
          isApprovedForAll,
          cowId: Number(wallet[0]),
          stakedCowId: Number(stakedCowId),
          earned: Number(earned),
          cow
        }
        setData(values);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false)
    }
  }

  async function fetchCowData (cowzContract, wallet, stakedCowId) {
    const tokenId = wallet[0] ? Number(wallet[0]) : Number(stakedCowId)
    // const tokenUri = tokenId ? await cowzContract.tokenURI(tokenId) : null
    const tokenUri = tokenId ? await cowzContract.tokenURI(2) : null
    const cowUri = tokenUri ? `https://ipfs.io/ipfs/${tokenUri}` : null

    if (cowUri) {
      const response = await axios.get(cowUri)
      
      if (response.status === 200) {
        const imageUri = response.data.image.split('ipfs://')[1]

        return {
          ...response.data,
          image: `https://ipfs.io/ipfs/${imageUri}`,
          metadata: cowUri
        }
      }
    }
    return null
  }

  async function mint() {
    if (typeof window.ethereum !== 'undefined' && account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(cowzAddress, Cowz.abi, signer);
      setLoading(true)
      
      try {
        const overrides = {
          from: account,
          value: data.cost
        }
        const transaction = await contract.mint(account, 1, overrides);
        await transaction.wait();
        await fetchContractData();
      } catch (err) {
        setError(err.message);
      }
      setLoading(false)
    }
  }

  async function stake() {
    if (typeof window.ethereum !== 'undefined' && account && data.cowId) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const cowzContract = new ethers.Contract(cowzAddress, Cowz.abi, signer);
      const babyCowzContract = new ethers.Contract(babyCowzAddress, BabyCowz.abi, signer);
      setLoading(true)
      
      try {
        if (!data.isApprovedForAll) {
          const approvalTransaction = await cowzContract.setApprovalForAll(babyCowzAddress, true);
          await approvalTransaction.wait();
        }

        const stakingTransaction = await babyCowzContract.stake(data.cowId);
        await stakingTransaction.wait();
        await fetchContractData();
      } catch (err) {
        setError(err.message);
      }
      setLoading(false)
    }
  }

  async function unstake() {
    if (typeof window.ethereum !== 'undefined' && account && data.stakedCowId) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(babyCowzAddress, BabyCowz.abi, signer);
      setLoading(true)
      
      try {
        const transaction = await contract.unstake(data.stakedCowId);
        await transaction.wait();
        await fetchContractData();
      } catch (err) {
        setError(err.message);
      }
      setLoading(false)
    }
  }

  async function claim() {
    if (typeof window.ethereum !== 'undefined' && account && data.stakedCowId) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(babyCowzAddress, BabyCowz.abi, signer);
      setLoading(true)
      
      try {
        const transaction = await contract.claim(data.stakedCowId);
        await transaction.wait();
        await fetchContractData();
      } catch (err) {
        setError(err.message);
      }
      setLoading(false)
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
              {/* { data.cow ? <img src={data.cow.image}></img> : '' } */}
              <div className="column-12">
                <MintBlock data={data} account={account} connect={connect} mint={mint} stake={stake} unstake={unstake} loading={loading} />
              </div>
              <div className="column-12">
                <IntroBlock account={account} connect={connect} />
              </div>
              <div className="column-12">
                <StakeBlock data={data} account={account} connect={connect} mint={mint} stake={stake} unstake={unstake} loading={loading} />
              </div>
              <div className="column-12">
                <SocialBlock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

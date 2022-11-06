import { useEffect, useState } from 'react';
import './App.css';
import abi from './contracts/ABI.json';
import { ethers } from 'ethers';
import Home from './Home';
import ContractAddress from './Contract';
import Envoyer from './Envoyer';

//0xd1954846d3b257fed1f2dbb92da06339683615ad
//0x45ca1bE138Bb5c2771697D07411ae30000852f9a
//0xA05FA9C6200096f75736D8feE762C53F597A4C67 -- Alex

function App() {

  const [currentAccount, setCurrentAccount] = useState();
  const [contractAddress, setContractAddress] = useState("" );
  const [contractAddressSend, setContractAddressSend] = useState("");
  const [numberCrypto, setNumberCrypto] = useState();


  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.safeMint();

        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
        Mint NFT
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();

  }, [contractAddress])

  const NewContract = (contract) => {
  setContractAddress(contract)
  return (
    <div>
    {currentAccount ? mintNftButton() : connectWalletButton()}
  </div>
  );

  }

  const Send = (contract, number) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

  // Send 1 ether to an ens name.
const tx = signer.sendTransaction({
  to: "0xA05FA9C6200096f75736D8feE762C53F597A4C67",
  value: ethers.utils.parseEther("0.01")
});
       

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }



  return (
    <div className='main-app'>
      <h1>TP ECE</h1>
      <ContractAddress newContract = {NewContract}/>
      <Envoyer send = {Send}/>
      
      <div>
        {currentAccount ? mintNftButton() : connectWalletButton()}
      </div>
    </div>
  )
}

export default App;
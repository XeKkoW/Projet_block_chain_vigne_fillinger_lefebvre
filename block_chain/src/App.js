import { useEffect, useState } from 'react';
import './App.css';
import abi from './contracts/ABI.json';
import { ethers } from 'ethers';

const contractAddress = "0x4d1401C2BCbC7653bff92F4b5B078b5D2C111e85"
//const contractAddress = "0xd1954846d3b257fed1f2dbb92da06339683615ad";


function App() {

  const [currentAccount, setCurrentAccount] = useState(null);

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
       // const balance=0;

        console.log("Initialize payment");
        let nftTxn = await nftContract.safeMint(); // cette ligne n'est jamais dépassé quand le process se lance

        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`);
        //console.log('test');
        //balance = await provider.getBalance("ethers.eth");//celle ci non plus pour l'instant
        //console.log(balance);

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }
  const CheckBalance = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        var balance=0;

        console.log('test');
        balance = await provider.getBalance("ethers.eth");//celle ci non plus pour l'instant
        console.log(balance);
        
        balance.toNumber();
        ethers.utils.formatEther(balance);
        console.log(balance);
       

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const Transaction2 = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        var balance=0;

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
  const Transaction = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        var wallet;
       
        // Créer une instance de portefeuille à partir d'un mnémonique...
const mnemonic =
"blood section young depend stove tackle three wish speed pelican science bundle";
var walletMnemonic = wallet.fromMnemonic(mnemonic)


// Adresse Promise par le signataire de l'API
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Une adresse de portefeuille est aussi disponible de façon synchrone
console.log(walletMnemonic.address);
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Composants cryptographiques internes
console.log(walletMnemonic.privateKey);
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
console.log(walletMnemonic.publicKey);
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Portefeuille mnémonique
console.log(walletMnemonic.mnemonic)
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Remarque : Un portefeuille créé avec une clé privée ne comporte pas
//       de mnémonique (la dérivation l'empêche)
//walletPrivateKey.mnemonic
// null

// Signature d'un message
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }
var tx;
tx = {
to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
value: 0.001,
}

// Signature d'une transaction
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// La méthode de connexion retourne une nouvelle instance du
// portefeuille connecté à un portefeuille du fournisseur
wallet = walletMnemonic.connect(provider)

// Interrogation du réseau
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Envoi d'Ether
wallet.sendTransaction(tx)

       

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
     // <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
     <button onClick={Transaction2} className='cta-button mint-nft-button'>
        Mint NFT
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <h1>TP ECE</h1>
      <div>
        {currentAccount ? mintNftButton() : connectWalletButton()}
        <p1>"test"</p1>
      </div>
    </div>
  )
}

export default App;
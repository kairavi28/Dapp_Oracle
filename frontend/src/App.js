import Navbar from './components/navbar';
import List from './components/list';
import ThemeContextProvider from './contexts/ThemeContext';
import React, { useEffect } from 'react';
import Web3 from "web3";
import { STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS } from './components/quoteContract';

function App() {
  
  useEffect(() => {
    const createInstance = async () => {
      if (window.ethereum) {
        let web3Instance = new Web3(window.ethereum);
        const _accounts = await web3Instance.eth.getAccounts()
        console.log("Account 0= ",_accounts[0])
        
        //calling contract abi with contract address as parameter
        const stockQuote = new web3Instance.eth.Contract(STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS);
        //retriving values from smart contract
        var retval = await stockQuote.methods.getStockPrice(web3Instance.utils.fromAscii("AAAA")).call();
        console.log(retval);
        //condition
      }
    }
    createInstance();
  }, []);

  return (
    <div className="App">
      <ThemeContextProvider>
        <Navbar/>
        <List/>
      </ThemeContextProvider>
    </div>
  );
}

export default App;

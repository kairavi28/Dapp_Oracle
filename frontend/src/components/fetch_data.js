import React, { useState } from 'react';
import Web3 from "web3";
import { STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS } from './quoteContract';

const Fetch_data = () => {

    let stockQuote = '';
    const [searchSym, setSearchSym] = useState('');
    const [symbol, setSym] = useState();
    const [res, setRes] = useState('');

      const fetchData = async (e) => {
        setSym(searchSym);
        setSearchSym('');
        if (window.ethereum) {
            let web3Instance = new Web3(window.ethereum);
            const accounts = await web3Instance.eth.getAccounts()
            console.log("Account 0= ",accounts[0])
            if(!searchSym){
                //calling contract abi with contract address as parameter
                stockQuote = new web3Instance.eth.Contract(STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS);
                //retriving values from smart contract
                var price = await stockQuote.methods.getStockPrice(web3Instance.utils.fromAscii(searchSym)).call();
                var volume = await stockQuote.methods.getStockVolume(web3Instance.utils.fromAscii(searchSym)).call();
                //logs 
                console.log(price);
                console.log(volume);
                if(price === 0) {
                    setRes({ price: 0 });
                    return;
                }
                setRes({ price: price, volume: volume });
            }
        }
        }    

    return(
        <> 
        <p>Fetch Data</p>
        <form onSubmit={fetchData}>
            <input type='text' placeholder='Enter stock symbol' value={searchSym} onChange={e => setSym(e.target.value)} />
            <input type='submit' value='Fetch Data'/>
        </form>
        <div>
            <h5>{symbol}</h5>
            <p>Price: {res.price}</p>
            <p>volume: {res.volume}</p>
        </div>
        </>
    );
}

export default Fetch_data;

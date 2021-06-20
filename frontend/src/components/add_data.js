import axios from 'axios';
require('dotenv').config();
import React, { useEffect, useState } from 'react';
import Web3 from "web3";
import { STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS } from './quoteContract';

const Add_data = () => {

    const [web3, setWeb3] = useState();
    const [addsym, set_addsym] = useState('');
    const [obj, setObj] = useState();    
    const [accounts, setAccounts] = useState();

    useEffect(() => {
        const createInstance = async () => {
          if (window.ethereum) {
            let web3Instance = new Web3(window.ethereum);
            const _accounts = await web3Instance.eth.getAccounts()
            console.log("Account 0= ",_accounts[0])
            if(_accounts){
                setAccounts(_accounts);
            }
            //calling contract abi with contract address as parameter
            const stockQuote = new web3Instance.eth.Contract(STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS);
            //retriving values from smart contract
            var retval = await stockQuote.methods.getStockPrice(web3Instance.utils.fromAscii("AAAA")).call();
            console.log(retval);
            //condition
            if(stockQuote !== ''){
                setObj(stockQuote);
                setWeb3(web3Instance);
            }
          }
        }
    
        createInstance();
      }, []);

    const addData = async(e) => {
        e.preventDefault();
        set_addsym('');

        if(addsym === '') {
            alert('Field should not be null'); 
            return;
        }

        await axios.get(`http://localhost:3001?symbol=${addsym}`).then (res => res.json()).then(async data=> {
            let quote = data['Global Quote'];    
            if(Object.keys(quote.length === 0)){
                alert('No Stock Available');
                return;
            }            
            await obj.methods.setStocks(
                web3.utils.fromAscii(addsym),
                web3.utils.toBN(parseInt(quote['01. price'])), 
                web3.utils.toBN(quote['02. volume'])
            ).send({from: accounts[0]});
        })
    }

    return(
        <>
        <p>Add Data</p>
        <form className='form' onSubmit={addData}>
            <input type='text' 
                placeholder='Stock Symbol' 
                value={addsym}
                onChange={e => set_addsym(e.target.value)} />
            <input type='submit' value='Add Data'/>
        </form>
        </>
    );
}

export default Add_data;

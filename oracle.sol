//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract stockExchangeOracle{
    struct Stock {
        uint price;
        uint volume;
    }
    mapping(bytes => Stock) public stockQuote;
    
    address public oracleOwner;
    
    constructor() {
        oracleOwner = msg.sender;
    }
    
	function getStockPrice(bytes memory symbol) public view returns(uint){
        return stockQuote[symbol].price;
    }
    function setStocks(bytes memory symbol, uint price, uint volume) public {
        Stock memory stock = Stock(price, volume);
        stockQuote[symbol] = stock;
    }
    
    function getStockVolume(bytes memory symbol) public view returns(uint){
        return stockQuote[symbol].volume;
    }
}
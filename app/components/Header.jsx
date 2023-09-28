'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons';


function Header() {
  const [ethPrice, setEthPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);

  useEffect(() => {
    const apiURL = 'https://api.coingecko.com/api/v3/coins/ethereum';

    axios
      .get(apiURL)
      .then(response => {
        const price = response.data.market_data.current_price.usd;
        const dailyChange =
          response.data.market_data.price_change_percentage_24h;
        console.log(response.data);
        setEthPrice(price);
        setPriceChange(dailyChange);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  return (
    <header className="h-24">
      <div className="flex justify-between h-[50%] p-4 lg:px-8">
        <div className="w-[50%]">
          {ethPrice !== null ? (
            <div className="flex flex-row gap-4">
              <p>ETH/USD: {ethPrice}</p>{' '}
              <p className="flex">
                {priceChange >= 0 ? (
                  <p className="text-[#006400]">+</p>
                ) : (
                  <p className="text-[#FF0000]">-</p>
                )}
                {priceChange >= 0 ? (
                  <p className="text-[#006400]">{priceChange.toFixed(2)}%</p>
                ) : (
                  <p className="text-[#FF0000]">{priceChange.toFixed(2)}%</p>
                )}{' '}
              </p>{' '}
            </div>
          ) : (
            <span>Loading...</span>
          )}
        </div>
        <div><FontAwesomeIcon icon={faMoon}/></div>
      </div>

      <div className="flex justify-between h-[50%] p-4 lg:px-8 border-t border-grey border-w">
        <div className="flex items-center justify-start gap-1">
          <img
            src={'/Lightblock.png'}
            alt="logo"
            className="flex w-[2.5rem] rounded-sm"
          />
          <h1 className="h-[full] lg:text-[2rem] text-[1rem]">Lightblock</h1>
        </div>
        <div>Prices, NFTS</div>
      </div>
    </header>
  );
}

export default Header;

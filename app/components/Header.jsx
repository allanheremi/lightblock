'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

function Header() {
  const [ethPrice, setEthPrice] = useState(null);
  const [priceChange, setPriceChange] = useState([]);

  useEffect(() => {
    const apiURL = 'https://api.coingecko.com/api/v3/coins/ethereum';

    axios
      .get(apiURL)
      .then(response => {
        const price = response.data.market_data.current_price.usd;
        const dailyChange =
          response.data.market_data.price_change_percentage_24h;
        setEthPrice(price);
        setPriceChange(dailyChange);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  return (
    <header className="h-24  bg-search-bg bg-cover bg-repeat bg-fixed bg-top bg-opacity-20 bg-blend-darken ">
      <div className="flex justify-between h-[50%] p-2 lg:px-8  w-full text-white ">
        <div className="w-full">
          {ethPrice !== null ? (
            <div className="flex flex-row gap-4">
              <p>
                ETH/USD: {ethPrice}{' '}
                {priceChange >= 0 ? (
                  <span className="text-[#2e902e]  p-0.5">
                    +{priceChange.toFixed(2)}%
                  </span>
                ) : (
                  <span className="text-[#f64b4b] p-0.5">
                    {priceChange.toFixed(2)}%
                  </span>
                )}{' '}
              </p>{' '}
            </div>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>

      <div className="flex justify-between h-[50%] p-4 lg:px-8 border-b border-opacity-30  bg-top border-white w-full ">
        <div className="flex items-center justify-start gap-1">
          <img
            src={'/Lightblock.png'}
            alt="logo"
            className="flex w-[2.5rem] rounded-sm"
          />
          <h1 className="h-[full] lg:text-[2rem] text-[1rem] text-white">
            Lightblock
          </h1>
        </div>
        <div className=" flex justify-around w-3/5 lg:w-1/4 px-8 text-white items-center">
          {' '}
          <Link href={'/prices'}>
            {' '}
            <button className=" morphism-3-noround rounded-sm p-1 text-stone-700 hover:translate-y-[-0.1rem] hover:bg-cyan-300 duration-300">Prices</button>{' '}
          </Link>
          <Link href={'/nfts'}>
          <button className=" morphism-3-noround rounded-sm p-1 text-stone-700 hover:translate-y-[-0.1rem] hover:bg-cyan-300 duration-300">NFTS</button>
          
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

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
    <header className="h-24 morphism-bg-2 text-[#FFF5E0]">
      <div className="flex justify-between h-[50%] p-2 lg:px-8 items-center w-full  ">
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

      <div className="flex justify-between h-[50%] p-4 lg:px-8 py-2 items-center border-t border-opacity-30 border-[#FFF5E0] w-full ">
        <div className="flex items-center justify-start gap-1">
          <img
            src={'/Lightblockgrey.png'}
            alt="logo"
            className="flex w-[2.5rem] rounded-full"
          />
          <h1 className="h-[full] lg:text-[2rem] text-[1rem] text-[#FFF5E0]">
            Lightblock
          </h1>
        </div>
        <div className=" flex justify-around w-3/5 lg:w-1/4 px-8 text-[#FFF5E0] items-center">
          {' '}
          <Link href={'/prices'}>
            {' '}
            <button className=" morphism-bg-4 rounded-sm p-1 text-[#5C5470] hover:translate-y-[-0.1rem] hover:bg-[#B9B4C7] duration-300 font-semibold">
              Prices
            </button>{' '}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

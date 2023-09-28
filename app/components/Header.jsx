'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios'

function Header() {
const [ethPrice, setEthPrice] = useState(null)

useEffect(() => {
  const apiURL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

  axios.get(apiURL).then((response) => {
    const price = response.data.ethereum.usd;
    setEthPrice(price);
  }).catch((error) => {
    console.error('Error fetching ETH/USD')
  })
}, [])


  return (
    <header className='h-24'>
    <div className="flex justify-between h-[50%] bg-red-200 p-4 lg:px-8">
      <div className='w-[50%]'>{ethPrice !== null ? (<span>ETH/USD: {ethPrice} </span>) : <span>Loading...</span>}</div>
      <div>light mode</div>
    </div>


    <div className="flex justify-between h-[50%] bg-blue-200 p-4 lg:px-8">
    <div>Logo</div>
    <div>Prices, NFTS</div>
    </div>
  </header>
  );
}

export default Header;

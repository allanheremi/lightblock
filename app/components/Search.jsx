'use client'
import { Network, Alchemy } from 'alchemy-sdk';
import React, { useState } from 'react';
import dotenv from 'dotenv'

dotenv.config()

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Search() {
  const [search, setSearch] = useState('')

  
  return (
    <div className="bg-search-bg bg-cover bg-center h-[12rem]">
      <div className="text-sm lg:text-lg p-8">
        <input type="text"
        placeholder="Search by block number / address / Tx hash"
        className='w-full lg:w-2/3 border-gray-200 rounded-sm p-2 border-b-2'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
         />
      </div>
    </div>
  );
}

export default Search;

'use client';
import { Network, Alchemy } from 'alchemy-sdk';
import web3 from 'web3';
import React, { useEffect, useState } from 'react';
import dotenv from 'dotenv';

dotenv.config();

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Search() {
  const [search, setSearch] = useState('');
  const [info, setInfo] = useState({ address: null, balance: null });

  useEffect(() => {
    const fetchAddressData = async () => {
      if (!web3.utils.isAddress(search)) {
        setSearch(search);
        setInfo({ address: null, balance: null });
        return;
      }

      const ethBalanceWei = await alchemy.core.getBalance(search);
      const ethBalanceFormatted = ethBalanceWei / 10 ** 18;
      setInfo({ address: search, balance: ethBalanceFormatted });
    };
    fetchAddressData();
  }, [search]);

  return (
    <div className="bg-search-bg bg-cover bg-center h-[12rem]">
      <div className="text-sm lg:text-lg p-8">
        <input
          type="text"
          placeholder="Query info for a valid Ethereum address"
          className="w-full lg:w-2/3 border-gray-200 rounded-sm p-2 border-b-2"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {info.address !== null ? (
          <th className="font-normal text-[0.75rem] sm:text-[1rem]">
            <tr className="underline">{info.address}</tr>{' '}
            <td className="text-left text-md">
              Balance: {info.balance.toFixed(5)} ETH
            </td>
          </th>
        ) : (
          false
        )}
      </div>
    </div>
  );
}

export default Search;

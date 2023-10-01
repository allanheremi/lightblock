'use client'
import { Network, Alchemy } from 'alchemy-sdk';
import web3 from 'web3';
import React, { useEffect, useState } from 'react';
import dotenv from 'dotenv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

dotenv.config();

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

async function fetchEthBalance(address) {
  try {
    const ethBalanceWei = await alchemy.core.getBalance(address);
    const ethBalanceFormatted = ethBalanceWei / 10 ** 18;
    return ethBalanceFormatted;
  } catch (error) {
    console.error('Error fetching ETH balance:', error);
    return null;
  }
}


async function fetchLastActiveDate(address) {
  try {
    const latestBlock = await alchemy.core.getAssetTransfers({
      fromAddress: address,
      category: ['internal', 'external', 'erc20', 'erc721', 'erc1155'],
      maxCount: '0x1',
    });

    const timeStamp = (
      await alchemy.core.getBlock(latestBlock.transfers[0].blockNum)
    ).timestamp;

    const unix = timeStamp * 1000;
    const date = new Date(unix);
    const formattedDate = date.toLocaleString('en-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return formattedDate;
  } catch (error) {
    console.error('Error fetching last active date:', error);
    return null;
  }
}

function Search() {
  const [search, setSearch] = useState('');
  const [info, setInfo] = useState({
    address: null,
    balance: null,
    lastActive: null,
  });

  useEffect(() => {
    const fetchAddressData = async () => {
      if (!web3.utils.isAddress(search)) {
        setSearch(search);
        setInfo({ address: null, balance: null, lastActive: null });
        return;
      }

      try {
        const [ethBalance, lastActive] = await Promise.all([
          fetchEthBalance(search),
          fetchLastActiveDate(search),
        ]);

        setInfo({
          address: search,
          balance: ethBalance,
          lastActive: lastActive,
        });
      } catch (error) {
        console.error('Error fetching address data:', error);
        setInfo({ address: null, balance: null, lastActive: null });
      }
    };

    fetchAddressData();
    const fetchInterval = setInterval(fetchAddressData, 180000);
    return () => {
      clearInterval(fetchInterval);
    };
  }, [search]);

  return (
    <div className="p-8 bg-footer-bg bg-cover bg-no-repeat bg-fixed w-screen h-[16rem]">
      <div className="text-sm lg:text-lg p-8">
        <h2 className='text-white py-4 hover:cursor-pointer' onClick={() => {navigator.clipboard.writeText('0x3A5229ACB0a3821FA6c988469534402bd5dBDFe6')}}>No address? Copy mock</h2>
        <input
          type="text"
          placeholder="Query ETH address"
          className="w-full lg:w-2/3 border-gray-200 rounded-sm p-2 border-b-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {info.address !== null ? (
          <table>
            <tbody>
              <tr>
                <th className="font-normal text-[0.75rem] sm:text-[1rem] text-left underline text-[#6ef06e]">
                  <p className="text-lg">Address info: </p>
                </th>
              </tr>
              <tr>
                <td className='text-[#3ab23a]'>Last active: {info.lastActive}</td>
              </tr>
              <tr>
                <td className="text-left text-md text-[#3ab23a]">
                  Balance: {info.balance !== null ? info.balance.toFixed(5) : 'N/A'} ETH
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          false
        )}
      </div>
    </div>
  );
}

export default Search;

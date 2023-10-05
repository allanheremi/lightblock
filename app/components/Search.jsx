'use client';
import { Network, Alchemy } from 'alchemy-sdk';
import web3 from 'web3';
import React, { useEffect, useState } from 'react';
import dotenv from 'dotenv';
import { ToastContainer, toast } from 'react-toastify';

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

  function showToast() {
    toast('Copied!', {
      position: 'top-left',
    });
  }
  const handleCopy = () => {
    navigator.clipboard.writeText('0x3A5229ACB0a3821FA6c988469534402bd5dBDFe6');
    showToast();
  };

  return (
    <div className="p-8 w-screen h-[24rem] morphism-bg-1">
      <div className="text-sm lg:text-lg p-8 flex flex-col">
        <input
          type="text"
          placeholder="Query ETH address"
          className="w-full lg:w-2/5 rounded-sm p-2 border-b-2 text-[#141E46]"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="text-[#C70039] w-full lg:w-2/5 font-bold py-2 underline text-xs hover:cursor-pointer rounded-sm p-2 hover:translate-y-[-0.1rem] hover:bg-[#141E46] hover:text-[#141E46] duration-300 morphism-bg-2"
          onClick={() => handleCopy()}
        >
          Copy mock address to clipboard
        </button>
        {info.address !== null ? (
          <table>
            <tbody>
              <tr>
                <th className=" text-[0.75rem] sm:text-[1rem] text-left underline text-[#141E46] font-semibold p-4 gap-44">
                  <p className="text-lg">Address info: </p>
                </th>
              </tr>
              <tr>
                <td className="text-[#141E46] font-semibold p-4">
                  Last active: {info.lastActive}
                </td>
              </tr>
              <tr>
                <td className="text-left text-md text-[#141E46] font-semibold p-4">
                  Balance:{' '}
                  {info.balance !== null ? info.balance.toFixed(5) : 'N/A'} ETH
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

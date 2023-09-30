'use client';
import React, { useState, useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import dotenv from 'dotenv';


dotenv.config();
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function TransactionData() {
  const [blocks, setBlocks] = useState({
    block1: null,
    block2: null,
    block3: null,
    block4: null,
    block5: null,
  });
  const [blockReward, setBlockReward] = useState({
    block1: null,
    block2: null,
    block3: null,
    block4: null,
    block5: null,
  });

  const [transactions, setTransactions] = useState({
    transaction1: null,
    transaction2: null,
    transaction3: null,
    transaction4: null,
    transaction5: null,
  });

  const fetchBlocks = async () => {
    try {
      const latest = await alchemy.core.getBlockNumber();
      const secondLatest = latest - 1;
      const thirdLatest = latest - 2;
      const fourthLatest = latest - 3;
      const fifthLatest = latest - 4;

      setBlocks({
        block1: latest,
        block2: secondLatest,
        block3: thirdLatest,
        block4: fourthLatest,
        block5: fifthLatest,
      });
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  fetchBlocks();

  return (
    <>
      <div className="w-full flex flex-row p-0 gap-0">
        <div className="w-1/2 border-b-2 border-l-2 p-2">
          <div className="p-0 lg:p-8">
            <table className="flex flex-row justify-between">
              <tr>
                <th className="flex justify-center">Latest blocks:</th>
                {Object.keys(blocks).map((blockKey, index) => (
                  <td className="flex p-2 underline" key={index}>
                    {blocks[blockKey]}
                  </td>
                ))}
              </tr>


              <th className="text-left">
                Etherscan:{' '}
                {Object.keys(blocks).map((blockKey, index) => (
                  <td
                    className="flex p-2 underline justify-center font-medium"
                    key={index}
                  >
                    <button className="outline-slate-600 outline rounded-sm px-0 lg:px-2 hover:translate-y-[-0.1rem] hover:bg-slate-100 duration-300">
                      <a
                        href={`https://www.etherscan.io/block/${blocks[blockKey]}`}
                        target="_blank"
                      >
                        Link
                      </a>
                    </button>
                  </td>
                ))}
              </th>
            </table>
          </div>
        </div>

        <div className="w-1/2 border-b-2 border-l-2 p-2">
          <h2 className="text-left">Latest transactions</h2>
          <div className="p-8">
            <table className="flex flex-row justify-between">
              <thead>
                <tr>
                  <th>Transaction hash:</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionData;

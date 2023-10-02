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
  const [gasPrice, setGasPrice] = useState({
    gasPrice: null,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
  });

  const [blocks, setBlocks] = useState({
    block1: null,
    block2: null,
    block3: null,
    block4: null,
    block5: null,
    block6: null,
    block7: null,
    block8: null,
    block9: null,
    block10: null,
  });

  const fetchChainData = async () => {
    try {
      const data = await alchemy.core.getFeeData();

      setGasPrice({
        gasPrice: data.gasPrice / 1000000000,
        maxFeePerGas: parseInt(data.maxFeePerGas, 16).toString().slice(0, 2),
        maxPriorityFeePerGas: parseInt(data.maxPriorityFeePerGas, 16)
          .toString()
          .slice(0, 2),
      });
    } catch (error) {
      console.error('Could not retrieve chain data ', error);
    }
  };

  const fetchBlocks = async () => {
    try {
      const latest = await alchemy.core.getBlockNumber();
      const secondLatest = latest - 1;
      const thirdLatest = latest - 2;
      const fourthLatest = latest - 3;
      const fifthLatest = latest - 4;
      const sixthLatest = latest - 5;
      const seventhLatest = latest - 6;
      const eighthLatest = latest - 7;
      const ninthLatest = latest - 8;
      const tenthLatest = latest - 9;

      setBlocks({
        block1: latest,
        block2: secondLatest,
        block3: thirdLatest,
        block4: fourthLatest,
        block5: fifthLatest,
        block6: sixthLatest,
        block7: seventhLatest,
        block8: eighthLatest,
        block9: ninthLatest,
        block10: tenthLatest,

      });
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchBlocks();
      await fetchChainData();
    };
    fetchData();
    const intervalId = setInterval(fetchData, 4000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="w-full flex flex-row p-0 gap-0 bg-cyan-700 text-stone-300">
        <div className="w-1/2 border-b-2 p-2 border-stone-300">
          <div className="p-0 lg:p-8">
            <table className="flex flex-row justify-around text-center">
              <tr>
                <th className="flex justify-center text-stone-200">
                  Last block:
                </th>
                {Object.keys(blocks).map((blockKey, index) => (
                  <td
                    className="flex p-1 underline underline-offset-1"
                    key={index}
                  >
                    {blocks[blockKey]}
                  </td>
                ))}
              </tr>

              <th className="text-left text-stone-200">
                Details:{' '}
                {Object.keys(blocks).map((blockKey, index) => (
                  <td
                    className="flex p-1 underline justify-center font-medium"
                    key={index}
                  >
                    <button className="outline-stone-300 outline rounded-md px-2 hover:translate-y-[-0.1rem] hover:bg-cyan-600 duration-300">
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

        <div className="w-1/2 border-b-2 border-l-2 p-2 border-stone-300 ">
          <div className="p-0 lg:p-8">
            <table className="flex flex-row justify-around text-center text-stone-300">
              <tr>
                <th className="flex justify-center underline pb-3 text-stone-200">
                  Chain fees:
                </th>
                <td className="flex p-8 justify-between font-bold w-full text-left">
                  {' '}
                  Base ⛽{' '}
                  <td>
                  {gasPrice.gasPrice
                    ? Number(gasPrice.gasPrice).toFixed()
                    : null}{' '}</td>
                </td>

                <td className="flex p-8 justify-between font-bold  w-full">
                  {' '}
                  Max ⛽ 
                  <td>
                  {gasPrice.maxFeePerGas ? gasPrice.maxFeePerGas : null}
                    </td>
                </td>
                <td className="flex p-8 justify-between font-bold w-full">
                  Prio ⛽{' '}
                  <td>
                  {gasPrice.maxPriorityFeePerGas
                    ? gasPrice.maxPriorityFeePerGas
                    : null}

                  </td>
                
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionData;

'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  AreaChart,
  ResponsiveContainer,
} from 'recharts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

const Coin = ({ params }) => {
  const [marketData, setMarketData] = useState([]);
  const [extractedData, setExtractedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CHART_URL = `https://api.coingecko.com/api/v3/coins/${params.id.toLowerCase()}/market_chart?vs_currency=usd&days=730`;
    const DATA_URL = `https://api.coingecko.com/api/v3/coins/${params.id.toLowerCase()}`;

    axios
      .get(CHART_URL)
      .then(response => {
        setMarketData(response.data.prices);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching market data:', error);
      });

    axios.get(DATA_URL).then(response => {
      const data = response.data;
      console.log(data);
      const extractedData = {
        name: data.name,
        currentPrice: data.market_data.current_price.usd,
        marketCap: data.market_cap,
        marketCapRank: data.market_cap_rank,
        marketCapChange: data.market_cap_change_percentage_24h,
        tradingVolume: data.market_data.total_volume.usd,
        dayHigh: data.market_data.high_24h.usd,
        dayLow: data.market_data.low_24h.usd,
        totalSupply: data.market_data.total_supply,
        ath: data.market_data.ath.usd,
      };
      setExtractedData(extractedData);
    });
  }, [params.id]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const timestamp = new Date(payload[0].payload[0]);
      const price = payload[0].value.toFixed(0) + '$';
  
      return (
        <div className="custom-tooltip bg-white p-2 rounded-lg">
          <p>Date: {timestamp.toDateString()}</p>
          <p>Price: {price}</p>
        </div>
      );
    }

  return null;
};


  console.log(extractedData);

  if (loading) {
    return (
      <div className="flex justify-center datas-center w-screen h-screen bg-black">
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }


  return (
    <>
      <div className="w-screen h-screen px-8">
        <Link href={'/prices'}>
          <button className="p-2 items-center bg-[#5A029E] flex justify-center rounded-md fixed bottom-5 right-5 z-10rounded-lg text-white">
            Back
          </button>
        </Link>

        <h1 className="text-center text-xl text-[#5A029E] font-bold">
          {extractedData.name} data
        </h1>

        <div className="flex items-center w-full h-[50%] justify-center p-12 py-4">
          <ResponsiveContainer width={'99%'}>
            <AreaChart
              width={300}
              height={300}
              data={marketData}
              className="flex justify-start bg-black"
            >
              <CartesianGrid vertical={false}/>
              <XAxis
  dataKey="name"
                tickLine={false}
                orientation="bottom"
                axisLine={false}
              />
              <YAxis tickLine={false} orientation="left" axisLine={false} />
              <Tooltip content={<CustomTooltip />}/>

              <Area type="linear" dataKey="1" stroke="#FFF" fill="#FFA8FF" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="px-12">
          <div className="w-full mt-4 p-4 px-8 flex justify-between border-b-2 border-slate-300">
            <p>Market cap rank:</p> <p>{extractedData.marketCapRank}</p>
          </div>
          <div className="w-full  p-4 px-8 flex justify-between border-b-2 border-slate-300">
            <p> Current price: </p> <p> {extractedData.currentPrice}$</p>
          </div>
          <div className="w-full  p-4 px-8 flex justify-between border-b-2 border-slate-300">
            <p>24H high: </p> <p> {extractedData.dayHigh}$</p>
          </div>
          <div className="w-full  p-4 px-8 flex justify-between border-b-2 border-slate-300">
            <p> 24H low: </p> <p> {extractedData.dayLow}$</p>
          </div>

          <div className="w-full  p-4 px-8 flex justify-between border-b-2 border-slate-300">
            <p> All time high: </p> <p>{extractedData.ath}$</p>
          </div>
          <div className="w-full  p-4 px-8 flex justify-between border-b-2 border-slate-300">
            <p>Volume </p> <p> {(extractedData.tradingVolume / 1000000).toFixed(0)}M$</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coin;

'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const mockData = [
  {
    id: 'btc',
    name: 'Bitcoin',
    image: '/searchBG.png',
    currentPrice: 45000,
    marketCap: 850000000000,
    marketCapRank: 1,
    marketCapChange: 5.2,
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    image: '/searchBG.png',
    currentPrice: 45000,
    marketCap: 850000000000,
    marketCapRank: 1,
    marketCapChange: 5.2,
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    image: '/searchBG.png',
    currentPrice: 45000,
    marketCap: 850000000000,
    marketCapRank: 1,
    marketCapChange: 5.2,
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    image: '/searchBG.png',
    currentPrice: 45000,
    marketCap: 850000000000,
    marketCapRank: 1,
    marketCapChange: 5.2,
  },
];

const apiURL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';

const Main = () => {
  const [extractedData, setExtractedData] = useState([]);

  useEffect(() => {
    try {
      axios.get(apiURL).then(response => {
        const data = response.data;

        console.log(data);
        const extractedData = data.map(item => ({
          id: item.symbol,
          name: item.name,
          image: item.image,
          currentPrice: item.current_price,
          marketCap: item.market_cap,
          marketCapRank: item.market_cap_rank,
          marketCapChange: item.market_cap_change_percentage_24h,
        }));
        setExtractedData(extractedData);
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  }, []);

  // useEffect(() => {
  //   setExtractedData(mockData);
  // }, []);

  return (
    <main className="p-8 lg:p-24 morphism-7-noround-fill text-cyan-400">
      <table className="text-center w-full text-xs lg:text-base mx-auto ">
        <thead>
          <tr>
            <th className="border-cyan-200 border-y-4">Name</th>
            <th className="border-cyan-200 border-y-4">Price</th>
            <th className="border-cyan-200 border-y-4"> M. Cap</th>

            <th className="border-cyan-200 border-y-4">24H change</th>
          </tr>
        </thead>
        <tbody className=" text-center">
          {extractedData.map(item => (
            <tr
              key={item.id}
              className="border-b border-cyan-100  gap-2 py-2 text-center"
            >
              <td className="font-bold underline text-start gap-4 flex w-full py-2 border-cyan-100  px-0.5">
                <div className="grid grid-cols-2 w-full">
                  <div className="col-span-1 flex justify-center items-center">
                    <img src={item.image} alt={item.name} className="w-8 h-8" />
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    {item.id.toUpperCase()}
                  </div>
                </div>
              </td>
              <td className="border-cyan-100  px-0.5">
                {item.currentPrice <= 10
                  ? item.currentPrice.toFixed(2)
                  : item.currentPrice.toFixed(0)}{' '}
                $
              </td>
              <td className="border-cyan-100 px-0.5">
                {Math.floor(item.marketCap / 1000000000) >= 1
                  ? (item.marketCap / 1000000000).toFixed(1) + 'B$'
                  : Math.floor(item.marketCap / 1000000) + ' M$'}
              </td>

              <td style={{ color: item.marketCapChange >= 0 ? '#2e902e' : '#f64b4b' }}>
  {item.marketCapChange.toFixed(2)}%
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Main;

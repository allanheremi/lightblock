'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
          id: item.id,
          name: item.symbol,
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

  return (
    <main className="p-8">
      <table className="text-center w-4/5 sm:text-sm">
        <thead className="">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>M. Cap</th>
            <th>Rank</th>
            <th>24H change</th>
          </tr>
        </thead>
        <tbody className=" text-center">
          {extractedData.map(item => (
            <tr key={item.id} className="border-b border-stone-300 gap-2 py-2">
              <td>
                <img src={item.image} alt={item.name} className="w-8 h-8" />
              </td>
              <td className="text-bold underline">{item.symbol}</td>
              <td>
                {item.currentPrice.length > 2
                  ? item.currentPrice.toFixed(3)
                  : item.currentPrice}{' '}
                $
              </td>
              <td>
                {Math.floor(item.marketCap / 1000000000) > 1
                  ? Math.floor(item.marketCap / 1000000000) + ' B$'
                  : Math.floor(item.marketCap / 1000000) + ' M$'}
              </td>
              <td>{item.marketCapRank}</td>
              <td className={`text-${item.marketCapChange >= 0 ? '[#6ef06e]' : 'red-[#f86767]'}`}>
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

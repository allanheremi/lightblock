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

        console.log(data)
        const extractedData = data.map(item => ({
          id: item.id,
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

  return (
    <main className='p-8'>
      <table className="text-center w-full">
        <thead className="p-8">
          <tr className='p-8'>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>M. Cap</th>
            <th>Rank</th>
            <th>24H change</th>
          </tr>
        </thead>
        <tbody className="p-8 text-center">
          {extractedData.map(item => (
            <tr key={item.id} className="border-b border-stone-300 p-8">
              <td>
                <img src={item.image} alt={item.name} width={48} height={48} className='py-2'/>
              </td>
              <td className='text-bold'>{item.name}</td>
              <td>{item.currentPrice} $</td>
              <td>{Math.floor(item.marketCap / 1000000) }M$</td>
              <td>{item.marketCapRank}</td>
              <td>{item.marketCapChange.toFixed(3)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Main;

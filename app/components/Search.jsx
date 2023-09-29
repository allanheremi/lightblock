import React from 'react';
import 'tailwindcss/tailwind.css';

function Search() {
  
  return (
    <div className="bg-search-bg bg-cover bg-center h-[12rem]">
      <div className="text-white text-sm lg:text-lg p-8">
        <input type="text"
        placeholder="Search by block number / address / Tx hash"
        className='w-full lg:w-2/3 border-gray-200 rounded-sm p-2 border-b-2'
         />
      </div>
    </div>
  );
}

export default Search;

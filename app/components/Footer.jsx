'use client'
import React from 'react';

function Footer() {
  return (
    <footer className="bg-cyan-800 p-8 flex ">
      <div className="flex items-center flex-col w-1/2 text-center gap-2 underline text-stone-300">
        <img
          src="/ethTransparent.png"
          alt="Ethereum logo"
          className="w-24 h-24 object-cover rounded-full hover:cursor-pointer"
          loading='lazy'

        />
        <h1 className="text-stone-300">Powered by Ethereum</h1>
      </div>
      <div className="w-1/2 justify-center flex flex-col items-center text-stone-300 gap-2">
        <img
          src="/Lightblockgrey.png"
          alt=""
          className="w-24 h-24 object-cover rounded-full"
          loading='lazy'

        />
        <a href="https://github.com/allanheremi/lightblock" target="_blank" className='underline'>
          Source code
        </a>
      </div>
    </footer>
  );
}

export default Footer;

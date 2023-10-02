'use client';
import React from 'react';

function Footer() {
  return (
    <footer className="bg-cyan-700">
      <div className=" p-4 py-8 flex ">
        <div className="w-full flex gap-4">
          <div className="flex items-center flex-col w-1/2 text-center gap-2 text-stone-300">
            <img
              src="/ethTransparent.png"
              alt="Ethereum logo"
              className="w-24 h-24 object-cover rounded-full"
              loading="lazy"
            />
            <h1 className="text-stone-300">Powered by Ethereum</h1>
          </div>
          <div className="w-1/2 justify-center flex flex-col items-center text-stone-300 gap-2">
            <img
              src="/Lightblockgrey.png"
              alt=""
              className="w-24 h-24 object-cover rounded-full"
              loading="lazy"
            />

            <ul className="text-stone-300 font-bold underline text-center">
          
              <li>
                <a
                  href="https://github.com/allanheremi"
                  target="_blank"
                >
Github
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/allanheremi/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                {' '}
                <a
                  href="https://github.com/allanheremi/lightblock"
                  target="_blank"
                >
                  Source code{' '}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 py-8 flex">
        <div className="w-full flex justify-start">
          <span className="text-white text-xl">Lightblock © 2023</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

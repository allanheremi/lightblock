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
            <h1 className="text-stone-300 hover:translate-y-[-5%]  hover:bg-cyan-600 rounded-md duration-300 p-4 ">
              <a
                href="https://ethereum.org/en/"
                target="_blank"
                className="underline"
              >
                Powered by Ethereum
              </a>
            </h1>
          </div>
          <div className="w-1/2 justify-center flex flex-col items-center text-stone-300 gap-2">
            <img
              src="/Lightblockgrey.png"
              alt=""
              className="w-24 h-24 object-cover rounded-full"
              loading="lazy"
            />

            <ul className="text-stone-300 font-medium underline text-center">
              <li className="hover:translate-y-[-5%]  hover:bg-cyan-600 rounded-md duration-300 p-1">
                <a href="https://github.com/allanheremi" target="_blank">
                  Github
                </a>
              </li>
              <li className="hover:translate-y-[-5%]  hover:bg-cyan-600 rounded-md duration-300 p-1">
                <a
                  href="https://www.linkedin.com/in/allanheremi/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
              <li className="hover:translate-y-[-5%]  hover:bg-cyan-600 rounded-md duration-300 p-1">
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
          <span className="text-white text-xl italic">
            Lightblock © 2023 <br /> License: MIT
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

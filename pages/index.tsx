import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const Home: NextPage = () => {
  const walletAddress = useRef<HTMLInputElement>(null);
  const collectionAddress = useRef<HTMLInputElement>(null);

  const [NFTs, setNFTs] = useState({});
  const [NftCollection, setNftCollection] = useState(false);

  const fetchNFTs = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const api_key = process.env.ALCHEMY_API_KEY;
    const base_url = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs`;
    let requestOptions = {
      method: 'GET',
    };
    if (!collectionAddress.current?.value) {
      const fetch_url = `${base_url}/?owner=${walletAddress.current?.value}`;
      const response = await fetch(fetch_url, requestOptions);
      const data = await response.json();
      setNFTs(data.ownedNfts);
      console.log(data.ownedNfts);
    } else {
      const fetch_url = `${base_url}/?owner=${walletAddress.current?.value}&contractAddresses%5B%5D=${collectionAddress.current?.value}`;
      const response = await fetch(fetch_url, requestOptions);
      const data = await response.json();
      setNFTs(data.ownedNfts);
      console.log('NFTs', NFTs);
    }
  };

  const fetchNFTsForCollection = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const api_key = process.env.ALCHEMY_API_KEY;
    const base_url = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
    let requestOptions = {
      method: 'GET',
    };
    if (collectionAddress.current?.value) {
      const fetch_url = `${base_url}?contractAddress=${
        collectionAddress.current?.value
      }&withMetadata=${'true'}`;
      console.log(fetch_url);
      const response = await fetch(fetch_url, requestOptions);
      const data = await response.json();
      setNFTs(data.nfts);
      console.log('NFT Collection', NFTs);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <div className="col-span-3 sm:col-span-2">
          <div className="mt-1 flex rounded-md shadow-sm p-2">
            <input
              className="block flex-1  rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 w-[500px] "
              type="text"
              placeholder="NFT Owner Address"
              ref={walletAddress}
            />
          </div>

          <div className="col-span-3 sm:col-span-2">
            <div className="mt-1 flex rounded-md shadow-sm p-2">
              <input
                className="block flex-1  rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 w-[500px]"
                type="text"
                placeholder="Collection (Smart Contract) Address"
                ref={collectionAddress}
              />
            </div>
          </div>
        </div>
        <label className="text-gray-600 ">
          <input
            type={'checkbox'}
            onChange={(e) => {
              e.target.checked ? setNftCollection(true) : setNftCollection(false);
            }}
            className="mr-2"
          />
          Fetch for collection
        </label>
        <button
          className="disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-lg w-1/5"
          onClick={NftCollection ? fetchNFTsForCollection : fetchNFTs}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Home;

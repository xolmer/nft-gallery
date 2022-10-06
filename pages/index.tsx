import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRef, useState } from 'react';

const Home: NextPage = () => {
  const walletAddress = useRef<HTMLInputElement>(null);
  const collectionAddress = useRef<HTMLInputElement>(null);

  const [NFTs, setNFTs] = useState({});

  const fetchNFTs = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    console.log(walletAddress.current?.value);
    console.log(collectionAddress.current?.value);
    if (!collectionAddress.current?.value) {
      let requestOptions = {
        method: 'GET',
      };
      const api_key = process.env.ALCHEMY_API_KEY;
      const base_url = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs`;
      const fetch_url = `${base_url}/?owner=${walletAddress.current?.value}`;

      const response = await fetch(fetch_url, requestOptions);
      const data = await response.json();
      setNFTs(data);
    }

    console.log(NFTs);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="border">
        <input type="text" placeholder="Wallet address" ref={walletAddress} />
        <input type="text" placeholder="Collection address" ref={collectionAddress} />
        <label htmlFor="">
          <input type="checkbox" />
        </label>
        <button onClick={fetchNFTs}>Search</button>
      </div>
    </div>
  );
};

export default Home;
